import {ChangeEvent, ReactNode} from "react";

export type ChProps = Readonly<{
  children: ReactNode;
}>;

// component > contexts > ProductCard :
interface IProductCard {
  id: string;
  image: string | File;
  title: string;
  caption: string;
  price: number;
}

// component > contexts > authUser :
export interface User {
  id: string;
  username: string;
  phone: string;
  gmail: string;
  password: string;
  basket: IProductCard[] | [];
}

export interface IProduct {
  id: string;
  qty: number;
}

export interface ProductForm {
  title: string;
  caption: string;
  price: string;
  image: string;
}

export type Che = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface ICartItem extends IProductCard {
  quantity: number;
}

export interface IDiscount {
  id: string;
  code: string;
  precentCount: number;
}

export interface UserForm {
  loginId: string;
  password: string;
}

export default IProductCard;