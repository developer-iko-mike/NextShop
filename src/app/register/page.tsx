"use client";
import React from "react";
import Container from "@/Components/Container";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUserStore from "@/Components/stores/useUserStore";

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
      username: Yup.string()
        .min(3, "Minimum 3 characters required")
        .max(20, "Maximum 20 characters allowed")
        .required("Username is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .length(10, "Phone number must be exactly 10 digits"),
      gmail: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters required")
        .max(16, "Maximum 16 characters allowed")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:3001/users", {
          ...values,
          basket: [],
        });
        setUser(res.data);
        toast.success("Registration completed successfully!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (err) {
        toast.error("There was a problem with registration", {
          position: "bottom-right",
        });
        console.error(err);
      }
    },
  });

  const inputClass = "w-full px-4 py-2 border border-sky-400 rounded-lg";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <Container>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Register</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4"
        >
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter your username *"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.username && formik.errors.username && (
              <p className={errorClass}>{formik.errors.username}</p>
            )}
          </div>

          <div className="relative">
            <span className="absolute bottom-2.5 left-1.5 text-gray-500">+98 |</span>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone *"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full pr-4 pl-12 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm -mt-3">{formik.errors.phone}</p>
            )}

          <div>
            <input
              type="text"
              name="gmail"
              placeholder="Enter your email *"
              value={formik.values.gmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.gmail && formik.errors.gmail && (
              <p className={errorClass}>{formik.errors.gmail}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password *"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={errorClass}>{formik.errors.password}</p>
            )}
          </div>

          <div className="flex justify-center gap-2.5 text-sm">
            <p>Already have an account?</p>
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
