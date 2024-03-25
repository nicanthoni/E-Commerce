import { Typography, Grid, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Explore/ProductCard";

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
    <Container>
      <Grid container className="products-Container">
        
        {/* Products */}
        <ProductCard />

        {/* Grid item - Category Filter (Men/Women check boxes) */}
        {/* Grid item - Sort by Filter (lowest/highest price) */}
      </Grid>
    </Container>
  );
}
