import { Typography, Grid, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Explore/ProductCard";
import Data from "../productData.json";

export default function Explore() {
  const { category } = useParams();
  // const [products, setProducts] = useState([]);
  // const [priceFlter, setPriceFilter] = useState("default");
  // const [checkBoxState, setCheckBoxState] = useState({
  //   men: false,
  //   women: false,
  // });

  //   useEffect(() => {
  //     console.log(`category: ${category}`)
  //     let resetCheckBoxState = {
  //       men: false,
  //       women: false,
  //     };
  //     if (category === "all") {
  //       setCheckBoxState(resetCheckBoxState);
  //       return;
  //     }
  //     setCheckBoxState({ ...resetCheckBoxState, [category]: true });
  //   }, [category]);

  return (
    <Grid container className="products-Container">
      {/* Conditional page title rendering */}
      {/* <Grid item>
          {category === "men" ? (
            <Typography variant="h3" align="center">Explore Men's</Typography>
          ) : category === "women" ? (
            <Typography variant="h3" align="center">Explore Women's</Typography>
          ) : (
            <Typography variant="h3" align="center">Explore All</Typography>
          )}
        </Grid> */}

      {/* Products */}

        
          <ProductCard />
    


      {/* <Grid item xs={12} sm={4} marginTop={2}>
          <ProductCard />
        </Grid>
        <Grid item xs={12} sm={4} marginTop={2}>
          <ProductCard />
        </Grid>
        <Grid item xs={12} sm={4} marginTop={2}>
          <ProductCard />
        </Grid> */}

      {/* Category Filter (Men/Women check boxes) */}
      <Grid item></Grid>

      {/* Sort by Filter (lowest/highest price) */}
      <Grid item></Grid>
    </Grid>
  );
}
