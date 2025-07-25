import React from 'react';
import ProductCard from '@/Components/ProductCard';
import Container from "@/Components/Container"

const products = [
  {
    id: 1,
    title: "Apple AirPods Pro",
    caption: "Noise-cancelling wireless earbuds",
    price: 249,
    image: "/store/airpad.webp",
  },
  {
    id: 2,
    title: "Xiaomi Mi Band 7",
    caption: "Smart fitness tracker with heart rate monitor",
    price: 49,
    image: "/store/band.webp",
  },
  {
    id: 3,
    title: "iPhone 14 Pro Case",
    caption: "Shockproof protective phone case",
    price: 29,
    image: "/store/case.webp",
  },
  {
    id: 4,
    title: "Sony WH-1000XM4",
    caption: "Over-ear noise-cancelling headphones",
    price: 349,
    image: "/store/headphone.webp",
  },
  {
    id: 5,
    title: "MacBook Air M2",
    caption: "Powerful and lightweight Apple laptop",
    price: 1199,
    image: "/store/laptop.webp",
  },
  {
    id: 6,
    title: "Apple iPhone 15 Pro",
    caption: "Latest smartphone with A17 chip and Dynamic Island",
    price: 1099,
    image: "/store/iphone.png",
  },
  {
    id: 7,
    title: "TP-Link WiFi 6 Modem",
    caption: "High-speed dual-band wireless modem router",
    price: 89,
    image: "/store/modem.webp",
  },
  {
    id: 8,
    title: "Logitech MX Master 3S",
    caption: "Advanced wireless mouse with ergonomic design",
    price: 99,
    image: "/store/mouse.png",
  },
  {
    id: 9,
    title: "Sony PlayStation 5",
    caption: "Next-gen gaming console with DualSense controller",
    price: 499,
    image: "/store/ps5.webp",
  },
  {
    id: 10,
    title: "Apple Watch Series 9",
    caption: "Smartwatch with health tracking and GPS",
    price: 399,
    image: "/store/watch.webp",
  }
]


const ProductsPage = () => {
  return (
    <Container>
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">🛒 محصولات ما</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
    </Container>
  );
};

export default ProductsPage;
