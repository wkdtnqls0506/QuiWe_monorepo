import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { LoggingMiddleware } from './middleware/logging.middleware';
import ConfigModule from './config';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ResultModule } from './result/result.module';
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
    UserModule,
    QuizModule,
    QuestionModule,
    AuthModule,
    PortfolioModule,
    ResultModule,
    OauthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
