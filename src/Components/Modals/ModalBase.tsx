import React, { ReactNode } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { modalBackdrop, modalContent } from "../Header";

interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalBase: React.FC<ModalBaseProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <motion.div>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-white p-6 rounded shadow-lg w-[340px] text-center"
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
          {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ModalBase;
