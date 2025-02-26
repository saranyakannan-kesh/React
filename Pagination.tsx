import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, fetchMovies } from "../Redux/movieSlice";
import { RootState, AppDispatch } from "../Redux/store";

const BootstrapPagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, totalResults,searchQuery } = useSelector((state: RootState) => state.movies);
  const totalPages = Math.ceil(totalResults / 10);

  if (totalPages <= 1) return null; 

  const validSearchQuery = searchQuery.trim() || "english";
  
  let items = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage < maxPageButtons - 1) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => {
          dispatch(setCurrentPage(number));
          dispatch(fetchMovies(validSearchQuery ));
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-start"> 
      <Pagination.First
        disabled={currentPage === 1}
        onClick={() => {
          dispatch(setCurrentPage(1));
          dispatch(fetchMovies(validSearchQuery ));
        }}
      />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => {
          dispatch(setCurrentPage(currentPage - 1));
          dispatch(fetchMovies(validSearchQuery ));
        }}
      />
      {items}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => {
          dispatch(setCurrentPage(currentPage + 1));
          dispatch(fetchMovies(validSearchQuery ));
        }}
      />
      <Pagination.Last
        disabled={currentPage === totalPages}
        onClick={() => {
          dispatch(setCurrentPage(totalPages));
          dispatch(fetchMovies(validSearchQuery ));
        }}
      />
    </Pagination>
  );
};

export default BootstrapPagination;
