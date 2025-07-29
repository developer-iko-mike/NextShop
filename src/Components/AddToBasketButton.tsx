"use client";
import React from "react";
import useUserStore from "@/Components/stores/useUserStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "./CustomToast";
import Link from "next/link";

const AddToBasketButton = ({ id }: { id: string }) => {
  const { addProduct, user } = useUserStore();

  console.log(user);

  const handleAdd = (id: string) => {
    addProduct(id);
    toast.success(
      <CustomToast
        title="Product added to basket!"
        TiTleLink="View Basket"
        href="/basket"
      />,
      {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
      }
    );
  };

  return (
    <>
      <ToastContainer />
      {Boolean(user) ? (
        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition duration-200 shadow font-bold cursor-pointer"
          onClick={() => handleAdd(id)}
        >
          Add to product basket 🛒
        </button>
      ) : (
        <Link
          className="mt-4 bg-blue-600 text-center hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition duration-200 shadow font-bold cursor-pointer"
          href="/login"
        >
          Add to product basket 🛒
        </Link>
      )}
    </>
  );
};

export default AddToBasketButton;
