import React from 'react';
import Header from './Header';
import { ChProps } from './types';

const Layout = ({children}: ChProps) => {
  return (
    <>
        <Header/>
        <div className='pt-[5.125rem]'/>
        {children}
    </>
  );
};

export default Layout;