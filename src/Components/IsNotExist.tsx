"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { INavItems } from "./types";

interface IisNotExist {
  title: string;
}

const linkItem : INavItems[] = [
  { name: "store", href: "/store" },
  { name: "basket", href: "/basket" },
  { name: "add product", href: "/CMS" },
  { name: "delete & edit product", href: "/CMS/edit-delete" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const isNotExist = ({ title }: IisNotExist) => {
  return (
    <div className="min-h-[49rem] flex items-center justify-center bg-gradient-to-br to-gray-200 from-white">
      <motion.div
        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="p-8 bg-white/10 rounded-2xl shadow-2xl backdrop-blur-md w-full max-w-3xl"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-black text-5xl md:text-6xl font-extrabold text-center tracking-wide"
        >
          {title}
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex justify-around mt-8"
        >
          {linkItem.map(({name, href}) => (
            <motion.div
              key={href}
              variants={itemVariants}
              className="text-blue-600 font-medium hover:underline transition"
            >
              <Link href={href}>{name}</Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default isNotExist;
