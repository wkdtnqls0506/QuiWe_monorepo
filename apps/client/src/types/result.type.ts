import { TQuestion } from './quiz.type';

// 결과 생성 요청 Body
export type TUserAnswer = {
  questionId: number;
  userAnswer: string;
};

export type TResultRequest = {
  answers: TUserAnswer[];
};

export type TResultResponse = {
  id: number;
  createdAt: string;
  userAnswer: string;
  isCorrect: boolean;
  description: string;
  correctAnswer: string;
  question: TQuestion;
};
