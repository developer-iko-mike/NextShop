"use client";
import React, { useEffect, useState } from "react";
import { Product } from "./types";
import axios from "axios";
import { ourl } from "./utiles";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const OrderBtns = ({ id, status }: Pick<Product, "id" | "status">) => {

  const router = useRouter();
  const [isAcceptClicked, setIsAcceptClicked] = useState<boolean>(false);
  const [isDeliveredClicked, setIsDeliveredClicked] = useState<boolean>(false);
  const [isCancelClicked , setIsCancelClicked] = useState<boolean>(false);

useEffect(() => {
  setIsAcceptClicked(false);
  setIsDeliveredClicked(false);
  setIsCancelClicked(false);

  switch (status) {
    case "pending":
      console.log("The order is being processed.")
      break;
    case "shipped":
      setIsAcceptClicked(true);
      break;
    case "delivered":
      setIsDeliveredClicked(true);
      break;
    case "cancelled":
      setIsCancelClicked(true);
      break;
    default:
      console.warn("The status is unknown:", status);
      break;
  }
}, [status]);


  const finllyBtnMethod = (time : number = 750) => {
    setTimeout(() => {
      router.refresh();
    }, time);
  };

  const handleChangeStatus = async (statusNow : string) => {
    try {
      const res = await axios.patch(ourl + `/${id}`, { status: statusNow, });
      console.log(res);
    } catch (error) {
      console.error("خطا در آپدیت سفارش:", error);
    }    
  }

  
  const handleAccept = () => {
    handleChangeStatus("shipped")
    setIsAcceptClicked(true);
    finllyBtnMethod()
  };
  
  const handleDelivered = () => {
    handleChangeStatus("delivered")
    setIsDeliveredClicked(true);
    finllyBtnMethod()
  };

  const handleCancel = () => {
    handleChangeStatus("cancelled")
    setIsCancelClicked(true);
    finllyBtnMethod()
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(ourl + `/${id}`);
      console.log(res);
    } catch (error) {
      console.error("خطا در حذف سفارش:", error);
    }    
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.1 } },
    tap: { scale: 0.95 },
  };

  const statusButtonVariants = {
    initial: { scale: 1 },
    active: {
      scale: 1.05,
      transition: { repeat: Infinity, repeatType: "reverse", duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-wrap gap-2 mt-auto pt-4 pb-4">
      <AnimatePresence mode="wait">
        {isDeliveredClicked ? null : isAcceptClicked ? (
          <motion.button
            key="delivered-btn"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleDelivered}
            className="px-4 py-1 text-sm font-semibold rounded-lg bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200 cursor-pointer"
          >
            Delivered
          </motion.button>
        ) : (
          <motion.button
            key="accept-btn"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleAccept}
            className="px-4 py-1 text-sm font-semibold rounded-lg bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200 cursor-pointer"
          >
            Accept
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeliveredClicked ? (
          <motion.button
            key="delete-btn"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleDelete}
            className="px-4 py-1 text-sm font-semibold rounded-lg bg-red-100 text-red-800 hover:bg-red-200 transition-colors duration-200 cursor-pointer"
          >
            Delete
          </motion.button>
        ) : (
          <motion.button
            key="cancel-btn"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleCancel}
            className="px-4 py-1 text-sm font-semibold rounded-lg bg-red-100 text-red-800 hover:bg-red-200 transition-colors duration-200 cursor-pointer"
            disabled={isCancelClicked}
          >
            Cancel
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex gap-2 w-full mt-2">
        {["pending", "shipped", "delivered", "cancelled"].map((statusItem) => {
          let bg = "",
            text = "";
          switch (statusItem) {
            case "pending":
              bg = "bg-yellow-100";
              text = "text-yellow-800";
              break;
            case "shipped":
              bg = "bg-blue-100";
              text = "text-blue-800";
              break;
            case "delivered":
              bg = "bg-green-100";
              text = "text-green-800";
              break;
            case "cancelled":
              bg = "bg-red-100";
              text = "text-red-800";
              break;
          }
          return (
            <motion.button
              key={statusItem}
              disabled
              initial="initial"
              animate={
                statusItem.toLowerCase() === status.toLowerCase()
                  ? "active"
                  : "initial"
              }
              variants={statusButtonVariants}
              className={`px-3 py-1 text-sm font-semibold rounded-lg cursor-not-allowed capitalize ${bg} ${text} opacity-50 ${
                statusItem.toLowerCase() === status.toLowerCase()
                  ? "opacity-100 ring-2 ring-offset-1 ring-gray-400"
                  : ""
              }`}
            >
              {statusItem}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderBtns;
