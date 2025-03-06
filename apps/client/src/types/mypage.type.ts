import { TQuiz } from './quiz.type';

export type TMyPageHistories = {
  userId: number;
  quizzes: Omit<TQuiz, 'questions' | 'version'>[];
};
