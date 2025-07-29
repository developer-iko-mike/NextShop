"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import useStoreBasket from "./stores/userBasket";

interface INavItems {
  name: string;
  href: string;
}

const navItems: INavItems[] = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  { name: "Admin Panel", href: "/CMS" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { basket } = useStoreBasket();

  // Helper to determine if nav link is active
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
              {basket.length > 0 && (
                <>
                  <span className="rounded-full min-w-[33.25px] bg-emerald-300 text-white py-1 absolute -top-4 -right-6 z-10 flex justify-center items-center">
                    {basket.length}
                  </span>
                  <div className="rounded-full w-[33.25px] h-[33.25px] bg-emerald-200 absolute -top-4 -right-6 z-0 animate-ping"></div>
                </>
              )}
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
            <Link
              href="/login"
              className={
                "text-base font-semibold p-2 rounded-md hover:text-white transition-colors duration-200 " +
                ((pathname === "/login" || pathname === "/register")
                  ? "bg-[#68B984] text-white shadow-md"
                  : "text-gray-800 hover:bg-[#68B984]/80")
              }
            >
              Login / Register
            </Link>
          </div>
        </nav>
      </Container>
    </motion.header>
  );
}