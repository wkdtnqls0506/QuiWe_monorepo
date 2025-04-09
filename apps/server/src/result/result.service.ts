import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { ResultEntity } from './entities/result.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { QuizStatus } from 'src/quiz/enums/quiz-status.enum';
import { QuizEntity } from 'src/quiz/entities/quiz.entity';

// TODO: 반환값에 대한 타입 선언해주기

@Injectable()
export class ResultService {
  private readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ResultEntity)
    private readonly resultRepository: Repository<ResultEntity>,
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async create(
    quizId: number,
    createResultDto: CreateResultDto,
    userId: number,
  ) {
    const quiz = await this.quizRepository.findOne({
      where: { id: quizId },
    });

    const questions = await this.questionRepository.find({
      where: { quiz: { id: quizId } },
    });

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const resultsToSave = [];

    for (const question of questions) {
      const existingResult = await this.resultRepository.findOne({
        where: { question: { id: question.id } },
      });

      if (existingResult) {
        continue;
      }

      const answers = createResultDto.answers.find(
        (answer) => answer.questionId === question.id,
      ) || { userAnswer: '' };

      let results;

      if (question.type === 'multiple_choice') {
        const options = question.options;

        results = await this.getCorrectAnswerMultipleChoice(
          question.title,
          options,
          answers.userAnswer,
        );
      } else {
        results = await this.getCorrectAnswerSentence(
          question.title,
          answers.userAnswer,
        );
      }

      resultsToSave.push({
        question: question,
        userAnswer: answers.userAnswer,
        isCorrect: results.isCorrect,
        correctAnswer: results.correctAnswer,
        description: results.description,
        user,
        quiz,
      });
    }

    quiz.status = QuizStatus.COMPLETED;
    await this.resultRepository.save(resultsToSave);

    return { quizId: quiz.id };
  }

  async findOne(quizId: number) {
    return await this.resultRepository.find({
      where: { question: { quiz: { id: quizId } } },
      relations: ['question', 'user'],
    });
  }

  async getCorrectAnswerMultipleChoice(
    title: string,
    options: string[],
    userAnswer: string,
  ): Promise<{
    isCorrect: boolean;
    description: string;
    correctAnswer: string;
  }> {
    const prompt = `
      Evaluate the following multiple-choice question and provide the results in JSON format.
  
      Question: "${title}"
      Options: ${options.join(', ')}
  
      User's Answer: "${userAnswer}"
  
      ### Key Instructions:
      1. Evaluate whether the user's answer is correct based on the options provided.
      2. Provide a detailed explanation in Korean, indicating why the answer is correct or incorrect.
         - If correct, explain why the selected option is the correct one.
         - If incorrect, explain the mistake and provide the correct answer.
      3. Return the correct answer in Korean and explain why it is the best option.
  
      **Response Format (JSON)**
      {
        "isCorrect": true or false,
        "description": "A detailed explanation in Korean based on the user's answer.",
        "correctAnswer": "The correct answer in Korean with a detailed explanation."
      }
  
      **STRICTLY RETURN JSON ONLY.**
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0,
    });

    const result = response.choices[0].message?.content;

    return JSON.parse(result || '{}');
  }

  async getCorrectAnswerSentence(
    title: string,
    userAnswer: string,
  ): Promise<{
    isCorrect: boolean;
    description: string;
    correctAnswer: string;
  }> {
    const prompt = `
      Evaluate the following question and provide the results in JSON format.
  
      Question: "${title}"
  
      User's Answer: "${userAnswer}"
  
      ### Key Instructions:
      1. Determine if the user's answer is correct ('True') or incorrect ('False') based on the question's requirements.
      2. Provide a detailed explanation in Korean based on the user's answer.
         - If the answer is correct, provide a detailed explanation of why it is correct.
         - If the answer is incorrect, explain why it is wrong and provide constructive feedback on how to approach the question correctly.
      3. Return the correct or model answer in Korean.
  
      **Response Format (JSON)**
      {
        "isCorrect": true or false,
        "description": "A detailed explanation in Korean based on the user's answer.",
        "correctAnswer": "The correct answer in Korean or a detailed explanation of the concept."
      }
  
      **STRICTLY RETURN JSON ONLY.**
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0,
    });

    const result = response.choices[0].message?.content;

    return JSON.parse(result || '{}');
  }
}
