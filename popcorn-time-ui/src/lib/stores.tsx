import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  jwt: string | null;
  setJwt: (jwt: string) => void;
}

export const useSessionStore = create<UserState>()(
  persist((set) => ({
    jwt: null,
    setJwt: (jwt) => set((state) => ({ jwt: jwt })),
  }))
);
