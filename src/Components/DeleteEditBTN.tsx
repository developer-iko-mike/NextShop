"use client";
import React, { useState } from "react";
import MEdit from "@/Components/Modals/MEdit"
import MDelete from "@/Components/Modals/MDelete"
import { toast, ToastContainer } from "react-toastify";

interface IDeleteEditBTN {
  productID: string;
}

const DeleteEditBTN = ({ productID }: IDeleteEditBTN) => {

  const [openEdit , setopenEdit] = useState<boolean>(false)
  const [openDelete , setopenDelete] = useState<boolean>(false)

  const handleDeleteProduct = () => {
    toast.success("delete user with successfully" , {position: "bottom-right"})
  }

  const handleEditProduct = () => {
    toast.success("edit user with successfully" , {position: "bottom-right"})
  }

  return (
    <>
    <ToastContainer/>
    <div className="flex justify-between text-white w-2/3 gap-1.5">
      <button onClick={() => setopenEdit(true)} className="bg-blue-400 shadow-2xl shadow-blue-400 duration-200 hover:shadow-blue-500 hover:shadow-3xl hover:bg-blue-500 grow py-2 rounded-lg cursor-pointer capitalize">
        edit
      </button>
      <button onClick={() => setopenDelete(true)} className="bg-rose-400 shadow-2xl shadow-rose-400 duration-200 hover:shadow-rose-500 hover:shadow-3xl hover:bg-rose-500 grow py-2 rounded-lg cursor-pointer capitalize">
        delete
      </button>
    </div>
    <MDelete open={openDelete} onClose={() => setopenDelete(false)} onDelete={handleDeleteProduct} />
    {/* <MEdit open={openEdit} onClose={() => setopenEdit(false)}/> */}
    </>
  );
};

export default DeleteEditBTN;
