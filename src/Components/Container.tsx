import React from 'react';
import { ChProps } from './types';

const Container = ({children}: ChProps) => <div className='container mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>

export default Container;