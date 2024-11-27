import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizService } from './quiz.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.create(createQuizDto);
  }
}
