import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OauthService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async kakaoLogin(code: string, res: Response) {
    try {
      const tokenResponse = await this.requestKakaoToken('authorization_code', {
        redirect_uri: process.env.KAKAO_CALLBACK_URI!,
        code,
      });

      const {
        access_token: kakaoAccessToken,
        refresh_token: kakaoRefreshToken,
      } = tokenResponse;

      const kakaoUserResponse = await axios.get(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: { Authorization: `Bearer ${kakaoAccessToken}` },
        },
      );

      const kakaoUser = kakaoUserResponse.data;

      if (!kakaoUser.kakao_account.email) {
        throw new Error('카카오 계정에서 이메일을 제공하지 않습니다.');
      }

      let user = await this.userRepository.findOne({
        where: { email: kakaoUser.kakao_account.email },
      });

      if (!user) {
        user = this.userRepository.create({
          email: kakaoUser.kakao_account.email,
          name: kakaoUser.properties.nickname,
          profileImage: kakaoUser.properties.profile_image,
          refreshToken: '',
          kakaoAccessToken,
          kakaoRefreshToken,
        });
        user = await this.userRepository.save(user);
      } else {
        await this.userRepository.update(user.id, {
          kakaoAccessToken,
          kakaoRefreshToken,
        });
      }

      await this.authService.generateTokensAndSetCookies(user, res);

      return res.redirect(`${process.env.CLIENT_CALLBACK_URI}`);
    } catch (error) {
      console.error('카카오 로그인 중 오류 발생: ', error);
      throw new InternalServerErrorException('카카오 로그인 처리 중 오류 발생');
    }
  }

  async kakaoLogout(req: { user: JwtPayload }, res: Response) {
    const user = await this.userRepository.findOne({
      where: { id: req.user.sub },
    });
    if (!user || !user.kakaoAccessToken) {
      return res.status(400).json({ message: '로그인 상태가 아닙니다.' });
    }

    let accessToken = user.kakaoAccessToken;

    const logoutSuccess = await this.tryLogout(accessToken);
    if (!logoutSuccess && user.kakaoRefreshToken) {
      try {
        const tokenData = await this.requestKakaoToken('refresh_token', {
          refresh_token: user.kakaoRefreshToken,
        });

        accessToken = tokenData.access_token;

        await this.userRepository.update(user.id, {
          kakaoAccessToken: accessToken,
          ...(tokenData.refresh_token && {
            kakaoRefreshToken: tokenData.refresh_token,
          }),
        });

        await this.tryLogout(accessToken);
      } catch (err) {
        return res
          .status(500)
          .json({ message: '카카오 access token 재발급 실패' });
      }
    } else if (!logoutSuccess) {
      return res.status(500).json({ message: '카카오 로그아웃 실패' });
    }

    await this.userRepository.update(user.id, {
      kakaoAccessToken: '',
      kakaoRefreshToken: '',
      refreshToken: '',
    });

    res.clearCookie('accessToken', { httpOnly: true });
    res.clearCookie('refreshToken', { httpOnly: true });

    return res.status(200).json({ message: '카카오 로그아웃 성공' });
  }

  private async tryLogout(accessToken: string): Promise<boolean> {
    try {
      await axios.post('https://kapi.kakao.com/v1/user/logout', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return true;
    } catch (error) {
      const code = error.response.data.code;
      const status = error.response.status;
      const isExpired = code === -401 || status === 401;

      if (!isExpired) {
        console.error(
          '카카오 로그아웃 실패: ',
          error.response.data || error.message,
        );
      }

      return false;
    }
  }

  private async requestKakaoToken(
    grantType: 'authorization_code' | 'refresh_token',
    payload: Record<string, string>,
  ) {
    try {
      const params = new URLSearchParams({
        grant_type: grantType,
        client_id: process.env.KAKAO_ID!,
        client_secret: process.env.KAKAO_SECRET!,
        ...payload,
      });

      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        params,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      return response.data;
    } catch (error) {
      console.error(
        '카카오 토큰 요청 실패: ',
        error.response.data || error.message,
      );
      throw new InternalServerErrorException('카카오 토큰 요청 실패');
    }
  }
}
