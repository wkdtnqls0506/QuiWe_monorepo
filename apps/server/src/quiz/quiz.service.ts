import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Repository } from 'typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    private readonly questionService: QuestionService,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    const { category, details, level } = createQuizDto;

    // QuizEntity 저장
    const savedQuiz = await this.quizRepository.save({
      category,
      details: details.join(', '),
      level,
    });

    // Quiz 문제 생성 요청
    const generatedQuestions = await this.questionService.create({
      category,
      details,
      level,
    });

    // 생성된 Questions를 DB에 저장
    const questions = generatedQuestions.data.quizzes.map((questionData) => ({
      ...questionData,
      quiz: savedQuiz,
    }));
    await this.questionService.saveQuestions(questions);

    const finalQuiz = await this.quizRepository.findOne({
      where: { id: savedQuiz.id },
      relations: ['questions'],
    });

    return {
      status: 'SUCCESS',
      message: '퀴즈와 문제를 성공적으로 생성했습니다.',
      data: finalQuiz,
    };
  }
}
