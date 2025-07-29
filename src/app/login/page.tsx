"use client";
import React from "react";
import Container from "@/Components/Container";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserStore } from "@/Components/contexts/authUser";
import CustomToast from "@/Components/CustomToast";
import { User } from "@/Components/types";

const Login = () => {
  const { setUser } = useUserStore();

  const formik = useFormik({
    initialValues: {
      loginId: "",
      password: "",
    },
    validationSchema: Yup.object({
      loginId: Yup.string().min(3).max(40).required("Required"),
      password: Yup.string().min(5).max(16).required("Required"),
    }),
    onSubmit: async ({ loginId, password }) => {
      try {
        const handleCheckPassword = (user: User) =>
          user.password === password;
        const { data } = await axios("http://localhost:3001/users");
        const usernameAuth =
          data.filter((item: User) => item.username === loginId)[0] || null;
        const phoneAuth =
          data.filter((item: User) => item.phone === loginId)[0] || null;
        const emailAuth =
          data.filter((item: User) => item.gmail === loginId)[0] || null;
        if (Boolean(usernameAuth) && handleCheckPassword(usernameAuth)) {
          setUser(usernameAuth)
          toast.success("you are login now with usernameAuth", {
            position: "bottom-right",
            autoClose: 3000,
            draggable: true,
          });
        } else if (Boolean(phoneAuth) && handleCheckPassword(phoneAuth)) {
          setUser(phoneAuth)
          toast.success("you are login now with phoneAuth", {
            position: "bottom-right",
            autoClose: 3000,
            draggable: true,
          });
        } else if (Boolean(emailAuth) && handleCheckPassword(emailAuth)) {
          setUser(emailAuth)
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
      } catch (error) {
        toast.error(
          <CustomToast
            title="forget your password ?"
            TiTleLink="click here"
            href="/forget-password"
          />,
          {
            position: "bottom-right",
          }
        );
        console.log(error);
      }
    },
  });

  return (
    <Container>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800 capitalize">
          enter your iD then we can find you
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <input
              type="text"
              name="loginId"
              placeholder="Enter username / phone / email"
              value={formik.values.loginId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.loginId && formik.errors.loginId && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.loginId}
              </p>
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
              className="w-full px-4 py-2 border border-sky-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="flex justify-center gap-2.5">
            <p className="capitalize">don{"'t"} have account ? </p>
            <Link
              href="/register"
              className="text-sky-400 hover:underline hover:text-sky-600"
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
