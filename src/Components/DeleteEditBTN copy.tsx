"use client";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { ProductForm } from "./types";

interface IDeleteEditBTN {
  productID: string;
}

const DeleteEditBTN = ({ productID }: IDeleteEditBTN) => {
  const [form, setForm] = useState<ProductForm>({
    title: "",
    caption: "",
    image: "",
    price: "",
  });

  const handleEditProduct = async () => {
    try {
      const { data } = await axios.get<ProductForm>(
        `http://localhost:3001/product/${productID}`
      );

        setForm({
          title: data.title,
          caption: data.caption,
          image: data.image,
          price: data.price,
        });

      await Swal.fire({
        title: "Edit Product",
        icon: "warning",
        input: "text",
        inputValue: form.title,
        inputPlaceholder: "Enter Product Name",
        confirmButtonText: "Edit Now",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed && result.value) {
          try {
            await axios.put(`http://localhost:3001/product/${productID}`, form);
            Swal.fire({
              icon: "success",
              title: "Updated",
              text: "Product updated successfully!",
              timer: 3000,
              showConfirmButton: false,
              backdrop: false,
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: "Could not update product.",
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
              backdrop: false,
            });
            console.log("error", error);
          }
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Load",
        text: "Unable to fetch product data.",
        timer: 3000,
        showConfirmButton: false,
        backdrop: false,
      });
      console.log("error", err);
    }
  };

  const handleDeleteProduct = () => {
    Swal.fire({
      title: "Are you absolutely sure?",
      text: "This action cannot be undone. This will permanently delete the item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-xl p-6",
        title: "text-lg font-semibold text-gray-800",
        htmlContainer: "text-sm text-gray-600 mb-4",
        confirmButton: `
      bg-[#da3633]
      hover:bg-[#b62321]
      text-white
      font-bold
      text-base
      px-6
      py-3
      rounded-lg
      shadow-[0_0_10px_rgba(218,54,51,0.4)]
      hover:shadow-[0_0_15px_rgba(182,35,33,0.6)]
      transition-all
      duration-200
      ease-in-out
      transform
      hover:-translate-y-0.5
      cursor-pointer
    `,
        cancelButton: `
      bg-sky-600
      hover:bg-sky-700
      text-white
      font-medium
      text-base
      px-6
      py-3
      rounded-lg
      shadow-[0_0_10px_rgba(2,132,199,0.4)]
      hover:shadow-[0_0_15px_rgba(2,132,199,0.6)]
      transition-all
      duration-200
      ease-in-out
      transform
      hover:-translate-y-0.5
      cursor-pointer
    `,
        actions: "flex justify-end gap-4 mt-4",
      },
      backdrop: false,
      didOpen: () => {
        document.body.classList.add("swal-blur");
      },
      willClose: () => {
        document.body.classList.remove("swal-blur");
      },
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        try {
          const { status } = await axios.delete(
            `http://localhost:3001/product/${productID}`
          );
          if (status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "The product has been successfully deleted.",
              icon: "success",
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              buttonsStyling: false,
              customClass: {
                popup: "rounded-xl p-6",
                title: "text-lg font-semibold text-gray-800",
                htmlContainer: "text-sm text-gray-600 mb-4",
              },
              backdrop: false,
              didOpen: () => {
                document.body.classList.add("swal-blur");
              },
              willClose: () => {
                document.body.classList.remove("swal-blur");
              },
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the product. Please try again.",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
            buttonsStyling: false,
            customClass: {
              popup: "rounded-xl p-6",
              title: "text-lg font-semibold text-gray-800",
              htmlContainer: "text-sm text-gray-600 mb-4",
            },
            backdrop: false,
            didOpen: () => {
              document.body.classList.add("swal-blur");
            },
            willClose: () => {
              document.body.classList.remove("swal-blur");
            },
          });
        }
      }
    });
  };

  return (
    <div className="flex justify-between text-white w-2/3 gap-1.5">
      <button
        onClick={handleEditProduct}
        className="bg-blue-400 shadow-2xl shadow-blue-400 duration-200 hover:shadow-blue-500 hover:shadow-3xl hover:bg-blue-500 grow py-2 rounded-lg cursor-pointer capitalize"
      >
        edit
      </button>
      <button
        onClick={handleDeleteProduct}
        className="bg-rose-400 shadow-2xl shadow-rose-400 duration-200 hover:shadow-rose-500 hover:shadow-3xl hover:bg-rose-500 grow py-2 rounded-lg cursor-pointer capitalize"
      >
        delete
      </button>
    </div>
  );
};

export default DeleteEditBTN;
