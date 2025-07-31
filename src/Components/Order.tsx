import React from "react";
import axios from "axios";
import { getProductData, ourl } from "./utiles";
import {  Product } from "./types";
import OrderBtns from "./OrderBtns";

const OrderList = async () => {
  // گرفتن داده‌ها سرور
  const { data } = await axios.get<Product[]>(ourl);

  const allOrderItems = data.flatMap(order => order.orderItem ?? []);

  const productsData = await getProductData({ basketDatas: allOrderItems });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {data.map(order =>
        order.orderItem.map(basketItem => {
          const product = productsData.find(p => p.id === basketItem.id);
          if (!product) return null;

          return (
            <div
              key={`${order.id}-${product.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-[18.5rem]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full md:w-5/12 h-full object-contain"
              />
              <div className="p-5 flex flex-col justify-between flex-1 overflow-auto">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">N.{product.id} | {product.title}</h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><span className="font-semibold">User:</span> {order.username}</p>
                    <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                    <p className="transform-gpu"><span className="font-semibold">Address:</span> {order.address}</p>
                    <p><span className="font-semibold">Email:</span> {order.email}</p>
                    <p><span className="font-semibold">Quantity:</span> {basketItem.qty} pcs</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-4 pb-4"><OrderBtns id={order.id} status={order.status}/></div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderList;
