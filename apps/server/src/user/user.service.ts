import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Request } from 'express';
import axios from 'axios';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findMe(req: Request) {
    const user = req.user as JwtPayload;
    if (!user?.email) {
      throw new Error('사용자 정보를 찾을 수 없습니다.');
    }

    const findUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    return findUser;
  }
}
