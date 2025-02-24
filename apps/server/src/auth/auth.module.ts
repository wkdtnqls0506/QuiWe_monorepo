import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtAuthGuard, JwtStrategy } from './strategy/jwt.strategy';
import { UserEntity } from 'src/user/entities/user.entity';
import { PortfolioEntity } from 'src/portfolio/entities/portfolio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PortfolioEntity]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
