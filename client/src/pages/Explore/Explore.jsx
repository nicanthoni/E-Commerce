import { Grid, Container} from '@mui/material';
import ProductCards from './Product/ProductCards';
import Filters from './Filters/ProductFilters';
import CategorySelection from './_tests_/Categories';
import Data from '../../data/productData.json' // sample data
import { useState } from 'react'; // to keep track of the selected category.


export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  // Callback to update the selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'All Products'? Data
    : Data.filter(product => product.category === selectedCategory);


  return (
    <Container maxWidth='xl' sx={{ marginTop: 18, marginBottom: 4 }}>

      <Grid container justifyContent={'center'}>


        {/* Categories */}
        <Grid item xs={12}>
          <CategorySelection onCategoryChange={handleCategoryChange}/>
        </Grid>

      
        {/* Filters */}
        <Grid item marginTop={3}>
          <Filters />
        </Grid>
        

        {/* Products */}
        <Grid item>
          <ProductCards products={filteredProducts} />
        </Grid>


      </Grid>

    </Container>
  );
}
