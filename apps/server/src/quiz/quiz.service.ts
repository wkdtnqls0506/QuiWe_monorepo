import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Repository } from 'typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionService } from 'src/question/question.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly questionService: QuestionService,
  ) {}

  async create(createQuizDto: CreateQuizDto, userId: number) {
    const { category, details, level } = createQuizDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const savedQuiz = await this.quizRepository.save({
      category,
      details: details.join(', '),
      level,
      user,
    });

    const generatedQuestions = await this.questionService.create({
      category,
      details,
      level,
    });

    const questions = generatedQuestions.data.quizzes.map((questionData) => ({
      ...questionData,
      quiz: savedQuiz,
    }));
    await this.questionService.saveQuestions(questions);

    const finalQuiz = await this.quizRepository.findOne({
      where: { id: savedQuiz.id },
      relations: ['questions', 'user'],
    });

    return {
      status: 'SUCCESS',
      message: '퀴즈와 문제를 성공적으로 생성했습니다.',
      data: finalQuiz,
    };
  }

  findOne(id: number) {
    return this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'user'],
    });
  }
}
