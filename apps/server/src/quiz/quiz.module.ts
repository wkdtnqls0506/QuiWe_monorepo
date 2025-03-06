import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuestionModule } from 'src/question/question.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { ResultEntity } from 'src/result/entities/result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizEntity, UserEntity, ResultEntity]),
    QuestionModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
