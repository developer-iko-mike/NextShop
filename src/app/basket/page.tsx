"use client";
import React, { useEffect, useMemo, useState } from "react";
import Container from "@/Components/Container";
import CartItem from "@/Components/CartItem";
import { BasketItem, ICartItem, IDiscount } from "@/Components/types";
import useUserStore from "@/Components/stores/useUserStore";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { getProductData, ourl } from "@/Components/utiles";

const Cart = () => {
  const { user, clearBasket } = useUserStore();

  const [mainBasket, setMainBasket] = useState<ICartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);

  const calculatoringTotal = () =>
    mainBasket.reduce((sum, item) => sum + item.price * item.qty, 0);

  const totalPrice = useMemo(() => calculatoringTotal(), [mainBasket]);

useEffect(() => {
  const fetchData = async () => {
    const resData = await getProductData({
      basketDatas: user?.basket,
    });
    setMainBasket(resData || []);
  };

  fetchData();
}, [JSON.stringify(user?.basket)]);

  const userCodeValidation = async () => {
    if (discountCode) {
      const res = await axios.get(
        `http://localhost:3001/discount?code=${discountCode}`
      );
      const discountData: IDiscount = res.data[0];
      if (Boolean(discountData)) {
        const beforeDiscountTotal: number = totalPrice;
        const calcingCashOff =
          beforeDiscountTotal * (discountData.precentCount / 100);
        const finalTotal = beforeDiscountTotal - calcingCashOff;
        setDiscount(Number(calcingCashOff.toFixed(2)));
        setFinalTotal(Number(finalTotal.toFixed(2)));
      } else {
        toast.error("Invalid discount code", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("input value is empty :|", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleOrderedUser = async () => {
      const res = await axios({
        url: ourl,
        method: "POST",
        data: {
          orderItem: user?.basket,
          username: user?.username,
          phone: user?.phone,
          address: user?.address,
          email: user?.gmail,
          status: "pending"
        }
      })
      if (res.status === 201){
        toast.success(`perfact your order is coming to your home (${res.data.status})` , {position: "bottom-right"})
        clearBasket();
      } else {
        toast.error(`error in handle order user` , {position: "bottom-right"})
      }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10">
      <ToastContainer />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-black mb-6">🛒 Shopping Cart</h2>

        {user?.basket.length ? (
          <>
            <div className="space-y-4">
              {mainBasket.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>

            {discount && finalTotal ? null : (
              <div className="flex gap-2 items-center pt-6 border-t mt-6 mb-3">
                <input
                  type="text"
                  className="bg-sky-100 rounded-md outline-none px-4 py-2 w-1/3"
                  placeholder="Enter Off Code"
                  maxLength={20}
                  minLength={3}
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button
                  onClick={userCodeValidation}
                  className="bg-blue-100 duration-150 mr-2 hover:bg-blue-200 hover:text-sky-600 active:rounded-xl active:scale-90 text-blue-600 rounded-lg px-4 py-2 capitalize cursor-pointer text-md"
                >
                  Apply a discount code
                </button>
              </div>
            )}

            <div
              className={`flex justify-between items-center ${
                discount && finalTotal ? " pt-6 border-t mt-6" : ""
              }`}
            >
              <span className="text-lg font-bold text-black">Total:</span>
              <span className="text-lg font-bold text-green-600">
                $ {calculatoringTotal().toLocaleString()}
              </span>
            </div>

            {discount && finalTotal ? (
              <>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-lg font-bold text-black">Off :</span>
                  <span className="text-lg font-bold text-green-600">
                    $ {discount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-6">
                  <span className="text-lg font-bold text-black">
                    Total With Off:
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    $ {finalTotal.toLocaleString()}
                  </span>
                </div>
              </>
            ) : null}

            <button
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl capitalize cursor-pointer shadow transition-all duration-200"
              onClick={handleOrderedUser}
            >
              order now
            </button>
          </>
        ) : (
          <h2 className="mb-6 text-center capitalize flex flex-col gap-3">
            <span className="text-4xl font-bold ">your basket is empty</span>
            <Link
              href={"/store"}
              className="text-blue-400 hover:underline text-2xl"
            >
              Back to Store
            </Link>
          </h2>
        )}
      </div>
    </div>
  );
};

export default Cart;
