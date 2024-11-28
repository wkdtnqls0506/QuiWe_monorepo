import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PortfolioEntity } from 'src/portfolio/entities/portfolio.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  parseBasicToken(rawToken: string) {
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
    }

    const [basic, token] = basicSplit;

    if (basic.toLowerCase() !== 'basic') {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
    }

    const decoded = Buffer.from(token, 'base64').toString('utf-8');

    const tokenSplit = decoded.split(':');

    if (tokenSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
    }

    const [email, password] = tokenSplit;

    return {
      email,
      password,
    };
  }

  async parseBearerToken(rawToken: string, isRefreshToken: boolean) {
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
    }

    const [bearer, token] = basicSplit;

    if (bearer.toLowerCase() !== 'bearer') {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>(
          isRefreshToken
            ? process.env.REFRESH_TOKEN_SECRET
            : process.env.ACCESS_TOKEN_SECRET,
        ),
      });

      if (isRefreshToken) {
        if (payload.type !== 'refresh') {
          throw new BadRequestException('Refresh 토큰을 입력 해주세요!');
        }
      } else {
        if (payload.type !== 'access') {
          throw new BadRequestException('Access 토큰을 입력 해주세요!');
        }
      }

      return payload;
    } catch (e) {
      throw new UnauthorizedException('토큰이 만료됐습니다!');
    }
  }

  async register(rawToken: string, createUserDto: CreateUserDto) {
    const { email, password } = this.parseBasicToken(rawToken);
    const { name, portfolioId } = createUserDto;

    const portfolio = await this.portfolioRepository.findOne({
      where: { id: portfolioId },
    });

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException('이미 가입한 이메일 입니다!');
    }

    const hash = await bcrypt.hash(
      password,
      Number(this.configService.get<number>(process.env.HASH_ROUNDS)),
    );

    await this.userRepository.save({
      email,
      password: hash,
      name,
      portfolio,
    });

    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async authenticate(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('잘못된 로그인 정보입니다!');
    }

    const passOk = await bcrypt.compare(password, user.password);

    if (!passOk) {
      throw new BadRequestException('잘못된 로그인 정보입니다!');
    }

    return user;
  }

  async issueToken(user: { id: number }, isRefreshToken: boolean) {
    return this.jwtService.signAsync(
      {
        sub: user.id,
        type: isRefreshToken ? 'refresh' : 'access',
      },
      {
        secret: isRefreshToken
          ? process.env.REFRESH_TOKEN_SECRET
          : process.env.ACCESS_TOKEN_SECRET,
        expiresIn: isRefreshToken ? '24h' : '30m',
      },
    );
  }

  async login(rawToken: string) {
    const { email, password } = this.parseBasicToken(rawToken);

    const user = await this.authenticate(email, password);

    return {
      refreshToken: await this.issueToken(user, true),
      accessToken: await this.issueToken(user, false),
    };
  }
}
