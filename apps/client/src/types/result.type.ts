// 결과 생성 요청 Body
export type TUserAnswer = {
  questionId: number;
  userAnswer: string;
};

export type TResultRequest = {
  answers: TUserAnswer[];
};
