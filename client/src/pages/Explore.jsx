import { Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Explore/ProductCard";

export default function Explore() {
  const [products, setProducts] = useState([]);
  const [priceFlter, setPriceFilter] = useState("default");
  const [checkBoxState, setCheckBoxState] = useState({
    men: false,
    women: false,
  });

  const { category } = useParams();

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
    <>
      <Grid container>
        {/* Conditional page title rendering */}
        <Grid item>
          {category === "men" ? (
            <Typography variant="h3">Explore Men's</Typography>
          ) : category === "women" ? (
            <Typography variant="h3">Explore Women's</Typography>
          ) : (
            <Typography variant="h3">Explore All</Typography>
          )}
        </Grid>

        {/* Item Cards */}
        <Grid item>
          <ProductCard />
        </Grid>

        {/* Category Filter (Men/Women check boxes) */}
        <Grid item></Grid>

        {/* Sory by Filter (lowest/highest price) */}
        <Grid item></Grid>
      </Grid>
    </>
  );
}
