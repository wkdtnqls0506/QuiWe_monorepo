import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { ResultEntity } from './entities/result.entity';

@Injectable()
export class ResultService {
  private readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ResultEntity)
    private readonly resultRepository: Repository<ResultEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async create(quizId: number, createResultDto: CreateResultDto) {
    const questions = await this.questionRepository.find({
      where: { quiz: { id: quizId } },
    });

    const resultsToSave = [];

    for (const question of questions) {
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
        question: question.id,
        userAnswer: answers.userAnswer,
        isCorrect: results.isCorrect,
        correctAnswer: results.correctAnswer,
        description: results.description,
      });
    }

    return await this.resultRepository.save(resultsToSave);
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
    Question: ${title}
    Options: ${options.join(', ')}

    User's Answer: "${userAnswer}"

    Evaluation Criteria:
    1. Correctness Evaluation:
      - Determine if the user's answer matches the correct option among the provided choices.
      - Return 'true' if the user's answer is correct, or 'false' if it is incorrect.
    2. Detailed Explanation:
      - If the user's answer is correct, explain why it is the correct answer, focusing on the technical or logical reasons.
      - If the user's answer is incorrect, clearly explain why it is wrong and provide guidance to help the user understand the correct choice.
    3. Correct Answer:
      - If the user's answer is incorrect, specify the correct answer clearly and explain why it is the most appropriate choice among the options.

    Your output should strictly follow this JSON format:
    {
      "isCorrect": true or false,
      "description": "Provide a detailed explanation in Korean. If the answer is correct, explain why it is correct. If incorrect, explain the mistake and provide constructive feedback.",
      "correctAnswer": "Provide the correct answer in Korean and explain why it is the best choice."
    }
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
    Evaluate the following answer to a question and provide the results in JSON format.
  
    Question: "${title}"
  
    User's Answer: "${userAnswer}"
  
    Evaluation Criteria:
    1. Determine if the user's answer is correct ('True') or incorrect ('False') based on the question's requirements.
    2. Provide a detailed explanation in Korean tailored to the user's answer:
       - If the answer is correct, provide additional technical insights, examples, or related concepts to deepen the user's understanding.
       - If the answer is incorrect, analyze the user's response to explain why it is incorrect. Offer constructive feedback on how to approach the question correctly and clarify the correct answer.
    3. Include the correct or model answer in Korean for clarity.
  
    Your output should strictly follow this JSON format:
    {
      "isCorrect": true or false,
      "description": "A detailed explanation in Korean based on the user's answer. Include technical insights or feedback depending on the correctness.",
      "correctAnswer": "The correct answer in Korean or a detailed explanation of the concept related to the question."
    }
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
