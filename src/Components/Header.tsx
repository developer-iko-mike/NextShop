"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import useStoreBasket from "./contexts/userBasket";

interface INavItems {
  name: string;
  href: string;
}

const navItems = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { basket } = useStoreBasket();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white shadow-md"
    >
      <Container>
        <nav className="flex items-center space-x-6 py-4">
          {navItems.map(({ name, href }: INavItems) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={
                  "text-base font-semibold p-2 rounded-md hover:text-white transition-colors duration-200 " +
                  (isActive
                    ? "bg-[#68B984] text-white shadow-md"
                    : "text-gray-800 hover:bg-[#68B984]/80")
                }
              >
                {name}
              </Link>
            );
          })}

          <div className="relative">
  {basket.length ? (
    <>
      <span className="rounded-full min-w-[33.25px] bg-emerald-300 text-white py-1 absolute -top-4 -right-6 z-10 flex justify-center items-center">
        {basket.length}
      </span>
      <div className="rounded-full w-[33.25px] h-[33.25px] bg-emerald-200 absolute -top-4 -right-6 z-0 animate-ping"></div>
    </>
  ) : null}


            <Link
              href="/basket"
              className={`text-base font-semibold p-2 rounded-md hover:text-white transition-colors duration-200  ${
                pathname === "/basket"
                  ? "bg-[#68B984] text-white shadow-md"
                  : "text-gray-800 hover:bg-[#68B984]/80"
              }`}
            >
              Your Basket
            </Link>
          </div>
        </nav>
      </Container>
    </motion.header>
  );
}
