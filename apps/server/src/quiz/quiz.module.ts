import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuestionModule } from 'src/question/question.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { ResultEntity } from 'src/result/entities/result.entity';
import { QuizSubmissionModule } from 'src/quiz-submission/quiz-submission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizEntity, UserEntity, ResultEntity]),
    QuestionModule,
    forwardRef(() => QuizSubmissionModule),
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
