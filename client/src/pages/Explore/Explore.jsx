import {
  Grid,
  Container,
  Typography,
  Box,
  LinearProgress,
  Pagination,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AllProducts from './Product/AllProducts';
import { useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Products, Wishlist, Cart } from '../../graphql/queries';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CategoryContext } from '../../contexts/CategoryContext';
import Promotion from '../../components/Banners/Promotion';
import SortBy from '../../components/Filters/SortBy';

export default function Explore() {
  // Context
  const { user, id } = useAuthContext();
  const { selectedCategory } = useContext(CategoryContext); // category context - handled in Navbar component

  // Mobile check
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // mediaQuery for mobile/medium size screens

  // Load Products  - filter loaded products by selected category
  const [
    loadProducts,
    {
      loading: loadingProducts,
      data: productsData,
      error: productsError,
      refetch: refetchProducts,
    },
  ] = useLazyQuery(Products, {
    variables: { category: selectedCategory },
  });

  // Load Wishlist - array of productIds (items in users' wishlist). Refetch whenever item is added/removed
  const [
    loadWishlist,
    {
      loading: loadingWishlist,
      data: wishlistData,
      error: wishlistError,
      refetch: refetchWishlist,
    },
  ] = useLazyQuery(Wishlist, {
    variables: { id: id },
  });

  // Load Cart - array of productIds (items in users' cart). Refetch whenever item is added/removed
  const [
    loadCart,
    {
      loading: loadingCart,
      data: cartData,
      error: cartError,
      refetch: refetchCart,
    },
  ] = useLazyQuery(Cart, {
    variables: { id: id },
  });

  // Effect: Load Products - trigger when selectedCategory changes
  useEffect(() => {
    loadProducts();
  }, [loadProducts, selectedCategory, loadCart]);

  // Effect: Load Wishlist & Cart
  useEffect(() => {
    if (user) {
      loadWishlist();
      loadCart();
    }
  }, [user, loadWishlist, loadCart]);

  if (productsError) {
    console.error('GraphQL Products Error:', productsError);
    return <Typography>Error fetching product data</Typography>;
  }

  if (wishlistError) {
    console.error('GraphQL Wishlist Error:', wishlistError);
    return <Typography>Error fetching wishlist data</Typography>;
  }

  if (cartError) {
    console.error('GraphQL Wishlist Error:', cartError);
    return <Typography>Error fetching cart data</Typography>;
  }

  if (loadingProducts || loadingWishlist || loadingCart) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress color='primary' />
      </Box>
    );
  }

  if (!productsData) {
    return <Typography>No product data found</Typography>;
  }

  // Grab Product data
  const products = productsData ? productsData.filterItems : [];
  console.log('explore page Products: ', products)

  // Grab wishlistedItems IDs
  const wishlistedItems = wishlistData ? wishlistData.usersWishlist : [];

  // Grab cartItems IDs
  const cartedItems = cartData ? cartData.usersCart : [];

  // Products & Pagination
  return (
    <Container maxWidth='xl'>
      <Grid
        container
        spacing={1}
        sx={{
          marginTop: { xs: 22, md: 16 },
        }}
      >
        {/* Sort By - filter */}
        {isMobile ? (
          // mobile version
          <Grid item xs={12} md={9} marginBottom={-1}>
            <Typography
              gutterBottom
              variant='h6'
              fontWeight='bold'
              sx={{ textAlign: { sm: 'left', md: 'center' } }}
            >
              {selectedCategory}{' '}
              <Typography variant='caption'>
                ({products.length} products)
              </Typography>
            </Typography>

            <Grid item xs={12} mb={2}>
              <SortBy isMobile={isMobile} />
            </Grid>
            <Divider sx={{ mb: 2 }} />
          </Grid>
        ) : (
          // desktop version
          <Grid item sm={1.5} md={2.8} lg={2.1} mt={8}  >
            <SortBy />
          </Grid>
        )}

        <Grid item xs={12} md={9} marginBottom={-1} >
          {/* Products + header */}
          {isMobile ? null : ( // hide header on on mobile
            <>
              <Typography
                gutterBottom
                variant='h6'
                fontWeight='bold'
                sx={{ textAlign: { sm: 'left', md: 'center' } }}
              >
                {selectedCategory}{' '}
                <Typography variant='caption'>
                  ({products.length} products)
                </Typography>
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </>
          )}

          {/* Products */}
          <AllProducts
            key={selectedCategory} //  key - helps React differentiate between the products & update more efficiently
            products={products} // products by chosen category
            wishlistedItems={wishlistedItems} // items in users wishlist
            cartedItems={cartedItems} // items in users cart
            refetchWishlist={refetchWishlist} // refetch Wishlist query
            refetchCart={refetchCart} // refetch Cart query
          />
          {/* Pagination */}
          <Box display='flex' pt={4} pb={4} justifyContent='center'>
            <Pagination count={5} color='secondary' />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
