import { Grid, Container } from '@mui/material';
import ProductsMain from './Product/ProductsMain';
import CategorySelection from './Filters/Categories';
import { useLazyQuery } from '@apollo/client';
import { Products } from '../../utils/queries';
import Data from '../../data/productData.json' // sample data
import { useState } from 'react'; // to keep track of the selected category


export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState(''); // Manage state of selected Category

  // Callback to update the selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'All Products'? Data
    : Data.filter(product => product.category === selectedCategory);


  return (
    <Container maxWidth='xl'>
      <Grid container spacing={0} justifyContent='center' marginTop={18} marginBottom={4}>


        {/* Categories */}
        <Grid item xs={12}>
          <CategorySelection onCategoryChange={handleCategoryChange}/>
        </Grid>
       
        {/* Products */}
        <Grid item xs={12} marginTop={4}>
          <ProductsMain products={filteredProducts} />
        </Grid>


      </Grid>
    </Container>
  );
}
