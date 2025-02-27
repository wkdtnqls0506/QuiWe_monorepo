import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/user/entities/user.entity';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { JwtKakaoStrategy } from './strategy/jwt.kakao.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ConfigModule,
  ],
  controllers: [OauthController],
  providers: [OauthService, JwtKakaoStrategy],
  exports: [OauthService, JwtModule],
})
export class OauthModule {}
