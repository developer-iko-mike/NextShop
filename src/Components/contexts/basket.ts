import { create } from "zustand";
// import { persist } from "zustand"

type Product = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type BasketState = {
  basket: Product[];
  addToBasket: (product: Omit<Product, "quantity">) => void;
  removeFromBasket: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearBasket: () => void;
};

const useBasket = create<BasketState>((set) => ({
  basket: [],
  addToBasket: (product) =>
    set((state) => {
      const isProductInBasket = state.basket.find(item => item.id === product.id)
      if (isProductInBasket)  {
        return {
          basket: state.basket.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        }
      } else {
        return {
          basket: [...state.basket, { ...product, quantity: 1 }],
        }
      }
    }),
  removeFromBasket: (id) =>
    set((state) => ({ basket: state.basket.filter((item) => item.id !== id) })),
increaseQty: (id) =>
  set((state) => ({
    basket: state.basket.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    ,
  })),
decreaseQty: (id) =>
  set((state) => ({
    basket: state.basket.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 1),
  })),
  clearBasket: () => set({ basket: [] }),
}));

export default useBasket;