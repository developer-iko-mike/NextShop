import { ISProps } from '@/Components/types';
import { handleFilterDataWithTiTle } from '@/Components/utiles';
import React from 'react';

const Search = async (props: ISProps) => {

    const {title} = await props.searchParams
    
    
    const filtredData = await handleFilterDataWithTiTle(title)

    console.log(filtredData.length)

  return (
    <div>
        
    </div>
  );
};

export default Search;