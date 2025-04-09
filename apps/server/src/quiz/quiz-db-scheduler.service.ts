import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { Repository, LessThan } from 'typeorm';
import { QuizStatus } from './enums/quiz-status.enum';
import { QuestionEntity } from 'src/question/entities/question.entity';

@Injectable()
export class QuizDbSchedulerService {
  private readonly logger = new Logger(QuizDbSchedulerService.name);

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async removeExpiredQuizzes() {
    const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);

    const expiredQuizzes = await this.quizRepository.find({
      where: {
        status: QuizStatus.PENDING,
        createdAt: LessThan(oneHourAgo),
      },
    });

    if (expiredQuizzes.length === 0) return;

    for (const quiz of expiredQuizzes) {
      await this.questionRepository.delete({ quiz: { id: quiz.id } });
    }
    await this.quizRepository.remove(expiredQuizzes);

    this.logger.log(
      `${expiredQuizzes.length}개의 PENDING 퀴즈가 한 시간 경과되어 삭제되었습니다.`,
    );
  }
}
