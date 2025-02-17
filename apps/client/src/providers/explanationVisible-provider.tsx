'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { createExplanationVisibleStore, explanationVisibleStore } from '@/stores/explanationVisible-store';

export type ExplanationVisibleStoreApi = ReturnType<typeof createExplanationVisibleStore>;

export const ExplanationVisibleStoreContext = createContext<ExplanationVisibleStoreApi | undefined>(undefined);

export interface ExplanationVisibleStoreProviderProps {
  children: ReactNode;
}

export const ExplanationVisibleStoreProvider = ({ children }: ExplanationVisibleStoreProviderProps) => {
  const storeRef = useRef<ExplanationVisibleStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createExplanationVisibleStore();
  }

  return (
    <ExplanationVisibleStoreContext.Provider value={storeRef.current}>
      {children}
    </ExplanationVisibleStoreContext.Provider>
  );
};

export const useExplanationVisibleStore = <T,>(selector: (store: explanationVisibleStore) => T): T => {
  const explanationVisibleStoreContext = useContext(ExplanationVisibleStoreContext);

  if (!explanationVisibleStoreContext) {
    throw new Error(`useAnswerStore must be used within AnswerStoreProvider`);
  }

  return useStore(explanationVisibleStoreContext, selector);
};
