import Container from "@/Components/Container";
import { ICartItem } from "@/Components/types";
import useUserStore from "./stores/useUserStore";

const CartItem = ({
  id,
  title,
  caption,
  price,
  image,
  qty,
}: ICartItem) => {
  const { increaseQty, decreaseQty, removeFromBasket } = useUserStore();

  console.log(id)

  return (
    <Container>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={title}
            className="w-20 h-20 object-contain rounded-xl"
          />
          <div>
            <h3 className="text-lg font-semibold text-black">{title}</h3>
            <p className="text-sm text-black/60">{caption}</p>
            <p className="text-sm font-medium text-black mt-1">
              $
              {typeof price === "number"
                ? (price * qty).toFixed(2)
                : "0.00"}
              ×{qty}
            </p>
          </div>
        </div>

        <button
          onClick={() => removeFromBasket(id)}
          className="bg-red-100 duration-150 hover:bg-red-200 hover:text-rose-600 active:rounded-xl active:scale-90 text-red-600 rounded-lg px-4 py-2 capitalize cursor-pointer text-md"
        >
          remove
        </button>

        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 text-lg font-bold flex items-center justify-around active:bg-red-300"
            onClick={() => decreaseQty(id)}
          >
            –
          </button>
          <span className="w-6 text-center text-black font-semibold">
            {qty}
          </span>
          <button
            className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-600 text-lg font-bold flex items-center justify-around active:bg-green-300"
            onClick={() => increaseQty(id)}
          >
            +
          </button>
        </div>
      </div>
    </Container>
  );
};

export default CartItem;
