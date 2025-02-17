'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { createResultStore, ResultStore } from '@/stores/result-store';

export type ResultStoreApi = ReturnType<typeof createResultStore>;

export const ResultStoreContext = createContext<ResultStoreApi | undefined>(undefined);

export interface ResultStoreProviderProps {
  children: ReactNode;
}

export const ResultStoreProvider = ({ children }: ResultStoreProviderProps) => {
  const storeRef = useRef<ResultStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createResultStore();
  }

  return <ResultStoreContext.Provider value={storeRef.current}>{children}</ResultStoreContext.Provider>;
};

export const useResultStore = <T,>(selector: (store: ResultStore) => T): T => {
  const resultStoreContext = useContext(ResultStoreContext);

  if (!resultStoreContext) {
    throw new Error(`useAnswerStore must be used within AnswerStoreProvider`);
  }

  return useStore(resultStoreContext, selector);
};
