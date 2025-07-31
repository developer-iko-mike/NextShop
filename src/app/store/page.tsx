import React from "react";
import ProductCard from "@/Components/ProductCard";
import Container from "@/Components/Container";
import Link from "next/link";
import axios from "axios";
import BasketItemCard, { IProps } from "@/Components/types";
import purl from "@/Components/utiles";
import { log } from "console";

const ProductsPage = async ({searchParams: {page , per_page}} : IProps) => {

  const nowPage = await page ?? "1"
  const perPage = await per_page ?? "8"

  
  const response = await axios.get(purl + `?_page=${nowPage}&_per_page=${perPage}`);
  console.log(`page: ${nowPage} , perPage: ${perPage}`)
  log('url:', response.request.path)

  return (
    <Container>
      <div className="min-h-screen px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Product 🛒
        </h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {response.data.data.map((product: BasketItemCard) => (
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
