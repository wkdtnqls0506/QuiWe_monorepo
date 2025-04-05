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

  async create(createQuizDto: CreateQuizDto, extractedText?: string) {
    const { category, details, level } = createQuizDto;

    try {
      if (!details || !level) {
        throw new HttpException(
          '필수 입력값이 누락되었습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const prompt = this.createPrompt(category, details, level, extractedText);

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
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
    extractedText: string,
  ): string {
    if (extractedText) {
      return `You are a Technology Education Expert, focused on creating quizzes that deepen knowledge in various technology stacks. 
      Your task is to generate ${this.getRandomNumber(5, 10)} **based on the extracted text**, ensuring that the questions focus on technology-related concepts rather than just recalling specific facts from the text.
      All answers should be in Korean.
      The extracted text contains details about technologies and methodologies:
      """
      ${extractedText}
      """
    
    ### Key Instructions for Quiz Generation
    1. Identify Core Technology Areas
       - Extract key technologies, methodologies, and concepts from the text.  
       - Use this information to generate quiz questions that **test understanding of these topics**.
       - Avoid asking the name of a particular technology directly.
    
    2. Generate Questions That Test Technical Knowledge
       - Avoid asking factual questions about personal experiences in the text.  
       - Instead, generate questions that assess knowledge and application of the extracted technologies.  
    
    3. Cover a Variety of Question Types
       - Short-Answer Questions: Require concise technical explanations.  
       - Essay Questions: Encourage detailed reasoning and application of concepts.  
    
    4. Ensure the Questions Apply to Any Developer
       - Questions should be **universally applicable to professionals working with the extracted technologies**, not just the specific person in the portfolio.  
    
    5. Strict JSON Response Format
       - The response must strictly adhere to the following JSON format.
      
    **Response Format (JSON)**
    {
      "quizzes": [
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

    return `Create a quiz with the following requirements:
    - Category: ${category}
    - Details: ${details.join(', ')}
    - Difficulty Level: ${level}
    - Number of questions: ${this.getRandomNumber(15, 20)}
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
