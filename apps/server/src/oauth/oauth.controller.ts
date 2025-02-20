import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OauthService } from './oauth.service';
import { Response } from 'express';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oAuthService: OauthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Req() req) {}

  @Get('kakao/callback')
  async kakaoLoginCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const { accessToken } = await this.oAuthService.kakaoLogin(code);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
      });

      return res.redirect(`${process.env.CLIENT_CALLBACK_URI}`);
    } catch (error) {
      return res.status(500).json({ message: '카카오 로그인 실패' });
    }
  }
}
