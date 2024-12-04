import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post(':quizId')
  create(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body() createResultDto: CreateResultDto,
  ) {
    return this.resultService.create(quizId, createResultDto);
  }
}
