import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { User } from '@/Components/types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);
