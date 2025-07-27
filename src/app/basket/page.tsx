"use client";
import React, { useEffect, useState } from "react";
import Container from "@/Components/Container";
import CartItem from "@/Components/CartItem";
import { IProductCard } from "@/Components/ProductCard";
import useStoreBasket, { IProduct } from "@/Components/contexts/userBasket";
import axios from "axios";

export interface ICartItem extends IProductCard {
  quantity: number;
}

const Cart = () => {
  const { basket, clearBasket } = useStoreBasket();

  const [mainBasket, setMainBasket] = useState<ICartItem[]>([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/product");
        if (res.status === 200) {
          const result = basket
            .map((basketItem: IProduct) => {
              const dataItem = res.data.find(
                (d: IProduct) => d.id === basketItem.id
              );
              if (dataItem) {
                return {
                  ...dataItem,
                  quantity: basketItem.qty,
                };
              }
              return null;
            })
            .filter((item: ICartItem) => item !== null);
          setMainBasket(result);
        }
      } catch (err) {
        console.error("خطا در دریافت اطلاعات محصولات:", err);
      }
    };

    getProductData();
  }, [basket]);

  console.log(mainBasket);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-black mb-6">🛒 Shopping Cart</h2>

        {basket.length ? (
          <>
            <div className="space-y-4">
              {mainBasket.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t mt-6">
              <span className="text-lg font-bold text-black">Total:</span>
              <span className="text-lg font-bold text-green-600">
                $
                {mainBasket
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>

            <button
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl capitalize cursor-pointer shadow transition-all duration-200"
              onClick={clearBasket}
            >
              order now
            </button>
          </>
        ) : (
          <h2 className="text-4xl font-bold text-black mb-6 text-center capitalize">
            🛒 your basket is empty
          </h2>
        )}
      </div>
    </div>
  );
};

export default Cart;
