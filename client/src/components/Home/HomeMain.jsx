// Parent Home component to neatly render other Home components within
import React from "react";
import HomeInfo from "./HomeInfo";
import HomeModels from "./HomeModels";
import "./HomeMain.css";
import Grid from "@mui/material/Unstable_Grid2";

export default function HomeMain() {
  return (
    <Grid container>
      <Grid item>
        <HomeInfo />
      </Grid>
      <Grid item>
        <HomeModels />
      </Grid>
    </Grid>
  );
}
