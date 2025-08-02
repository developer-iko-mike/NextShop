import Container from "@/Components/Container";
import { IProductData } from "@/Components/types";
import AddToBasketButton from "@/Components/AddToBasketButton";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await fetch(`http://localhost:3001/product/${id}`);
  const data = await res.json();

  const product: IProductData = {
    id: data.id,
    image: data.image,
    title: data.title,
    caption: data.caption,
    price: data.price,
  };

  return (
    <Container>
      <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 grid md:grid-cols-2 gap-16">
        <div className="flex items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded-xl object-contain"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 text-lg">{product.caption}</p>
          <p className="text-green-600 text-2xl font-semibold">
            $ {product.price}
          </p>
          <AddToBasketButton id={id} />
        </div>
      </div>

<div className="flex justify-center">
      <Link
        href="/store"
        className="flex gap-1 justify-center mt-4 text-2xl duration-50 text-blue-500 hover:text-blue-600 hover:border-b-2 group"
      >
        <span className="-mt-[.22rem] group-hover:-underline-offset-0">👈</span> Back to Store
      </Link>
</div>
    </Container>
  );
}
