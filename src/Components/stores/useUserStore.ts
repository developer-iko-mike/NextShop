import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { IProduct, User } from "../types";

interface IStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;

  basket: IProduct[];
  addProduct: (id: string) => void;
  removeFromBasket: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearBasket: () => void;
}

const useUserStore = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logout: () => set({ user: null, basket: [] }),

        basket: [],
        addProduct: (id) =>
          set((state) => {
            const existing = state.basket.find((item) => item.id === id);
            if (existing) {
              return {
                basket: state.basket.map((item) =>
                  item.id === id ? { ...item, qty: item.qty + 1 } : item
                ),
              };
            } else {
              return {
                basket: [...state.basket, { id, qty: 1 }],
              };
            }
          }),
        removeFromBasket: (id) =>
          set((state) => ({
            basket: state.basket.filter((item) => item.id !== id),
          })),
        increaseQty: (id) =>
          set((state) => ({
            basket: state.basket.map((item) =>
              item.id === id ? { ...item, qty: item.qty + 1 } : item
            ),
          })),
        decreaseQty: (id) =>
          set((state) => {
            const item = state.basket.find((item) => item.id === id);
            if (!item) return { basket: state.basket };
            if (item.qty <= 1) {
              return {
                basket: state.basket.filter((item) => item.id !== id),
              };
            } else {
              return {
                basket: state.basket.map((item) =>
                  item.id === id ? { ...item, qty: item.qty - 1 } : item
                ),
              };
            }
          }),
        clearBasket: () => set({ basket: [] }),
      }),
      {
        name: "user-store", // اسم برای localStorage
      }
    )
  )
);

export default useUserStore;
