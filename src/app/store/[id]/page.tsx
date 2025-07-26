import Container from "@/Components/Container";
import { IProductCard } from "@/Components/ProductCard";
import axios from "axios";

interface Props {
  params: { id: string };
}

export default async function ProductDetailPage({
  params,
}: { params: { id: string } }) {
  
  const { id } = params;

  const response = await axios.get(`http://localhost:3001/product/${id}`);
  const { image, title, caption, price }: IProductCard = response.data;

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
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition duration-200 shadow font-bold cursor-pointer">
            Add to product basket 🛒
          </button>
        </div>
      </div>
    </Container>
  );
}
