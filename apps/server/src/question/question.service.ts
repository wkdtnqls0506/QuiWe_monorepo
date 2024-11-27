import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuestionService {
  private readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async create(createQuizDto: any) {
    const { category, details, level } = createQuizDto;

    try {
      if (!details || !level) {
        throw new HttpException(
          '필수 입력값이 누락되었습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const prompt = this.createPrompt(category, details, level);
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      const generatedQuestions = JSON.parse(
        response.choices[0].message?.content || '{}',
      );

      return {
        status: 'SUCCESS',
        message: '퀴즈 문제를 성공적으로 생성했습니다.',
        data: generatedQuestions,
      };
    } catch (error) {
      console.error('퀴즈 생성 중 에러가 발생했습니다.:', error);
      throw new HttpException(
        '퀴즈 생성 중 에러가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Questions 저장
  async saveQuestions(questions: Partial<QuestionEntity>[]) {
    const savedQuestions = await this.questionRepository.save(questions);
    return savedQuestions;
  }

  private createPrompt(
    category: string,
    details: string[],
    level: number,
  ): string {
    const numQuestions = this.getRandomNumber(15, 20);

    return `Create a quiz with the following requirements:
    - Category: ${category}
    - Details: ${details.join(', ')}
    - Difficulty Level: ${level}
    - Number of questions: ${numQuestions}
    - Types of questions: Mix of multiple choice, short answer, and essay questions.

    The response should be in JSON format, and all answers should be in Korean, even though the request is in English.
    
    Example response format:

    {
      "quizzes": [
        {
          "type": "multiple_choice", 
          "title": "Example question?",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        },
        {
          "type": "short_answer",
          "title": "Example short answer question?"
        },
        {
          "type": "essay",
          "title": "Example essay question?"
        }
      ]
    }`;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
