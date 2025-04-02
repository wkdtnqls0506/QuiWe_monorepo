import { QuizSubmissionFacade } from './../quiz-submission/quiz-submission.facade';
import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';

@Controller('result')
@UseInterceptors(ClassSerializerInterceptor)
export class ResultController {
  constructor(
    private readonly resultService: ResultService,
    private readonly quizSubmissionFacade: QuizSubmissionFacade,
  ) {}

  @Post()
  @UseGuards(AuthGuard('access'))
  async create(@Req() req: Request, @Body() createResultDto: CreateResultDto) {
    const userId = (req.user as JwtPayload).sub;
    return this.quizSubmissionFacade.submitQuiz(
      userId,
      undefined,
      createResultDto,
    );
  }

  @Get(':quizId')
  findOne(@Param('quizId', ParseIntPipe) quizId: number) {
    return this.resultService.findOne(quizId);
  }
}
