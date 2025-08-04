import React from "react";
import { getProductData, ourl } from "./utiles";
import OrderBtns from "./OrderBtns";
import Image from "next/image";
import { Product } from "./types";

const OrderList = async (data  : Product[]) => {

  const allOrderItems = data.map((order) => order.orderItem);
  const productsData = await getProductData({ basketDatas: allOrderItems });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {data.map(
        ({ id, username, phone, address, email, status, orderItem }) => {
          const product = productsData.find((p) => p.id === orderItem.id);
          if (!product) return null;

          return (
            <div
              key={`${id}-${product.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-[18.5rem]"
            >
              <Image
                src={product.image}
                alt={product.title}
                className="w-full md:w-5/12 h-full object-contain"
              />
              <div className="px-5 py-3.5 flex flex-col flex-1 overflow-auto">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    N.{product.id} | {product.title}
                  </h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-semibold">User:</span> {username}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span> {address}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {email}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {orderItem.qty} pcs
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <OrderBtns id={id} status={status} />
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default OrderList;
