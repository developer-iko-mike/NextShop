"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Container from "@/Components/Container";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "@/Components/CustomToast";
import axios from "axios";
import Link from "next/link";

interface UserForm {
  username: string;
  phone: string;
  gmail: string;
  password: string;
}

const Register = () => {
  const [form, setForm] = useState<UserForm>({
    username: "",
    phone: "",
    gmail: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent | ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isNaN(+form.phone)) {
      toast.warning("your phone numbre is not a number", {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
      });
    } else {
      console.log(form);
      axios({
        url: "http://localhost:3001/users",
        method: "POST",
        data: {
          username: form.username,
          phone: form.phone,
          gmail: form.gmail,
          password: form.password,
          basket: [],
        },
      });
      // num.slice(1) // 098 ... => 98 ...
      toast.success("logged in with successfully", {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
      });
      setForm({
        username: "",
        phone: "",
        gmail: "",
        password: "",
      });
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
              name="username"
              placeholder="Enter your username *"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute bottom-2.5 left-1.5">+98 |</span>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone *"
              value={form.phone}
              onChange={handleChange}
              className="w-full pr-4 pl-12 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              minLength={10}
              maxLength={10}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="password"
              placeholder="Enter your password *"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              minLength={6}
              maxLength={16}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="gmail"
              placeholder="Enter your email address"
              value={form.gmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-center gap-2.5">
            <p className="capitalize">alerdy have account ? </p>
            <Link
              href="/login"
              className="text-sky-400 duration-150 hover:underline hover:text-sky-600"
            >
              Login
            </Link>
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

export default Register;
