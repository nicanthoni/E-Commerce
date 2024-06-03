import { Grid, Container } from '@mui/material';
import ProductsMain from './Product/ProductsMain';
import CategorySelection from './Filters/Categories';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Products } from '../../utils/queries';
import { useState } from 'react'; // to keep track of the selected category


export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState(''); // Manage state of selected Category
  const [loadProducts, {loading, data, error}] = useLazyQuery(Products, {
    variables: {category: selectedCategory}
  })


    // useEffect - Load products if category is selected
    useEffect(() => {
      loadProducts();
  }, [loadProducts])


  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error fetching data</p>;
  }
  if (loading) {
    return <p>Loading...</p>; 
  }
  if (!data) {
    return <p>No product data found</p>;
  }


  // Callback to update the selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  // Grab data
  const productData = data ? data.filterItems : []; 
  // console.log(`${selectedCategory} items: `, productData);


  return (
    <Container maxWidth='xl'>
      <Grid container spacing={0} justifyContent='center' marginTop={18} marginBottom={4}>


        {/* Categories */}
        <Grid item xs={12}>
          <CategorySelection onCategoryChange={handleCategoryChange}/>
        </Grid>
       
        {/* Products */}
        <Grid item xs={12} marginTop={4}>
          <ProductsMain products={productData} />
        </Grid>


      </Grid>
    </Container>
  );
}
