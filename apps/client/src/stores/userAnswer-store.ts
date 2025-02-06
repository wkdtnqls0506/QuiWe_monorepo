import { createStore } from 'zustand/vanilla';

// 개별 답안의 타입
export type AnswerState = {
  questionId: number;
  userAnswer: string;
};

// 전체 답변을 담는 배열 타입
export type AnswerStore = {
  answers: AnswerState[];
  setAnswers: (questionId: number, userAnswer: string) => void;
};

export const defaultInitState: AnswerStore = {
  answers: [],
  setAnswers: () => {}
};

export const createAnswerStore = (initState: AnswerStore = defaultInitState) => {
  return createStore<AnswerStore>((set) => ({
    ...initState,
    setAnswers: (questionId: number, userAnswer: string) =>
      set((state) => {
        const newAnswers = [...state.answers];
        const index = newAnswers.findIndex((answer) => answer.questionId === questionId);

        if (index === -1) {
          newAnswers.push({ questionId, userAnswer });
        } else {
          newAnswers[index] = { questionId, userAnswer };
        }

        return { answers: newAnswers };
      })
  }));
};
