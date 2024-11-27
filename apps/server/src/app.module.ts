import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { UsersModule } from './user/users.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import ConfigModule from './config';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
    UsersModule,
    QuizModule,
    QuestionModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
