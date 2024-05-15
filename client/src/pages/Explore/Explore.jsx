import { Grid, Container } from "@mui/material";
import ProductCard from "./ProductCard";
import FilterCategory from "./filters/FilterCategory";
import FilterPrice from "./filters/FilterPrice";

export default function Explore() {
  return (
    <Container maxWidth="xl" sx={{ marginTop: 12 }}>
      <Grid container className="products-Container">
        {/* Grid item - Category Filter (Men/Women check boxes) */}
        <>
          <FilterCategory />
        </>

        {/* Grid item - Sort by Filter (lowest/highest price) */}
        <>
          <FilterPrice />
        </>

        {/* Products */}
        <>
          <ProductCard />
        </>
      </Grid>
    </Container>
  );
}
