import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { QuizService } from 'src/quiz/quiz.service';
import { ResultService } from 'src/result/result.service';
import { CreateQuizDto } from 'src/quiz/dto/create-quiz.dto';
import { CreateResultDto } from 'src/result/dto/create-result.dto';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';

@Injectable()
export class QuizSubmissionFacade {
  constructor(
    private readonly dataSource: DataSource,
    private readonly quizService: QuizService,
    private readonly resultService: ResultService,
  ) {}

  async submitQuiz(
    userId: number,
    createQuizDto?: CreateQuizDto,
    createResultDto?: CreateResultDto,
    extractedText?: string,
  ) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(UserEntity, {
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException('존재하지 않는 사용자입니다.');
      }

      let quiz;
      let questions: QuestionEntity[] = [];

      if (createQuizDto && !createResultDto) {
        quiz = await this.quizService.create(
          createQuizDto,
          userId,
          queryRunner,
          extractedText,
        );
        questions = await queryRunner.manager.find(QuestionEntity, {
          where: { quiz: { id: quiz.id } },
        });

        await queryRunner.commitTransaction();
        return {
          id: quiz.id,
          questions,
        };
      }

      if (createResultDto && !createQuizDto) {
        const quizId = createResultDto.quizId;
        quiz = await queryRunner.manager.find(QuizEntity, {
          where: { id: quizId },
        });

        questions = await queryRunner.manager.find(QuestionEntity, {
          where: { quiz: { id: quiz.id } },
        });

        const result = await this.resultService.create(
          createResultDto.quizId,
          createResultDto,
          userId,
          queryRunner,
        );

        await queryRunner.commitTransaction();
        return result;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
