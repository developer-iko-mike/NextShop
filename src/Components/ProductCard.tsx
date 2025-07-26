import React from 'react';

export interface IProductCard {
  id?: string | number,
  image: string | File,
  title: string,
  caption: string,
  price?: number,
}

const ProductCard = ({ title, caption, price, image }: IProductCard) => {
  return (
    <div className="bg-white min-h-[344px] rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img src={image} alt={title} className="object-contain h-full w-full" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 my-2">{caption}</p>
        <div className="text-lg font-semibold text-green-600">${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
