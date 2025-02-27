import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async kakaoLogin(code: string, res: Response) {
    try {
      const tokenResponse = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_ID,
          client_secret: process.env.KAKAO_SECRET,
          redirect_uri: process.env.KAKAO_CALLBACK_URI,
          code: code,
        },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      const kakaoAccessToken = tokenResponse.data.access_token;

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
        });
        user = await this.userRepository.save(user);
      } else {
        await this.userRepository.update(user.id, { kakaoAccessToken });
      }

      await this.authService.generateTokensAndSetCookies(user, res);

      return res.redirect(`${process.env.CLIENT_CALLBACK_URI}`);
    } catch (error) {
      console.error('카카오 로그인 중 오류 발생: ', error);
      throw new InternalServerErrorException('카카오 로그인 처리 중 오류 발생');
    }
  }

  async kakaoLogout(req: { user: JwtPayload }, res: Response) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: req.user.sub,
        },
      });
      if (!user || !user.kakaoAccessToken) {
        return res.status(400).json({
          message: '로그인 상태가 아닙니다.',
        });
      }

      await axios.post('https://kapi.kakao.com/v1/user/logout', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${user.kakaoAccessToken}`,
        },
      });

      await this.userRepository.update(user.id, { kakaoAccessToken: '' });

      res.clearCookie('accessToken', { httpOnly: true });
      res.clearCookie('refreshToken', { httpOnly: true });

      return res.status(200).json({
        message: '카카오 로그아웃 성공',
      });
    } catch (error) {
      return res.status(500).json({
        message: '카카오 로그아웃 처리 중 오류 발생',
        error: error.response.data,
      });
    }
  }
}
