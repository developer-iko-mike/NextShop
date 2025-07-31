"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import BasketItemCard, { ProductForm } from "./types";
import Swal from "sweetalert2";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import purl, { ourl } from "./utiles";

interface BasketItemItem extends BasketItemCard {
  children?: ReactNode;
}

const ProductCard = ({ id, title, caption, price, image }: BasketItemItem) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formik = useFormik<ProductForm>({
    initialValues: {
      title,
      caption,
      price,
      image,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      caption: Yup.string().required("Caption is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required"),
      image: Yup.string().required("Image URL is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { status } = await axios.put(
          `http://localhost:3001/product/${id}`,
          values
        );
        if (status === 200) {
          Swal.fire({
            title: "Updated!",
            text: "The product has been successfully updated.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          setIsEditing(false);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was a problem updating the product. Please try again.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    },
  });

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
      if (result.isConfirmed) {
        try {
          const { status } = await axios.delete(
            purl + `/${id}`
          );
          if (status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "The product has been successfully deleted.",
              icon: "success",
              timer: 1500,
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

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`bg-white min-h-[344px] rounded-2xl shadow-md overflow-hidden transition-transform ${
        !isEditing && "hover:scale-105"
      }`}
    >
      {isEditing ? (
        <form onSubmit={formik.handleSubmit} ref={formRef}>
          <div className="h-48 bg-gray-100 flex items-center justify-center relative">
            <img
              src={formik.values.image}
              alt={formik.values.title}
              className="object-contain h-full w-full"
            />
            <input
              type="text"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              placeholder="Image URL"
              className="absolute bottom-2 left-2 backdrop-blur-md bg-white/30 border-b-2 border-white/50 placeholder-white/70 rounded px-2 py-1 outline-none"
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-xs absolute bottom-0 left-2">
                {formik.errors.image}
              </div>
            )}
          </div>
          <div className="p-4">
            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoFocus
              className="text-xl font-bold text-gray-800 w-full bg-transparent border-none outline-none"
              placeholder="Title"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-xs">{formik.errors.title}</div>
            )}
            <textarea
              name="caption"
              value={formik.values.caption}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="text-gray-600 my-2 w-full bg-transparent border-none outline-none resize-none"
              placeholder="Caption"
            />
            {formik.touched.caption && formik.errors.caption && (
              <div className="text-red-500 text-xs">
                {formik.errors.caption}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex">
                <span className="text-lg font-semibold text-green-600">$</span>
                <input
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  className="bg-transparent border-none outline-none w-14 text-lg font-semibold text-green-600"
                  placeholder="Price"
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.price}
                  </div>
                )}
              </div>
              <div className="flex justify-between text-white w-9/12 gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-blue-400 shadow-2xl shadow-blue-400 duration-200 hover:shadow-blue-500 hover:shadow-3xl hover:bg-blue-500 grow py-2 rounded-lg cursor-pointer capitalize"
                >
                  cancel editing
                </button>
                <button
                  type="submit"
                  className="bg-rose-400 shadow-2xl shadow-rose-400 duration-200 hover:shadow-rose-500 hover:shadow-3xl hover:bg-rose-500 grow py-2 rounded-lg cursor-pointer capitalize"
                >
                  submit Edit
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="h-48 bg-gray-100 flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="object-contain h-full w-full"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600 my-2">{caption}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-green-600">
                ${price}
              </span>
              <div className="flex justify-between text-white w-2/3 gap-1.5">
                <button
                  onClick={() => setIsEditing(true)}
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
