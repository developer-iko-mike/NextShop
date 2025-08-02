"use client";
import React, { useState, FormEvent } from "react";
import Container from "@/Components/Container";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "@/Components/CustomToast";
import axios from "axios";
import { Che, ProductForm } from "@/Components/types";
import CMSQuiz from "@/Components/CMSQuiz";
import purl from "@/Components/utiles";

const AdminPanel = () => {
  const [form, setForm] = useState<ProductForm>({
    title: "",
    caption: "",
    price: "",
    image: "",
  });

  const handleChange = (e: Che) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isNaN(+form.price)) {
      toast.warning("your feild price is not a number", {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
      });
    } else {
      await axios({
        url: purl,
        method: "POST",
        data: {
          title: form.title,
          caption: form.caption,
          price: +form.price,
          image: form.image,
        },
      });
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
        image: "",
      });
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">
          Add New Product
        </h1>
        <CMSQuiz title="Need Edit Or Delete Product ?" href="/CMS/edit-delete" mb="mb-3"/>
        <CMSQuiz title="Need Watch Orders ?" href="/CMS/orders"/>
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
            <input
              type="text"
              name="image"
              placeholder="Enter image link"
              value={form.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <textarea
              name="caption"
              placeholder="Enter product caption"
              value={form.caption}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
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
