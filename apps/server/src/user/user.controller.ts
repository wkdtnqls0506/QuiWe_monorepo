import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @UseGuards(AuthGuard('access'))
  findMe(@Req() req: Request) {
    return this.userService.findMe(req);
  }

  @Get('my-quizzes')
  @UseGuards(AuthGuard('access'))
  getUserQuizzes(@Req() req: Request) {
    return this.userService.getUserQuizzes(req);
  }
}
