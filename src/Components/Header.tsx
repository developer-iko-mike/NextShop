"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

interface INavItems {
  name: string;
  href: string;
}

const navItems = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  { name: "Your Basket", href: "/basket" },
];

export default function Navbar() {
  const pathname = usePathname();

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
                  "text-base font-semibold px-4 py-2 rounded-md hover:text-white transition-colors duration-200 " +
                  (isActive
                    ? "bg-[#68B984] text-white shadow-md"
                    : "text-gray-800 hover:bg-[#68B984]/80")
                }
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </Container>
    </motion.header>
  );
}
