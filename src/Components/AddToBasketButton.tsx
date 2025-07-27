"use client";
import React from "react";
import { Product } from "@/Components/contexts/basket";
import useBasket from "@/Components/contexts/basket";

const AddToBasketButton = (mainProduct: Product) => {
  
  const { addToBasket } = useBasket();

  return (
    <button
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition duration-200 shadow font-bold cursor-pointer"
      onClick={() => addToBasket(mainProduct)}
    >
      Add to product basket 🛒
    </button>
  );
};

export default AddToBasketButton;