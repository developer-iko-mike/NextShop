import React from 'react';
import ProductCard from '@/Components/ProductCard';
import Container from "@/Components/Container";
import Link from "next/link";
import axios from "axios";
import { IProductCard } from '@/Components/ProductCard';

const ProductsPage = async () => {

  const response = await axios.get("http://localhost:3001/product");

  return (
    <Container>
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Product 🛒</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
        {response.data.map((product: IProductCard) => (
          <Link key={product.id} href={`/store/${product.id}`}>
               <ProductCard {...product} />
          </Link>
        ))}
      </div>
    </div>
    </Container>
  );
};

export default ProductsPage;
