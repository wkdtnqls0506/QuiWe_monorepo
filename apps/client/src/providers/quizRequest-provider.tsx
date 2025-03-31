'use client';

import { createQuizRequestStore, QuizRequestStore } from '@/stores/quizRequest-store';
import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

export type QuizRequestStoreApi = ReturnType<typeof createQuizRequestStore>;

export const QuizRequestStoreContext = createContext<QuizRequestStoreApi | undefined>(undefined);

export interface QuizRequestStoreProviderProps {
  children: ReactNode;
}

export const QuizRequestStoreProvider = ({ children }: QuizRequestStoreProviderProps) => {
  const storeRef = useRef<QuizRequestStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createQuizRequestStore();
  }

  return <QuizRequestStoreContext.Provider value={storeRef.current}>{children}</QuizRequestStoreContext.Provider>;
};

export const useQuizRequestStore = <T,>(selector: (store: QuizRequestStore) => T): T => {
  const quizRequestStoreContext = useContext(QuizRequestStoreContext);

  if (!quizRequestStoreContext) {
    throw new Error(`useAnswerStore must be used within AnswerStoreProvider`);
  }

  return useStore(quizRequestStoreContext, selector);
};
