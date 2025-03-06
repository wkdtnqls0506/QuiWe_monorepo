import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Request } from 'express';
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

    return await this.userRepository.findOne({
      where: { email: user.email },
    });
  }

  async getUserQuizzes(req: Request) {
    const user = req.user as JwtPayload;
    if (!user?.email) {
      throw new Error('사용자 정보를 찾을 수 없습니다.');
    }

    const histories = await this.userRepository.findOne({
      where: { id: user.sub },
      relations: ['quizzes', 'quizzes.results'],
      order: { quizzes: { id: 'DESC' } },
    });

    return {
      userId: histories.id,
      quizzes: histories.quizzes.map((quiz) => ({
        id: quiz.id,
        category: quiz.category,
        details: quiz.details,
        createdAt: quiz.createdAt.toISOString().split('T')[0],
        level: quiz.level,
        results: {
          correctResults: quiz.results.filter((result) => result.isCorrect)
            .length,
          totalResults: quiz.results.length,
        },
      })),
    };
  }
}
