import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from './entities/portfolio.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';

@Injectable()
export class PortfolioService {
  private s3: S3Client;
  private bucketName: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(PortfolioEntity)
    private portfolioRepository: Repository<PortfolioEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
    });
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET');
  }

  async s3UploadFile(file: Express.Multer.File, req: Request) {
    const user = await this.userRepository.findOne({
      where: { id: (req.user as JwtPayload).sub },
    });

    const fileKey = `pdf/${uuid()}${extname(file.originalname)}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);
    const fileURL = `https://${this.bucketName}.s3.amazonaws.com/${fileKey}`;

    let portfolio = await this.portfolioRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (portfolio) {
      portfolio.filePath = fileURL;
    } else {
      portfolio = this.portfolioRepository.create({
        filePath: fileURL,
        user: { id: user.id },
      });
    }

    await this.portfolioRepository.save(portfolio);

    return fileURL;
  }

  async findOne(userId: number) {
    return await this.portfolioRepository.findOne({
      where: { user: { id: userId } },
    });
  }
}
