import { createStore } from 'zustand/vanilla';

export type ResultState = {
  resultId: number;
};

export type ResultAction = {
  setResultId: (resultId: number) => void;
};

export type ResultStore = ResultState & ResultAction;

export const defaultInitState: ResultState = {
  resultId: 1
};

export const createResultStore = (initState: ResultState = defaultInitState) => {
  return createStore<ResultStore>((set) => ({
    ...initState,
    setResultId: (resultId: number) => set(() => ({ resultId }))
  }));
};
