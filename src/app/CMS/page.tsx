"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Container from "@/Components/Container";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import CustomToast from "@/Components/CustomToast";

interface ProductForm {
  title: string;
  caption: string;
  price: string;
  image: File | null;
}

const AdminPanel = () => {
  const [form, setForm] = useState<ProductForm>({
    title: "",
    caption: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent | ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
    if (isNaN(+form.price)) {
      toast.warning("your feild price is not a number", {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
      });
    } else {
      toast.success(
        <CustomToast
          title="product added to database successfully"
          TiTleLink="view store"
          href="/store"
        />,
        {
          position: "bottom-right",
          autoClose: 3000,
          draggable: true,
        }
      );
      setForm({
        title: "",
        caption: "",
        price: "",
        image: null,
      });
      setPreview(null);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">
          Add New Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <input
              type="text"
              name="title"
              placeholder="Enter product title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              placeholder="Enter product price"
              value={form.price.toLocaleString()}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              min="0"
            />
          </div>
          <div>
            <textarea
              type="text"
              name="caption"
              placeholder="Enter product caption"
              value={form.caption}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="image"
            >
              Enter a image
            </label>
            <input
              type="file"
              name="image"
              // accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded border"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Submit Product
          </button>
        </form>
      </div>
    </Container>
  );
};

export default AdminPanel;
