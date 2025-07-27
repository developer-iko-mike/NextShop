"use client";
import React from "react";
import useBasket from "@/Components/contexts/basket";

export type Product = {
  id: string;
  image: string;
  title: string;
  caption: string;
  price: number;
};

const AddToBasketButton = ({ id, image, title, caption, price }: Product) => {
  const { addToBasket } = useBasket();

  return (
    <button
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition duration-200 shadow font-bold cursor-pointer"
      onClick={() => addToBasket({ id, image, title, caption, price })}
    >
      Add to product basket 🛒
    </button>
  );
};

export default AddToBasketButton;