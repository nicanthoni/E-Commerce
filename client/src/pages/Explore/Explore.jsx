import { Grid, Container } from '@mui/material';
import ProductCard from './Product/ProductCard';
import Filters from './Filters/ProductFilters';
import CategorySelection from './_tests_/Categories';



export default function Explore() {
  return (
    <Container maxWidth='xl' sx={{ marginTop: 18, marginBottom: 5 }}>
      <Grid container className='products-Container' justifyContent={'center'}>

        {/* Categories */}
        <Grid item>
          {/* <CategorySelection/> */}
        </Grid>

        {/* Filters */}
        <Grid item>
          <Filters />
        </Grid>

        {/* Products */}
        <Grid item>
          <ProductCard />
        </Grid>

      </Grid>
    </Container>
  );
}
