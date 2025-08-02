import { ChangeEvent, ReactNode } from "react";

export type ChProps = Readonly<{ children: ReactNode; }>;

export interface Ch { children: ReactNode; }
export interface ChOptional { children?: ReactNode; }

interface BasketItemCard {
  id: string;
  image: string;
  title: string;
  caption: string;
  price: number;
  qty: number;
}

export type ProductData = Omit<User, "qty">;

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
  address: string;
  basket: BasketItem[];
}

export interface ProductForm {
  title: string;
  caption: string;
  price: number | string;
  image: string;
}

export type Che = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface ICartItem extends BasketItemCard { qty: number; }

export type IProductData = Omit<BasketItemCard, "qty">;

export interface IDiscount {
  id: string;
  code: string;
  precentCount: number;
}

export interface UserForm {
  loginId: string;
  password: string;
}

export type Product = {
  id: string;
  orderItem: BasketItem;
  username: string;
  phone: string;
  address: string;
  email: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
};

export type OrderListProps = { products: Product[]; };

export interface IAdmin {
  id: string;
  gmail: string;
}

export interface ISProps {
    params: Promise<null | { id : string} >;
  searchParams: Promise<{title: string;}>;
}

export interface IProps {
  params: Promise<null | { id : string} >;
  searchParams: Promise<{page: string; per_page: string;}>;
}

export interface Props {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export interface IfilterItem {
  id: number | string;
  title: string
}

export default BasketItemCard;