import { Grid, Container} from '@mui/material';
import ProductCard from './Product/ProductCard';
import Filters from './Filters/ProductFilters';
import CategorySelection from './_tests_/Categories';


export default function Explore() {


  return (
    <Container maxWidth='xl' sx={{ marginTop: 18, marginBottom: 5 }}>
      <Grid container justifyContent={'center'}>

        {/* Categories */}
        <Grid item xs={12} spacing={5} textAlign='center' >
          <CategorySelection/>
        </Grid>

        <br/>

        {/* Filters */}
        <Grid item marginTop={3}>
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
