// import React, { ReactNode } from "react";

// interface ModalBaseProps {
//   open: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const ModalBase: React.FC<ModalBaseProps> = ({ open, onClose, children }) => {
//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       aria-modal="true"
//       role="dialog"
//     >
//       {/* Blurred background */}
//       <div
//         className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
//         onClick={onClose}
//       />
//       {/* Modal content with animation */}
//       <div
//         className="relative z-10 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 animate-modal-fade-in"
//       >
//         {children}
//       </div>
//       <style jsx global>{`
//         @keyframes modal-fade-in {
//           0% {
//             opacity: 0;
//             transform: translateY(40px) scale(0.95);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//         .animate-modal-fade-in {
//           animation: modal-fade-in 0.35s cubic-bezier(0.4, 0, 0.2, 1);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ModalBase;



// import React from "react";
// import ModalBase from "./ModalBase";

// interface DeleteProductModalProps {
//   open: boolean;
//   onClose: () => void;
//   onDelete: () => void;
//   productTitle?: string;
// }

// const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
//   open,
//   onClose,
//   onDelete,
//   productTitle,
// }) => (
//   <ModalBase open={open} onClose={onClose}>
//     <div className="text-center">
//       <h2 className="text-xl font-bold mb-4 text-red-600">Delete Product</h2>
//       <p className="mb-6">
//         Are you sure you want to delete
//         <span className="font-semibold text-gray-800"> {productTitle} </span>?
//         This action cannot be undone.
//       </p>
//       <div className="flex justify-center gap-4">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           onClick={() => {
//             onDelete();
//             onClose();
//           }}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   </ModalBase>
// );

// export default DeleteProductModal;


// import React, { useState, ChangeEvent, FormEvent } from "react";
// import ModalBase from "./ModalBase";

// interface ProductForm {
//   id: string;
//   title: string;
//   caption: string;
//   price: string;
//   image: File | null;
// }

// interface EditProductModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSave: (form: ProductForm) => void;
//   initialData: ProductForm;
// }

// const EditProductModal: React.FC<EditProductModalProps> = ({
//   open,
//   onClose,
//   onSave,
//   initialData,
// }) => {
//   const [form, setForm] = useState<ProductForm>(initialData);
//   const [preview, setPreview] = useState<string | null>(
//     initialData.image ? URL.createObjectURL(initialData.image) : null
//   );

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file" && files && files[0]) {
//       setForm((prev) => ({
//         ...prev,
//         image: files[0],
//       }));
//       setPreview(URL.createObjectURL(files[0]));
//     } else {
//       setForm((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     onSave(form);
//     onClose();
//   };

//   return (
//     <ModalBase open={open} onClose={onClose}>
//       <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">
//         Edit Product
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded focus:outline-none"
//           required
//         />
//         <input
//           type="text"
//           name="caption"
//           placeholder="Caption"
//           value={form.caption}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded focus:outline-none"
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded focus:outline-none"
//           required
//           min="0"
//         />
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//           className="w-full"
//         />
//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//             className="mt-2 w-24 h-24 object-cover rounded border"
//           />
//         )}
//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </ModalBase>
//   );
// };

// export default EditProductModal;

// import React from "react";
// import ModalBase from "./ModalBase";

// interface UpdateProductModalProps {
//   open: boolean;
//   onClose: () => void;
//   onUpdate: () => void;
//   productTitle?: string;
// }

// const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
//   open,
//   onClose,
//   onUpdate,
//   productTitle,
// }) => (
//   <ModalBase open={open} onClose={onClose}>
//     <div className="text-center">
//       <h2 className="text-xl font-bold mb-4 text-green-700">Update Product</h2>
//       <p className="mb-6">
//         Do you want to update
//         <span className="font-semibold text-gray-800"> {productTitle} </span>?
//       </p>
//       <div className="flex justify-center gap-4">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//           onClick={onClose}
//         >
//           Cancel
//         </button>
//         <button
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           onClick={() => {
//             onUpdate();
//             onClose();
//           }}
//         >
//           Update
//         </button>
//       </div>
//     </div>
//   </ModalBase>
// );

// export default UpdateProductModal;