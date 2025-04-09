import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuestionModule } from 'src/question/question.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { ResultEntity } from 'src/result/entities/result.entity';
import { QuizDbSchedulerService } from './quiz-db-scheduler.service';
import { QuestionEntity } from 'src/question/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuizEntity,
      UserEntity,
      ResultEntity,
      QuestionEntity,
    ]),
    QuestionModule,
  ],
  controllers: [QuizController],
  providers: [QuizService, QuizDbSchedulerService],
  exports: [QuizService],
})
export class QuizModule {}
