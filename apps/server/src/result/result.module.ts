import { forwardRef, Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from './entities/result.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResultEntity,
      QuizEntity,
      QuestionEntity,
      UserEntity,
    ]),
    QuestionModule,
  ],
  controllers: [ResultController],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultModule {}
