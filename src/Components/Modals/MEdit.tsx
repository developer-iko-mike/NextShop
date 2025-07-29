import React from "react";
import ModalBase from "./ModalBase";

interface UpdateProductModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  productTitle?: string;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  open,
  onClose,
  onUpdate,
  productTitle,
}) => (
  <ModalBase open={open} onClose={onClose}>
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4 text-green-700">Update Product</h2>
      <p className="mb-6">
        Do you want to update
        <span className="font-semibold text-gray-800"> {productTitle} </span>?
      </p>
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => {
            onUpdate();
            onClose();
          }}
        >
          Update
        </button>
      </div>
    </div>
  </ModalBase>
);

export default UpdateProductModal;