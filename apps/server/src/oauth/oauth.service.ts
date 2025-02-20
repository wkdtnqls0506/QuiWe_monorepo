import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OauthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async kakaoLogin(code: string) {
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

      const accessToken = tokenResponse.data.access_token;

      const userResponse = await axios.get(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const kakaoUser = userResponse.data;

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
        });
        user = await this.userRepository.save(user);
      }

      const payload = { sub: user.id, email: user.email, name: user.name };
      const jwtToken = this.jwtService.sign(payload);

      return { accessToken: jwtToken, user };
    } catch (error) {
      throw new InternalServerErrorException('카카오 로그인 처리 중 오류 발생');
    }
  }
}
