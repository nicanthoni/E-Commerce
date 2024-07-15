import { Pagination, PaginationItem } from '@mui/material';

const Pages = ({ totalProducts, productsPerPage, setCurrentPage, currentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }

  return (
    <Pagination
      count={pages.length}
      color="primary"
      page={currentPage}
      onChange={(event, page) => setCurrentPage(page)}
      renderProducts={(products) => (
        <PaginationItem key={products.page} {...products} />
      )}
    />
  );
};

export default Pages;
