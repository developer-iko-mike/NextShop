import Container from "@/Components/Container";
import FiltredOrder from "@/Components/FiltredOrder";
import Order from "@/Components/Order";
import { IProps_id_status } from "@/Components/types";
import axios from "axios";
import { Product } from "@/Components/types";
import { ourl } from "@/Components/utiles";
import IsNotExist from "@/Components/IsNotExist"

const Orders = async ({ searchParams }: IProps_id_status) => {
  const Searchparametr = await searchParams;
  const url = Searchparametr?.status
    ? `${ourl}?status=${Searchparametr.status}`
    : `${ourl}`;

  const { data } = await axios.get<Product[]>(url);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      {data.length ? (
        <>
          <div className="flex flex-col justify-center mb-8 items-center">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
              Order List 📝
            </h1>
            <FiltredOrder />
          </div>
          <Container>
            <Order {...data} />
          </Container>
        </>
      ) : (
        <IsNotExist title="order not found !"/>
      )}
    </div>
  );
};

export default Orders;
