import { createStore } from 'zustand/vanilla';

export type explanationVisibleState = {
  isExplanationVisible: boolean;
};

export type explanationVisibleAction = {
  setIsExplanationVisible: (isExplanationVisible: boolean) => void;
};

export type explanationVisibleStore = explanationVisibleState & explanationVisibleAction;

export const defaultInitState: explanationVisibleState = {
  isExplanationVisible: false
};

export const createExplanationVisibleStore = (initState: explanationVisibleState = defaultInitState) => {
  return createStore<explanationVisibleStore>((set) => ({
    isExplanationVisible: initState.isExplanationVisible,
    setIsExplanationVisible: (isExplanationVisible: boolean) => set(() => ({ isExplanationVisible }))
  }));
};
