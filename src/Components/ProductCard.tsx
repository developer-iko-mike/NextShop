import React, { ReactNode } from "react";
import BasketItemCard from "./types";

interface BasketItemItem extends BasketItemCard {
  children?: ReactNode;
}

const ProductCard = ({
  title,
  caption,
  price,
  image,
}: BasketItemItem) => {
  return (
    <div className="bg-white min-h-[344px] rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img src={image} alt={title} className="object-contain h-full w-full" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 my-2">{caption}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-green-600">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;