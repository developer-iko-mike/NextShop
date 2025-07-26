import React from 'react';
import Container from "@/Components/Container";
import CartItem from "@/Components/CartItem";
import {IProductCard } from "@/Components/ProductCard";

interface ICartItem extends IProductCard {
  quantity: number;
}


const Cart = () => {
  const items : ICartItem[] = [
    {
      id: 1,
      title: "Apple AirPods Pro",
      caption: "Noise-cancelling wireless earbuds",
      price: 249,
      image: "/store/airpad.webp",
      quantity: 1,
    },
    {
      id: 2,
      title: "Xiaomi Mi Band 7",
      caption: "Smart fitness tracker with heart rate monitor",
      price: 49,
      image: "/store/band.webp",
      quantity: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-black mb-6">🛒 Shopping Cart</h2>

        <div className="space-y-4">
          {items.map((item: ICartItem) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t mt-6">
          <span className="text-lg font-bold text-black">Total:</span>
          <span className="text-lg font-bold text-green-600">$298.00</span>
        </div>

        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl shadow transition-all duration-200">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
