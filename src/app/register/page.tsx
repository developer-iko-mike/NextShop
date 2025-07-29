"use client";
import React from "react";
import Container from "@/Components/Container";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserStore } from "@/Components/contexts/authUser";

const Register = () => {
  const { setUser } = useUserStore();

  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      gmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3).max(20).required("Required"),
      phone: Yup.string().length(10).required("Required"),
      gmail: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6).max(16).required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:3001/users", {
          ...values,
          basket: [],
        });
        setUser(res.data);
        toast.success("ثبت‌نام با موفقیت انجام شد!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        toast.error("مشکلی در ثبت‌نام پیش آمد", {
          position: "bottom-right",
        });
        console.error(err);
      }
    },
  });

  return (
    <Container>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Register</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <input
            type="text"
            name="username"
            placeholder="Enter your username *"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-sky-400 rounded-lg"
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone (10 digits) *"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-sky-400 rounded-lg"
          />
          <input
            type="text"
            name="gmail"
            placeholder="Enter your email *"
            value={formik.values.gmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-sky-400 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password *"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-sky-400 rounded-lg"
          />

          <div className="flex justify-center gap-2.5">
            <p>Already have account?</p>
            <Link href="/login" className="text-sky-400 hover:underline">
              Login
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
