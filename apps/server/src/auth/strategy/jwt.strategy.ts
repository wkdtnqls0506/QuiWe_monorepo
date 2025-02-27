import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        if (!req.cookies || !req.cookies['accessToken']) {
          throw new UnauthorizedException('액세스 토큰이 존재하지 않습니다.');
        }
        return req.cookies['accessToken'];
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        if (!req.cookies || !req.cookies['refreshToken']) {
          throw new UnauthorizedException('리프레시 토큰이 존재하지 않습니다.');
        }
        return req.cookies['refreshToken'];
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN'),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
