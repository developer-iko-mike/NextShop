"use client"
import ReactPaginate from 'react-paginate';
import Container from './Container';

interface IProductPagination {
  allPageCount: string;
  pageDisplay: string;
}

const ProductPagination = ({ allPageCount, pageDisplay }: IProductPagination) => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    const nowPage = ++selected;
    console.log(nowPage);
  };

  return (
    <Container>
      <div className="flex justify-center py-6">
        <ReactPaginate
          pageCount={+allPageCount}
          nextLabel="go to next page >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={+pageDisplay || 8}
          previousLabel="< go to previous page"
          containerClassName="flex items-center gap-2"
          pageClassName="block"
          pageLinkClassName="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
          activeClassName="z-10"
          activeLinkClassName="bg-blue-500 text-white border-blue-500"
          previousClassName="block"
          previousLinkClassName="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
          nextClassName="block"
          nextLinkClassName="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
          breakClassName="block"
          breakLinkClassName="px-3 py-1"
        />
      </div>
    </Container>
  );
};

export default ProductPagination;