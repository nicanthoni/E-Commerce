import { Grid, Container, Typography } from '@mui/material';
import ProductsMain from './Product/ProductsMain';
import CategorySelection from './Filters/Categories';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Products, Wishlist } from '../../utils/queries';
import { useAuthContext } from '../../hooks/useAuthContext';


export default function Explore() {
  const { user, id } = useAuthContext()
  const [selectedCategory, setSelectedCategory] = useState(''); // Manage state of selected Category

  // Load Products - pass refetch to child, so this query reruns when its added to wishlist/cart
  const [loadProducts, {loading: loadingProducts, data: productsData, error: productsError }] = useLazyQuery(Products, {
    variables: {category: selectedCategory}
  })

  // Load array of productIds (all items in users' wishlist)
  const [loadWishlist, {loading: loadingWishlist, data: wishlistData, error: wishlistError, refetch: refetchWishlist}] = useLazyQuery(Wishlist, {
    variables: {id: id}
  })

   // Load Products - trigger when selectedCategory changes
   useEffect(() => {
    loadProducts();
  }, [loadProducts]); 


  // Load Wishlist - Trigger when user changes
  useEffect(() => {
    if (user) {
      loadWishlist();
    }
  }, [user, loadWishlist]); 
  


  if (productsError) {
    console.error('GraphQL Products Error:', productsError);
    return <Typography>Error fetching product data</Typography>;
  }

  if (wishlistError) {
    console.error('GraphQL Wishlist Error:', wishlistError);
    return <Typography>Error fetching wishlist data</Typography>;
  }

  if (loadingProducts || loadingWishlist) {
    return <Typography>Loading...</Typography>;
  }

  if (!productsData) {
    return <Typography>No product data found</Typography>;
  }

  // Callback to update the selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Grab Product data
  const products = productsData ? productsData.filterItems : []; 
  // console.log(`${selectedCategory} items: `, productData);

   // Grab wishlistedItems data (boolean)
   const wishlistedItems = wishlistData ? wishlistData.usersWishlist : [];
  //  console.log('Wishlist Data:', wishlistedItems);


  return (
    <Container maxWidth='xl'>
      <Grid container spacing={0} justifyContent='center' marginTop={18} marginBottom={4}>


        {/* Categories */}
        <Grid item xs={12}>
          <CategorySelection onCategoryChange={handleCategoryChange}/>
        </Grid>
       
        {/* Products */}
        <Grid item xs={12} marginTop={4}>
          <ProductsMain products={products} wishlistedItems={wishlistedItems} refetchWishlist={refetchWishlist}/>
        </Grid>


      </Grid>
    </Container>
  );
}
