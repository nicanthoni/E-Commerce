import { Grid, Container, Typography } from '@mui/material';
import ProductsMain from './Product/ProductsMain';
import CategorySelection from './Filters/Categories';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Products, Wishlist, Cart } from '../../utils/queries';
import { useAuthContext } from '../../hooks/useAuthContext';


export default function Explore() {
  const { user, id } = useAuthContext()
  const [selectedCategory, setSelectedCategory] = useState(''); // state of selected Category
  const [activeStep, setActiveStep] = useState(0); // state of active step in CategorySelection's carousel

  // Load Products  - filter loaded products by selected category
  const [loadProducts, {loading: loadingProducts, data: productsData, error: productsError }] = useLazyQuery(Products, {
    variables: {category: selectedCategory}
  })

  // Load Wishlist - array of productIds (items in users' wishlist). Refetch whenever item is added/removed
  const [loadWishlist, {loading: loadingWishlist, data: wishlistData, error: wishlistError, refetch: refetchWishlist}] = useLazyQuery(Wishlist, {
    variables: {id: id}
  })

  // Load Cart - array of prodcutIds (items in users' cart). Refetch whenever item is added/removed 
  const [loadCart, {loading: loadingCart, data: cartData, error: cartError, refetch: refetchCart}] = useLazyQuery(Cart, {
    variables: {id: id}
  })

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
    return <Typography>Loading...</Typography>;
  }

  if (!productsData) {
    return <Typography>No product data found</Typography>;
  }

  // Callback to update the selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Callback to update the active step in the carousel
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // Grab Product data
  const products = productsData ? productsData.filterItems : []; 
  // console.log(`${selectedCategory} items: `, productData);

   // Grab wishlistedItems IDs
   const wishlistedItems = wishlistData ? wishlistData.usersWishlist : [];
  //  console.log('Wishlist Data:', wishlistedItems);

  // Grab cartItems IDs
  const cartedItems =  cartData ? cartData.usersCart : [] ; 
  // console.log('Cart Data', cartedItems)


  return (
    <Container maxWidth='xl'>
      <Grid container spacing={0} justifyContent='center' marginTop={18} marginBottom={4}>


        {/* Categories + props */}
        <Grid item xs={12}>
          <CategorySelection 
          onCategoryChange={handleCategoryChange} 
          activeStep={activeStep} 
          onStepChange={handleStepChange}
          selectedCategory={selectedCategory}
          />
        </Grid>
       
        {/* Products + props*/}
        <Grid item xs={12} marginTop={4}>
          <ProductsMain 
          products={products} 
          wishlistedItems={wishlistedItems} 
          cartedItems={cartedItems}
          refetchWishlist={refetchWishlist} 
          refetchCart={refetchCart}/>
        </Grid>


      </Grid>
    </Container>
  );
}
