import React from 'react';
import { iChildren } from './Layout';

const Container = ({children}: iChildren) => <div className='container mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>

export default Container;