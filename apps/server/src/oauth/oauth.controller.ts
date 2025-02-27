import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OauthService } from './oauth.service';
import { Response } from 'express';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oAuthService: OauthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Req() req) {}

  @Get('kakao/callback')
  async kakaoLoginCallback(@Query('code') code: string, @Res() res: Response) {
    return this.oAuthService.kakaoLogin(code, res);
  }

  @Post('kakao/logout')
  @UseGuards(AuthGuard('access'))
  async kakaoLogout(
    @Req() reqUser: { user: JwtPayload },
    @Res() res: Response,
  ) {
    return this.oAuthService.kakaoLogout(reqUser, res);
  }
}
