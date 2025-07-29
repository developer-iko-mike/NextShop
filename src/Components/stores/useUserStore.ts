import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { User } from "../types";

interface IStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;

  addProduct: (id: string) => void;
  removeFromBasket: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearBasket: () => void;
}

const useUserStore = create<IStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,

        setUser: (user) => set({ user }),
        logout: () => set({ user: null }),

        addProduct: (id) => {
          const user = get().user;
          if (!user) return;

          const exists = user.basket.find((item) => item.id === id);
          const updatedBasket = exists
            ? user.basket.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
              )
            : [...user.basket, { id, qty: 1 }];

          set({ user: { ...user, basket: updatedBasket } });
        },

        removeFromBasket: (id) => {
          const user = get().user;
          if (!user) return;

          const updatedBasket = user.basket.filter((item) => item.id !== id);
          set({ user: { ...user, basket: updatedBasket } });
        },

        increaseQty: (id) => {
          const user = get().user;
          if (!user) return;

          const updatedBasket = user.basket.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          );

          set({ user: { ...user, basket: updatedBasket } });
        },

        decreaseQty: (id) => {
          const user = get().user;
          if (!user) return;

          const updatedBasket = user.basket
            .map((item) =>
              item.id === id ? { ...item, qty: item.qty - 1 } : item
            )
            .filter((item) => item.qty > 0);

          set({ user: { ...user, basket: updatedBasket } });
        },

        clearBasket: () => {
          const user = get().user;
          if (!user) return;

          set({ user: { ...user, basket: [] } });
        },
      }),
      {
        name: "user-store",
      }
    )
  )
);

export default useUserStore;
