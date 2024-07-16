import {
  Grid,
  Container,
  Typography,
  Box,
  LinearProgress,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AllProducts from './Product/AllProducts';
import { useEffect, useContext, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Products, Wishlist, Cart } from '../../graphql/queries';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CategoryContext } from '../../contexts/CategoryContext';
import Promotion from '../../components/Banners/Promotion';
import SortBy from '../../components/Filters/SortBy';
import Footer from '../../components/Footer/Footer';

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

  // Grab wishlistedItems IDs
  const wishlistedItems = wishlistData ? wishlistData.usersWishlist : [];

  // Grab cartItems IDs
  const cartedItems = cartData ? cartData.usersCart : [];

  return (
    <>
      {/* Banner */}
      <Box
        display='flex'
        justifyContent='center'
        alignContent='center'
        bgcolor='#BF0F0F'
        sx={{ marginTop: { xs: 18.5, sm: 19.5, md: 14 } }}
      >
        <Promotion />
      </Box>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent='center'
          spacing={1}
          sx={{
            marginTop: { xs: 2, md: 3 },
          }}
        >
          {/* Header + Filter*/}
          <Grid container mb={2} alignItems='flex-end' pl={1}>
            <Grid item xs={12}>
              <Typography variant='h6' fontWeight='bolder'>
                {selectedCategory} ({products.length} )
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <SortBy />
            </Grid>
          </Grid>

          {/* Products */}
          <Grid item xs={12} marginBottom={-1}>
            <AllProducts
              isMobile={isMobile}
              key={selectedCategory} //  key - helps React differentiate between the products & update more efficiently
              products={products} // products by chosen category
              wishlistedItems={wishlistedItems} // items in users wishlist
              cartedItems={cartedItems} // items in users cart
              refetchWishlist={refetchWishlist} // refetch Wishlist query
              refetchCart={refetchCart} // refetch Cart query
            />
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer/>
    </>
  );
}
