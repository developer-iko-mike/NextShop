"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Container from "@/Components/Container";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "@/Components/CustomToast";
import axios from "axios";
import Link from "next/link";

interface UserForm {
  id: string;
  username: string;
  phone: string;
  gmail: string;
  password: string;
}

const Login = () => {
  const [isUserLogin, setIsUserLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios("http://localhost:3001/users");

    const handleCheckPassword = (product: UserForm) => product.password === password

    const usernameAuth =
      data.filter((item: UserForm) => item.username === isUserLogin)[0] || null;
    const phoneAuth =
      data.filter((item: UserForm) => item.phone === isUserLogin)[0] || null;
    const emailAuth =
      data.filter((item: UserForm) => item.gmail === isUserLogin)[0] || null;
    if (Boolean(usernameAuth) && handleCheckPassword(usernameAuth)) {
      toast.success("you are login now with usernameAuth", {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
      });
    } else if (Boolean(phoneAuth) && handleCheckPassword(phoneAuth)) {
      toast.success("you are login now with phoneAuth", {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
      });
    } else if (Boolean(emailAuth) && handleCheckPassword(emailAuth)) {
      toast.success("you are login now with emailAuth", {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
      });
    } else {
      toast.error("your email or password is wrong or now alavid", {
        position: "bottom-right",
        autoClose: 3000,
        draggable: true,
      });
    }
    setIsUserLogin("");
    setPassword("");
  };

  return (
    <Container>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800 capitalize">
          enter your iD then we can find you
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <input
              type="text"
              placeholder="Enter username / phone (without 0) / email"
              value={isUserLogin}
              onChange={(e) => setIsUserLogin(e.target.value)}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              minLength={3}
              maxLength={40}
              required
            />
          </div>
            <div>
            <input
              type="text"
              name="password"
              placeholder="Enter your password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              minLength={5}
              maxLength={16}
              required
            />
          </div>
          <div className="flex justify-center gap-2.5">
            <p className="capitalize">don't have account ? </p>
            <Link
              href="/register"
              className="text-sky-400 duration-150 hover:underline hover:text-sky-600"
            >
              Register
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

export default Login;
