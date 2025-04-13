import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from './entities/portfolio.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';
import { QuizService } from 'src/quiz/quiz.service';
import * as pdf from 'pdf-parse';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
    private quizService: QuizService,
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

    const extractedText = await this.extractTextFromPdf(file);
    if (!extractedText || extractedText.trim().length < 50) {
      throw new HttpException(
        'PDF에서 유효한 텍스트를 추출할 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

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

    portfolio = this.portfolioRepository.create({
      fileName: Buffer.from(file.originalname, 'latin1').toString('utf-8'),
      filePath: fileURL,
      user: { id: user.id },
    });

    await this.portfolioRepository.save(portfolio);

    const quizData = await this.quizService.create(
      {
        category: '포트폴리오',
        details: [Buffer.from(file.originalname, 'latin1').toString('utf-8')],
        level: 2,
      },
      user.id,
      extractedText,
    );

    return { fileURL, quizId: quizData.id };
  }

  private async extractTextFromPdf(file: Express.Multer.File): Promise<string> {
    try {
      const data = await pdf(file.buffer);
      return data.text || '';
    } catch (error) {
      console.error('❌ PDF 텍스트 추출 중 오류 발생:', error);
      throw new InternalServerErrorException(
        'PDF에서 텍스트를 추출하는 중 오류가 발생했습니다.',
      );
    }
  }

  async getSignedPdfUrl(fileKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      ResponseContentType: 'application/pdf',
      ResponseContentDisposition: 'inline',
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 60 * 60 });
  }

  async find(userId: number) {
    const portfolios = await this.portfolioRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });

    const signedUrls = await Promise.all(
      portfolios.map(async (portfolio) => {
        const fileKey = portfolio.filePath.split('.com/')[1];
        const signedUrl = await this.getSignedPdfUrl(fileKey);
        return {
          ...portfolio,
          signedUrl,
        };
      }),
    );

    return signedUrls;
  }
}
