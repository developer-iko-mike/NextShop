import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/Components/Layout";
import { ChProps } from "@/Components/types";

export const metadata: Metadata = {
  title: "LeachStore",
};

export default function RootLayout({
  children,
}: ChProps) {
  return (
    <html lang="en">
      <body> <Layout>{children}</Layout> </body>
    </html>
  );
}
