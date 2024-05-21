import { Grid, Container } from '@mui/material';
import ProductCard from './Product/ProductCard';
import Filters from './Filters/Filters';

export default function Explore() {
  return (
    <Container maxWidth='xl' sx={{ marginTop: 18, marginBottom: 5 }}>
      <Grid container className='products-Container' justifyContent={'center'}>

        {/* Filters */}
        <Grid item direction='column'>
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
