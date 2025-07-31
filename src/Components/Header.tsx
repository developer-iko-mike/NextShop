"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import useStoreBasket from "./stores/useUserStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { IAdmin } from "./types";
import { aurl } from "./utiles";

interface INavItems {
  name: string;
  href: string;
}

export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalContent: Variants = {
  hidden: {
    y: -30,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      type: "spring",
      damping: 12,
      stiffness: 120,
    },
  },
  exit: {
    y: 30,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};
export default function Navbar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [navItems, setNavItems] = useState<INavItems[]>([
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
  ]);

  const buttonVariant: Variants = {
    initial: {
      scale: 1,
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.04,
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.96,
      transition: {
        duration: 0.1,
      },
    },
  };

  const pathname = usePathname();
  const { user, logout } = useStoreBasket();

  // Helper to determine if nav link is active
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const checkUserIsAdmin = async () => {
      if (user) {
        const { data } = await axios(aurl);
        const isAdmin = data.find((item: IAdmin) => item.gmail === user?.gmail);

        if (isAdmin) {
          setNavItems((prev) => {
            const alreadyExists = prev.some((item) => item.href === "/CMS");
            if (!alreadyExists) {
              return [...prev, { name: "Admin Panel", href: "/CMS" } , {name: "Edit Or Delete Product" , href: "/CMS/edit-delete"} , {name: "View Orders", href: "/CMS/orders"}];
            }
            return prev;
          });
        }
      }
    };

    checkUserIsAdmin();
  }, [user]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white shadow-md"
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navItems.map(({ name, href }) => (
              <Link
                key={href}
                href={href}
                className={
                  "text-base font-semibold p-2 rounded-md hover:text-white transition-colors duration-200 " +
                  (isActive(href)
                    ? "bg-[#68B984] text-white shadow-md"
                    : "text-gray-800 hover:bg-[#68B984]/80")
                }
              >
                {name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 relative">
            <div className="relative">
              {user?.basket?.length && user.basket.length > 0 ? (
                <>
                  <span className="rounded-full min-w-[33.25px] bg-emerald-300 text-white py-1 absolute -top-4 -right-6 z-10 flex justify-center items-center">
                    {user.basket.length}
                  </span>
                  <div className="rounded-full w-[33.25px] h-[33.25px] bg-emerald-200 absolute -top-4 -right-6 z-0 animate-ping"></div>
                </>
              ) : null}

              <Link
                href="/basket"
                className={
                  "text-base font-semibold p-2 rounded-md hover:text-white transition-colors duration-200 " +
                  (pathname === "/basket"
                    ? "bg-[#68B984] text-white shadow-md"
                    : "text-gray-800 hover:bg-[#68B984]/80")
                }
              >
                Your Basket
              </Link>
            </div>
            {Boolean(user) ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="text-base font-semibold p-2 rounded-md hover:text-black cursor-pointer transition-colors duration-200 hover:bg-transparent bg-[#68B984] text-white shadow-md"
              >
                {user?.username}
              </button>
            ) : (
              <Link
                href="/login"
                className={
                  "text-base font-semibold p-2 rounded-md hover:text-white transition-colors duration-200 " +
                  (pathname === "/login" || pathname === "/register"
                    ? "bg-[#68B984] text-white shadow-md"
                    : "text-gray-800 hover:bg-[#68B984]/80")
                }
              >
                Login / Register
              </Link>
            )}
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-white p-6 rounded shadow-lg w-[340px] text-center"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-lg font-bold mb-4">
                Are you sure you want to log out with {user?.username} username?
              </h2>
              <div className="flex justify-around">
                <motion.button
                  variants={buttonVariant}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    setShowLogoutModal(false);
                    logout();
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded shadow-sm transition-colors cursor-pointer"
                >
                  Yes
                </motion.button>

                <motion.button
                  variants={buttonVariant}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setShowLogoutModal(false)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded shadow-sm transition-colors cursor-pointer"
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
