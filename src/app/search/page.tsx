import Container from '@/Components/Container';
import ProductCard from '@/Components/ProductCard';
import ProductPagination from '@/Components/ProductPagination';
import BasketItemCard, { ISProps } from '@/Components/types';
import { handleFilterDataWithTiTle } from '@/Components/utiles';
import Link from 'next/link';
import React from 'react';

const Search = async (props: ISProps) => {

    const {title} = await props.searchParams
    
    const filtredData = await handleFilterDataWithTiTle({title})

    console.log(filtredData.length)

  return (
    <Container>
      <div className="min-h-screen px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtredData.map((product: BasketItemCard) => (
            <Link key={product.id} href={`/store/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Search;