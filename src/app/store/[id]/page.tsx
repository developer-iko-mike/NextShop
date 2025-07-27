import Container from "@/Components/Container";
import { IProductCard } from "@/Components/ProductCard";
import AddToBasketButton from "@/Components/AddToBasketButton"
import axios from "axios";

interface Props {
  params: { id: string };
}

export default async function ProductDetailPage({
  params,
}: { params: { id: string } }) {
  
  const { id } = params;

  const res = await fetch(`http://localhost:3001/product/${id}`);
  const data = await res.json()
  const { image, title, caption, price }: IProductCard = await data;

  return (
    <Container>
      <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 grid md:grid-cols-2 gap-16">
        <div className="flex items-center">
          <img
            src={image}
            alt={title}
            className="w-full h-auto rounded-xl object-contain"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 text-lg">{caption}</p>
          <p className="text-green-600 text-2xl font-semibold">$ {price}</p>
          <AddToBasketButton mainProduct={data}/>
        </div>
      </div>
    </Container>
  );
}