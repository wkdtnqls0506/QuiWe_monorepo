import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity]), QuestionModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
