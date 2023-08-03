import React from 'react';
import { Pagination } from '@mui/material';

const PaginationItem = ({ totalPages, page, handlePageChange }) => {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={handlePageChange}
      color="primary"
      showFirstButton
      showLastButton
    />
  );
};

export default PaginationItem;
