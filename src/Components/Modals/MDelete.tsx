import React from "react";
import ModalBase from "./ModalBase";

interface DeleteProductModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  productTitle?: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  open,
  onClose,
  onDelete,
  productTitle,
}) => (
  <ModalBase open={open} onClose={onClose}>
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4 text-red-600">Delete Product</h2>
      <p className="mb-6">
        Are you sure you want to delete
        <span className="font-semibold text-gray-800"> {productTitle} </span>?
        This action cannot be undone.
      </p>
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </ModalBase>
);

export default DeleteProductModal;