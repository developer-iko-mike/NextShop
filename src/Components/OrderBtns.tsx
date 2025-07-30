"use client";
import React, { useState } from "react";
import { Product } from "./types";

type OrderStatus = Pick<Product, "status">;

const OrderBtns = ({ status }: OrderStatus) => {
  const [isAcceptClicked, setIsAcceptClicked] = useState<boolean>(false);
  const [isDeliveredClicked, setIsDeliveredClicked] = useState<boolean>(false);

  const handleDelivered = () => {
    setIsDeliveredClicked(true);
  };
  const handleAccept = () => {
    setIsAcceptClicked(true);
  };
  const handleDelete = () => {
    console.log("first")
  };
  const handleCancel = () => {
    console.log("first")
  };

  return (
    <div className="flex flex-wrap gap-2 mt-auto pt-4 pb-4">
      {isDeliveredClicked ? null : isAcceptClicked ? (
        <button
          onClick={handleDelivered}
          className="px-4 py-1 text-sm font-semibold rounded-lg bg-green-100 text-green-800 hover:bg-green-200 transition duration-200 cursor-pointer"
        >
          Delivered
        </button>
      ) : (
        <button
          onClick={handleAccept}
          className="px-4 py-1 text-sm font-semibold rounded-lg bg-green-100 text-green-800 hover:bg-green-200 transition duration-200 cursor-pointer"
        >
          Accept
        </button>
      )}

      {isDeliveredClicked ? (
        <button
          onClick={handleDelete}
          className="px-4 py-1 text-sm font-semibold rounded-lg bg-red-100 text-red-800 hover:bg-red-200 transition duration-200 cursor-pointer"
        >
          Delete
        </button>
      ) : (
        <button
          onClick={handleCancel}
          className="px-4 py-1 text-sm font-semibold rounded-lg bg-red-100 text-red-800 hover:bg-red-200 transition duration-200 cursor-pointer"
        >
          Cancel
        </button>
      )}

      <div className="flex gap-2 w-full mt-2">
        {["pending", "shipped", "delivered", "cancelled"].map((statusItem) => {
          let bg = "",
            text = "";
          switch (statusItem) {
            case "pending":
              bg = "bg-yellow-100";
              text = "text-yellow-800";
              break;
            case "shipped":
              bg = "bg-blue-100";
              text = "text-blue-800";
              break;
            case "delivered":
              bg = "bg-green-100";
              text = "text-green-800";
              break;
            case "cancelled":
              bg = "bg-red-100";
              text = "text-red-800";
              break;
          }
          return (
            <button
              key={statusItem}
              disabled
              className={`px-3 py-1 text-sm font-semibold rounded-lg cursor-not-allowed capitalize ${bg} ${text} opacity-50 ${
                statusItem.toLowerCase() === status.toLowerCase()
                  ? "opacity-100 ring-2 ring-offset-1 ring-gray-400"
                  : ""
              }`}
            >
              {statusItem}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default OrderBtns;
