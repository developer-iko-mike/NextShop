import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface IProduct {
  id: string;
  qty: number;
}

interface IStore {
  basket: IProduct[];
  addProduct: (id: string) => void;
  removeFromBasket: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearBasket: () => void;
}

const useStoreBasket = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        basket: [],
        addProduct: (id) =>
          set((state) => {
            const isProductInBasket = state.basket.find(
              (item) => item.id === id
            );
            if (isProductInBasket) {
              return {
                basket: state.basket.map((item) =>
                  item.id === id ? { ...item, qty: item.qty + 1 } : item
                ),
              };
            } else {
              return {
                basket: [...state.basket, { id: id, qty: 1 }],
              };
            }
          }),
        removeFromBasket: (id) =>
          set((state) => {
            const newBasket = state.basket.filter((item) => item.id !== id);
            return {
              basket: newBasket,
            };
          }),
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
              // Remove item if qty is 1 or less
              return {
                basket: state.basket.filter((item) => item.id !== id),
              };
            } else {
              // Decrease qty by 1
              return {
                basket: state.basket.map((item) =>
                  item.id === id ? { ...item, qty: item.qty - 1 } : item
                ),
              };
            }
          }),
        clearBasket: () => ({ basket: [] }),
      }),
      {
        name: "basket",
      }
    )
  )
);

export default useStoreBasket;