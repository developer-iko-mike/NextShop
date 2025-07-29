import {ChangeEvent, ReactNode} from "react";

export type ChProps = Readonly<{
  children: ReactNode;
}>;

// component > store > ProductCard :
interface IProductCard {
  id: string;
  image: string | File;
  title: string;
  caption: string;
  price: number;
  qty: number;
}

export interface BasketItem {
  id: string;
  qty: number;
}

// component > store > authUser :
export interface User {
  id: string;
  username: string;
  phone: string;
  gmail: string;
  password: string;
  basket: BasketItem[];
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
  qty: number;
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