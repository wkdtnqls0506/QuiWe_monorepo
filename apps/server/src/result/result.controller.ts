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
  constructor(private readonly resultService: ResultService) {}

  @Post(':quizId')
  @UseGuards(AuthGuard('access'))
  create(
    @Req() req: Request,
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body() createResultDto: CreateResultDto,
  ) {
    const userId = (req.user as JwtPayload).sub;
    return this.resultService.create(quizId, createResultDto, userId);
  }

  @Get(':quizId')
  findOne(@Param('quizId', ParseIntPipe) quizId: number) {
    return this.resultService.findOne(quizId);
  }
}
