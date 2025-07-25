import React from 'react';
import Header from './Header';

export interface iChildren { children: React.ReactNode }

const Layout = ({children}: iChildren) => {
  return (
    <>
        <Header/>
        {children}
    </>
  );
};

export default Layout;