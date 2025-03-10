import { AuthGuard } from '@nestjs/passport';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizService } from './quiz.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(AuthGuard('access'))
  async create(@Body() createQuizDto: CreateQuizDto, @Req() req: Request) {
    const userId = (req.user as JwtPayload).sub;
    return await this.quizService.create(createQuizDto, userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.findOne(id);
  }
}
