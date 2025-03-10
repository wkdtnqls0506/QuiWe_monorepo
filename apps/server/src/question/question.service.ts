import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { CreateQuizDto } from 'src/quiz/dto/create-quiz.dto';

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

  async create(createQuizDto: CreateQuizDto) {
    const { category, details, level } = createQuizDto;

    try {
      if (!details || !level) {
        throw new HttpException(
          '필수 입력값이 누락되었습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isPortfolioQuiz = details[0].startsWith('http');

      const prompt = this.createPrompt(
        category,
        details,
        level,
        isPortfolioQuiz,
      );

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
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

  async saveQuestions(questions: Partial<QuestionEntity>[]) {
    const savedQuestions = await this.questionRepository.save(questions);
    return savedQuestions;
  }

  private createPrompt(
    category: string,
    details: string[],
    level: number,
    isPortfolioQuiz: boolean,
  ): string {
    const numQuestions = this.getRandomNumber(15, 20);

    if (isPortfolioQuiz) {
      return `You are an AI specialized in generating **technical interview questions** for software engineers.
      A user has uploaded their **portfolio**, and below is the extracted text from their document.  
      Analyze the **user's experience, technologies, projects, and methodologies** and generate **${numQuestions} advanced technical interview questions** in Korean.
      
      📌 **Extracted Portfolio Content (User’s Work Experience & Projects):**  
      ${details[0]}  
      
      📌 **Instructions:**  
      - **Extract key technologies, programming languages, frameworks, databases, and methodologies** from the portfolio.  
      - **DO NOT ASK personal questions** (e.g., name, email, phone number, GitHub, blog, school, personal details).  
      - **Focus strictly on technical skills and real-world problem-solving**.  
      - Generate **${numQuestions} structured technical interview questions** based on the user's experience.  
      - **Ensure a mix of multiple-choice, short-answer, and essay questions.**  
      - Questions should **simulate real-world coding interviews** and challenge the user's problem-solving abilities.  
      - **All responses must be in Korean**, even though the request is in English.  
      - The JSON output must be **valid and properly formatted**.  
      - **STRICTLY RETURN JSON ONLY.** Do NOT include any other text.
      
      📌 **Output Format (JSON Example):**  
      {
        "quizzes": [
          {
            "type": "multiple_choice",
            "title": "퀵 정렬(Quick Sort)의 최악의 경우 시간 복잡도는 무엇인가요?",
            "options": ["O(n log n)", "O(n^2)", "O(log n)", "O(n)"]
          },
          {
            "type": "short_answer",
            "title": "데이터베이스 인덱싱이 쿼리 성능을 향상시키는 원리를 설명하세요."
          },
          {
            "type": "essay",
            "title": "가장 최근 프로젝트에서 마주한 기술적 문제와 해결 방법을 설명하세요."
          }
        ]
      }
      
      📌 **DO NOT RETURN ANY OTHER TEXT. ONLY RETURN VALID JSON.**`;
    }

    return `Create a quiz with the following requirements:
    - Category: ${category}
    - Details: ${details.join(', ')}
    - Difficulty Level: ${level}
    - Number of questions: ${numQuestions}
    - Types of questions: Multiple choice, short answer, and essay questions.

     The response should be in JSON format, and all answers should be in Korean, even though the request is in English.
    
    **Response Format (JSON)**
    {
      "quizzes": [
        {
          "type": "multiple_choice",
          "title": "Example question?",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
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
    }
  
    **STRICTLY RETURN JSON ONLY.**`;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
