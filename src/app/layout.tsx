import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/Components/Layout";

export const metadata: Metadata = {
  title: "NextStore Episdoe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> <Layout>{children}</Layout> </body>
    </html>
  );
}
