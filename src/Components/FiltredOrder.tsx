"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IfilterItem } from "./types";
import { useRouter } from "next/navigation";
import { ourl } from "./utiles";

const FiltredOrder = () => {
  const router = useRouter()
  const [filterItem , setFilteritem] = useState<IfilterItem[]>([
    { id: 1, title: "pending" },
    { id: 2, title: "shipped" },
    { id: 3, title: "delivered" },
    { id: 4, title: "cancelled" },
  ])
  const [selectedItem , setSelecteditem] = useState<"all" | "pending" | "shipped" | "delivered" | "cancelled">("all")

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");
  if (status && ["pending", "shipped", "delivered", "cancelled"].includes(status)) {
    setSelecteditem(status as typeof selectedItem);
  }
}, []);

const handleFiltring = (e: ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value as typeof selectedItem;
  setSelecteditem(value);

  if (value === "all") {
    router.push("/CMS/orders"); // 👈 یا هر مسیر فعلی که هستی بدون پارامتر
  } else {
    router.push(`?status=${value}`);
  }
};

  return (
    <div>
      <select onChange={handleFiltring}>
        <option value="all">all</option>
        {filterItem.map(({title , id}) => (
        <option key={id} value={title} >{title}</option>
        ))}
      </select>
    </div>
  );
};

export default FiltredOrder;
