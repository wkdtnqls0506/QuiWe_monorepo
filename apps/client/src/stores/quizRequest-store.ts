import { TQuizRequest } from './../types/quiz.type';
import { createStore } from 'zustand/vanilla';

export type QuizRequestState = {
  quizRequest: TQuizRequest | null;
};

export type QuizRequestAction = {
  setQuizRequest: (quizRequest: TQuizRequest) => void;
  resetQuizRequest: () => void;
};

export type QuizRequestStore = QuizRequestState & QuizRequestAction;

export const defaultInitState = {
  quizRequest: null
};

export const createQuizRequestStore = (initState: QuizRequestState = defaultInitState) => {
  return createStore<QuizRequestStore>((set) => ({
    quizRequest: initState.quizRequest,
    setQuizRequest: (quizRequest) => set(() => ({ quizRequest })),
    resetQuizRequest: () => set(() => ({ quizRequest: null }))
  }));
};
