import { motion } from "framer-motion";
import { useState } from "react";

export default function FancyForm() {
  const [value, setValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted: ${value}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center bg-gradient-to-br">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        className="relative w-80"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search something..."
          className="w-full py-3 pl-14 pr-4 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        />
        <motion.button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:ring-blue-400 text-white rounded-full p-2 transition-all cursor-pointer"
        >
          <motion.span
            animate={{ scale: isHovered ? 1.4 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="inline-block"
          >
            🔍
          </motion.span>
        </motion.button>
      </motion.div>
    </form>
  );
}