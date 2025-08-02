"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { IfilterItem } from "./types";
import { useRouter, usePathname } from "next/navigation";

const FiltredOrder = () => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ مسیر فعلی (مثلاً "/CMS/orders")

  const [filterItem, setFilteritem] = useState<IfilterItem[]>([
    { id: 1, title: "pending" },
    { id: 2, title: "shipped" },
    { id: 3, title: "delivered" },
    { id: 4, title: "cancelled" },
  ]);

  const [selectedItem, setSelecteditem] = useState<
    "all" | "pending" | "shipped" | "delivered" | "cancelled"
  >("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (
      status &&
      ["pending", "shipped", "delivered", "cancelled"].includes(status)
    ) {
      setSelecteditem(status as typeof selectedItem);
    }
  }, []);

  const handleFiltring = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as typeof selectedItem;
    setSelecteditem(value);

    const params = new URLSearchParams(window.location.search);

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <select onChange={handleFiltring} value={selectedItem}>
        <option value="all">all</option>
        {filterItem.map(({ title, id }) => (
          <option key={id} value={title}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltredOrder;
