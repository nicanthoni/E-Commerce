import {
  Grid,
  Container,
  Typography,
  Box,
  LinearProgress,
  Pagination,
  Stack,
} from '@mui/material';
import AllProducts from './Product/AllProducts';
import { useEffect, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Products, Wishlist, Cart } from '../../graphql/queries';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CategoryContext } from '../../contexts/CategoryContext';

export default function Explore() {
  const { user, id } = useAuthContext();
  const { selectedCategory } = useContext(CategoryContext); // category context - handled in Navbar component

  // Load Products  - filter loaded products by selected category
  const [
    loadProducts,
    { loading: loadingProducts, data: productsData, error: productsError },
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

  // Load Cart - array of prodcutIds (items in users' cart). Refetch whenever item is added/removed
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

  // Products & Pagination
  return (
    <Container maxWidth='xl'>
      <Grid container gap={3} sx={{ marginTop: { xs: 22, md: 16 } }}>
        <Grid item xs={12}>
          <AllProducts
            key={selectedCategory} //  key - helps React differentiate between the products & update more efficiently
            selectedCategory={selectedCategory} // name of selected category
            products={products} // products by chosen category
            wishlistedItems={wishlistedItems} // items in users wishlist
            cartedItems={cartedItems} // items in users cart
            refetchWishlist={refetchWishlist} // refetch Wishlist query
            refetchCart={refetchCart} // refetch Cart query
          />
        </Grid>
      </Grid>
      <Box display='flex' justifyContent='center' pt={3} pb={1}>
        <Pagination count={5} color='secondary' />
      </Box>
    </Container>
  );
}
