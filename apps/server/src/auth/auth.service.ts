import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtPayload } from './strategy/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async generateTokensAndSetCookies(user: UserEntity, res: Response) {
    const payload = { sub: user.id, email: user.email, name: user.name };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN,
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return { accessToken, refreshToken };
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      return res
        .status(403)
        .json({ message: '리프레시 토큰이 존재하지 않습니다.' });
    }

    const user = await this.userRepository.findOne({
      where: { id: (req.user as JwtPayload).sub },
    });
    if (!user || !user.refreshToken) {
      return res.status(403).json({ message: '유효하지 않은 사용자입니다.' });
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!isRefreshTokenValid) {
      return res
        .status(403)
        .json({ message: '리프레시 토큰이 유효하지 않습니다.' });
    }

    const newAccessToken = this.jwtService.sign(
      { sub: user.id, email: user.email, name: user.name },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    res.cookie('accessToken', newAccessToken, { httpOnly: true });

    return res.json({ accessToken: newAccessToken });
  }
}
