// this can be logos, photos, products, model photoshoot photos

import "./HomeModels.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function HomeModels() {
  return (
    <>
      <Grid container sx={3} direction={"row"}>
        <Grid item>1</Grid>
        <Grid item>2</Grid>
        <Grid item>3</Grid>
      </Grid>
      {/* Graphics, logos, models, etc to go here alongside the HomeInfo section */}
    </>
  );
}
