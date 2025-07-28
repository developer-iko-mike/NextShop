"use client";
import React from "react";
import useBasket from "@/Components/contexts/userBasket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export interface IID {
  id: string;
}

const CustomToast = () => (
  <div>
    <Link className="ml-1 flex flex-wrap" href="/basket">
      <span>Product added to basket!</span>
      <span className="text-sky-400 duration-150 hover:underline hover:text-sky-700">
        View Basket
      </span>
    </Link>
  </div>
);

const AddToBasketButton = ({ id }: IID) => {
  const { addProduct } = useBasket();

  const handleAdd = (id: string) => {
    addProduct(id);
    toast.success(<CustomToast />, {
      position: "bottom-right",
      autoClose: 3000,
      draggable: true,
    });
  };

  return (
    <>
      <ToastContainer />
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition duration-200 shadow font-bold cursor-pointer"
        onClick={() => handleAdd(id)}
      >
        Add to product basket 🛒
      </button>
    </>
  );
};

export default AddToBasketButton;
