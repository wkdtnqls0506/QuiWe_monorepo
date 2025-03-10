import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from './entities/portfolio.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntity, UserEntity]),
    QuizModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
