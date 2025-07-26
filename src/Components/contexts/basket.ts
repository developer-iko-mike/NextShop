import { create } from "zustand";
// import { persist } from "zustand"

type Product = {
  id: number
  title: string
  price: number
  quantity: number
}

type BasketState = {
  basket: Product[]
  addToBasket: (product: Omit<Product, 'quantity'>) => void
  removeFromBasket: (id: number) => void
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  clearBasket: () => void
}


const useBasket = create <BasketState> ((set) => ({
  basket: [],
  addToBasket: product => set(state => ({basket: [...state.basket, product]})),
  removeFromBasket: (id) => set(state => ({basket: state.basket.filter(item => item.id !== id)})),
  increaseQty: (id) => set({}),
  decreaseQty: (id) => set(state => ({})),
  clearBasket: () => set({ basket: [] }),
}))

export default useBasket;