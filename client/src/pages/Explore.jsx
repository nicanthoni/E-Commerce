import { Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
      {category === "men" ? (
        <Typography variant="h3">Explore Men's</Typography>
      ) : category === "women" ? (
        <Typography variant="h3">Explore Women's</Typography>
      ) : (
        <Typography variant="h3">Explore All</Typography>
      )}
    </>
  );
}
