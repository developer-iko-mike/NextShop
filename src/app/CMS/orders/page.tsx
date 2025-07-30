import Container from "@/Components/Container";
import Order from "@/Components/Order";
import React from "react";

const Orders = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-800">
        Order List 📝
      </h1>
      <Container>
        <Order />
      </Container>
    </div>
  );
};

export default Orders;
