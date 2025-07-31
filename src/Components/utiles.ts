// utiles.ts
import axios from "axios";
import { BasketItem, ICartItem, ProductData } from "./types";

const purl = "http://localhost:3001/product"
export const durl = "http://localhost:3001/discount"
export const ourl = "http://localhost:3001/orders"
export const uurl = "http://localhost:3001/users"
export const aurl = "http://localhost:3001/admins"

export interface IGetProductData {
  basketDatas: BasketItem[]; // ✅ آرایه باشه
}

export const getProductData = async ({ basketDatas }: IGetProductData) => {
  try {
    const res = await axios.get(purl);

    if (!Array.isArray(basketDatas) || basketDatas.length === 0) {
      console.log("❌ basketDatas is empty or invalid");
      return [];
    }

    const result = basketDatas
      .map((basketItem: BasketItem) => {
        const product = res.data.find((p: ProductData) => p.id === basketItem.id);
        if (product) {
          return { ...product, qty: basketItem.qty };
        }
        return null;
      })
      .filter((item): item is ICartItem => item !== null);

    return result;
  } catch (err) {
    console.error("❌ error in getProductData:", err);
    return [];
  }
};

export default purl;