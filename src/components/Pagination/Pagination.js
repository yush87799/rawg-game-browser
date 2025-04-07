import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/gamesSlice';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages }) => {
  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    window.scrollTo(0, 0);
  };

  const getPageNumbers = () => {
    const MAX_PAGES_TO_SHOW = 5;
    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));
    let endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);
    
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - MAX_PAGES_TO_SHOW + 1);
    }
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-container">
      <BootstrapPagination>
        <BootstrapPagination.First 
          onClick={() => handlePageChange(1)} 
          disabled={currentPage === 1}
        />
        <BootstrapPagination.Prev 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        />
        
        {currentPage > 3 && totalPages > 5 && (
          <>
            <BootstrapPagination.Item onClick={() => handlePageChange(1)}>1</BootstrapPagination.Item>
            <BootstrapPagination.Ellipsis disabled />
          </>
        )}
        
        {getPageNumbers().map(pageNumber => (
          <BootstrapPagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </BootstrapPagination.Item>
        ))}
        
        {currentPage < totalPages - 2 && totalPages > 5 && (
          <>
            <BootstrapPagination.Ellipsis disabled />
            <BootstrapPagination.Item onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </BootstrapPagination.Item>
          </>
        )}
        
        <BootstrapPagination.Next 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        />
        <BootstrapPagination.Last 
          onClick={() => handlePageChange(totalPages)} 
          disabled={currentPage === totalPages}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;