import React from 'react';
import Header from './Header';
import { ChProps } from './types';

const Layout = ({children}: ChProps) => {
  return (
    <>
        <Header/>
        {children}
    </>
  );
};

export default Layout;