"use client";
import ReactPaginate from "react-paginate";
import Container from "./Container";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation";
import purl from "./utiles";

interface IProductPagination {
  allPageCount: string;
  pageDisplay: string;
  baseUrl: string;
}

const ProductPagination = ({
  allPageCount,
  pageDisplay,
  baseUrl,
}: IProductPagination) => {
  const router = useRouter();
  const handlePageClick = ({ selected }: { selected: number }) => {
    const nowPage = selected + 1;

    router.push(`${baseUrl}?page=${nowPage}&per_page=${pageDisplay}`);
  };

  return (
    <Container>
      <div className="flex justify-center py-8">
        <ReactPaginate
          pageCount={+allPageCount}
          nextLabel={
            <motion.span
              className="flex items-center gap-1 ml-2"
              whileHover={{ scale: 1.08, color: "#2563eb" }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.span>
          }
          previousLabel={
            <motion.span
              className="flex items-center gap-1 mr-2"
              whileHover={{ scale: 1.08, color: "#2563eb" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Prev
            </motion.span>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={+pageDisplay || 8}
          containerClassName="flex items-center gap-3 select-none"
          pageClassName="block"
          pageLinkClassName="px-3 py-1 rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-blue-50 hover:text-sky-400 transition-all duration-150 font-medium"
          activeClassName="z-10"
          activeLinkClassName="bg-gradient-to-r from-blue-500 to-blue-400 text-white border-blue-500 shadow-lg scale-105"
          previousClassName="block"
          previousLinkClassName="px-3 py-1 rounded-lg text-gray-700 hover:text-blue-600 transition-all duration-150 font-semibold"
          nextClassName="block"
          nextLinkClassName="px-3 py-1 rounded-lg text-gray-700 hover:text-blue-600 transition-all duration-150 font-semibold"
          breakClassName="block"
          breakLinkClassName="px-3 py-1 text-gray-400 select-none"
        />
      </div>
    </Container>
  );
};

export default ProductPagination;
