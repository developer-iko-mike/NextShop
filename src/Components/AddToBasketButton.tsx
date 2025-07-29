"use client";
import React from "react";
import useUserStore from "@/Components/stores/useUserStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "./CustomToast";

const AddToBasketButton = ({ id }: {id: string}) => {
  const { addProduct } = useUserStore();

  const handleAdd = (id: string) => {
    addProduct(id);
    toast.success(<CustomToast title="Product added to basket!" TiTleLink="View Basket" href="/basket" />, {
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
