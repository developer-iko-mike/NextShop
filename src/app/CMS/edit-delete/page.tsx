import React from "react";
import ProductCardEdit from "@/Components/ProductCardEdit";
import Container from "@/Components/Container";
import axios from "axios";
import BasketItemCard from "@/Components/types";
import CMSQuiz from "@/Components/CMSQuiz";

const EditDelete = async () => {
  const response = await axios.get("http://localhost:3001/product");

  return (
    <Container>
      <div className="min-h-screen px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Product 🛒
        </h1>

        <CMSQuiz title="need add new product ?" href="/CMS"/>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {response.data.map((product: BasketItemCard) => (
            <ProductCardEdit key={product.id} {...product} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default EditDelete;
