import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/user/entities/user.entity';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { JwtKakaoStrategy } from './strategy/jwt.kakao.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' }, // TODO: 변경 필요
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [OauthController],
  providers: [OauthService, JwtKakaoStrategy],
  exports: [OauthService, JwtModule],
})
export class OauthModule {}
