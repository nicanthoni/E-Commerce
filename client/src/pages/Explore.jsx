import { Grid, Container } from "@mui/material";
import ProductCard from "../components/Explore/ProductCard";
import FilterCategory from "../components/Explore/FilterCategory";
import FilterPrice from "../components/Explore/FilterPrice";

export default function Explore() {

  return (
    <Container maxWidth='xl' sx={{ marginTop: 12 }}>
      <Grid container className="products-Container">
        
        {/* Grid item - Category Filter (Men/Women check boxes) */}
        <><FilterCategory /></>

        {/* Grid item - Sort by Filter (lowest/highest price) */}
        <><FilterPrice/></>

        {/* Products */}
        <><ProductCard/></>

      </Grid>
    </Container>
  );
}
