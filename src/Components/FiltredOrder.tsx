"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

const filterOptions = [
  { id: "pending", title: "Pending" },
  { id: "shipped", title: "Shipped" },
  { id: "delivered", title: "Delivered" },
  { id: "cancelled", title: "Cancelled" },
];

const FiltredOrder = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedItem, setSelectedItem] = useState<
    "all" | "pending" | "shipped" | "delivered" | "cancelled"
  >("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status && ["pending", "shipped", "delivered", "cancelled"].includes(status)) {
      setSelectedItem(status as typeof selectedItem);
    }
  }, []);

  const handleFiltering = (status: typeof selectedItem) => {
    setSelectedItem(status);
    const params = new URLSearchParams(window.location.search);
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-wrap justify-center gap-3"
    >
      <button
        onClick={() => handleFiltering("all")}
        className={clsx(
          "px-4 py-2 rounded-full font-medium border shadow-sm transition-all duration-300",
          selectedItem === "all"
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
        )}
      >
        All
      </button>
      {filterOptions.map(({ id, title }) => (
        <motion.button
          key={id}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleFiltering(id as typeof selectedItem)}
          className={clsx(
            "px-4 py-2 rounded-full font-medium border shadow-sm transition-all duration-300",
            selectedItem === id
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
          )}
        >
          {title}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default FiltredOrder;
