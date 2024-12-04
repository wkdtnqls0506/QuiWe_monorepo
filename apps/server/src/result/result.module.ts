import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from './entities/result.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResultEntity, QuizEntity, QuestionEntity]),
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
