import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express';

@Injectable()
export class OauthService {
  constructor() {}

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

      const accessToken = tokenResponse.data.access_token;

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
      });

      return res.redirect(`${process.env.CLIENT_CALLBACK_URI}`);
    } catch (error) {
      throw new InternalServerErrorException('카카오 로그인 처리 중 오류 발생');
    }
  }

  async kakaoLogout(req: Request, res: Response) {
    try {
      const accessToken = req.cookies['accessToken'];

      if (!accessToken) {
        return res.status(400).json({ message: '로그인 상태가 아닙니다.' });
      }

      const kakaoResponse = await axios.post(
        'https://kapi.kakao.com/v1/user/logout',
        null,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      res.clearCookie('accessToken', { httpOnly: true });

      return res.status(200).json({
        message: '카카오 로그아웃 성공',
        userId: kakaoResponse.data.id,
      });
    } catch (error) {
      return res.status(500).json({
        message: '카카오 로그아웃 처리 중 오류 발생',
        error: error.response.data,
      });
    }
  }
}
