import {
  Grid,
  Container,
  Typography,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AllProducts from './Product/AllProducts';
import { useEffect, useContext, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Products, User } from '../../graphql/queries';
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

  // Load User data (includes cart, wishlist, etc)
  const [
    loadUser,
    {
      loading: loadingUser,
      data: userData,
      error: userError,
      refetch: refetchUserData,
    },
  ] = useLazyQuery(User, {
    variables: { userId: id },
  });

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

  // Effect: Load Products - trigger when selectedCategory changes
  useEffect(() => {
    loadProducts();
  }, [loadProducts, selectedCategory]);

  // Effect: Load Wishlist & Cart
  useEffect(() => {
    if (user) {
      loadUser(); // All necessary user data (user, wishlist/carted items, etc)
    }
  }, [user, loadUser]);

  if (productsError) {
    console.error('GraphQL Products Error:', productsError);
    return <Typography mt={12}>Error fetching product data</Typography>;
  }

  if (userError) {
    console.error('GraphQL User Error:', userError);
    return <Typography mt={12}>Error fetching user data</Typography>;
  }

  if (loadingProducts || loadingUser) {
    return (
      <Box mt={12} sx={{ width: '100%' }}>
        <CircularProgress color='primary' />
      </Box>
    );
  }

  if (!productsData) {
    return <Typography>No product data found</Typography>;
  }

  // Data - Product, Cart, & Wishlist
  const products = productsData ? productsData.filterItems : [];
  const usersWishlist = userData
    ? userData.user.wishlist.map((cartItem) => cartItem.item._id)
    : [];
  const usersCart = userData
    ? userData.user.cart.map((cartItem) => cartItem.item._id)
    : [];

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
              <Typography variant='h6' fontWeight='bold'>
                {selectedCategory} ({products.length})
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
              key={selectedCategory} //  'key' helps React differentiate between products & update more efficiently
              products={products} // products by chosen category
              usersCart={usersCart}
              usersWishlist={usersWishlist}
              refetchUserData={refetchUserData}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
