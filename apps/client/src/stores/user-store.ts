import { TUserResponse } from '@/types/user.type';
import { createStore } from 'zustand/vanilla';

export type UserState = TUserResponse | null;

export type UserAction = {
  setUser: (user: TUserResponse) => void;
  logout: () => void;
};

export type UserStore = { user: UserState } & UserAction;

export const defaultInitState: UserState = null;

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>((set) => ({
    user: initState,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null })
  }));
};
