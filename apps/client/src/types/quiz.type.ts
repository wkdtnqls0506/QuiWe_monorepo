// 퀴즈 생성 요청 body
export type TQuizRequest = {
  category: string;
  details: string[];
  level: number;
};

// 문제 유형
export type QuestionType = 'multiple_choice' | 'short_answer' | 'essay';

// 개별 질문 타입
export type TQuestion = {
  id: number;
  createdAt: string;
  updatedAt: string;
  version: number;
  type: QuestionType;
  title: string;
  options?: string[];
};

// 전체 퀴즈 타입
export type TQuiz = {
  id: number;
  category: string;
  level: number;
  details: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  questions: TQuestion[];
};
