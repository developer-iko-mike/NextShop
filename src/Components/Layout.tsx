"use client";
import React from 'react';
import Header from './Header';
import { ChProps } from './types';
import ToastProvider from "@/Components/ToastProvider";


const Layout = ({children}: ChProps) => {
  return (
    <>
        <Header/>
        <div className='pt-[5.125rem]'/>
        <ToastProvider/>
        {children}
    </>
  );
};

export default Layout;