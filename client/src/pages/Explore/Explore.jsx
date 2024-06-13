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
      <Grid container justifyContent='center' marginTop={16} marginBottom={4}>


        {/* Categories + props */}
        <Grid item xs={12}>
          <CategorySelection 
          onCategoryChange={handleCategoryChange} // callback to set selected category
          activeStep={activeStep} // state of active step
          onStepChange={handleStepChange} // callback to update the active step
          selectedCategory={selectedCategory} // state of selected Category
          />
        </Grid>
       
        {/* Products + props*/}
        <Grid item xs={12} marginTop={2}>
          <ProductsMain 
          products={products} // products by chosen category
          wishlistedItems={wishlistedItems} // items in users wishlist
          cartedItems={cartedItems} // items in users cart
          refetchWishlist={refetchWishlist} // refetch Wishlist query
          refetchCart={refetchCart} // refetch Cart query
          /> 
        </Grid>


      </Grid>
    </Container>
  );
}
