import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  phone: string;
  gmail: string;
  password: string;
  basket: any[]; // یا تعریف دقیق‌تر برای آیتم‌های سبد خرید
}

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
