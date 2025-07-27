"use client";
import React from "react";
import Container from "@/Components/Container";
import CartItem from "@/Components/CartItem";
import { IProductCard } from "@/Components/ProductCard";
import useBasket, { BasketState } from "@/Components/contexts/basket";

export interface ICartItem extends IProductCard {
  quantity: number;
}

const Cart = () => {
  const { basket , clearBasket } = useBasket();

console.log(basket)

  const totalPrice : () => number = () => {
    const result = basket.length ? basket.map(item => item.price).reduce((pre , curr) => pre + curr) : 0
    return result
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {basket.length ? (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-black mb-6">
            🛒 Shopping Cart
          </h2>

          <div className="space-y-4">
            {basket.length && basket.map((item) => {
              <CartItem key={item.id} {...item.id}/>
            })}
          </div>

          <div className="flex justify-between items-center pt-6 border-t mt-6">
            <span className="text-lg font-bold text-black">Total:</span>
            <span className="text-lg font-bold text-green-600">${totalPrice()}</span>
          </div>

          <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl capitalize cursor-pointer shadow transition-all duration-200">
            orderd now
          </button>
        </div>
      ) : (
        <h2 className="text-4xl font-bold text-black mb-6 text-center capitalize" onClick={clearBasket}>
          🛒 your basket is empty
        </h2>
      )}
    </div>
  );
};

export default Cart;
