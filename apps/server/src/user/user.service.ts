import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findMe(req: Request) {
    const accessToken = req.cookies['accessToken'];

    const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

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

    return user;
  }
}
