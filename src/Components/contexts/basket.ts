import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type Product = {
  id: string;
  image: string;
  title: string;
  caption: string;
  price: number;
  quantity: number;
};

export type BasketState = {
  basket: Product[];
  addToBasket: (product: Omit<Product, "quantity">) => void;
  removeFromBasket: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearBasket: () => void;
};

const useBasket = create<BasketState>()(
  devtools(
    persist(
      (set) => ({
        basket: [],
        addToBasket: (product) =>
          set((state) => {
            const isProductInBasket = state.basket.find(
              (item) => item.id === product.id
            );
            if (isProductInBasket) { 
              return {
                basket: state.basket.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              };
            } else {
              return {
                basket: [...state.basket, { ...product, quantity: 1 }],
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
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          })),
        decreaseQty: (id) =>
          set((state) => ({
            basket: state.basket
              .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              )
              .filter((item) => item.quantity > 0),
          })),
        clearBasket: () => set({ basket: [] }),
      }),
      {
        name: "basket",
        version: 1,
      }
    )
  )
);

export default useBasket;
