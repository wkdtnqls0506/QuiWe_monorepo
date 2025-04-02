import { Module, forwardRef } from '@nestjs/common';
import { QuizSubmissionFacade } from './quiz-submission.facade';
import { QuizModule } from 'src/quiz/quiz.module';
import { ResultModule } from 'src/result/result.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [
    forwardRef(() => QuizModule),
    forwardRef(() => ResultModule),
    QuestionModule,
  ],
  providers: [QuizSubmissionFacade],
  exports: [QuizSubmissionFacade],
})
export class QuizSubmissionModule {}
