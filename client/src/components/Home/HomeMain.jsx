// Parent Home component to neatly render other Home components within
import React from "react";
import HomeInfo from "./HomeInfo";
import HomeModels from "./HomeModels";
import "./HomeMain.css";
import Grid from "@mui/material/Unstable_Grid2";

export default function HomeMain() {
  return (
    <Grid container className="home-main-container" 
    marginX={4}
    columnSpacing={3}
    justifyContent={'center'}
    alignItems={'center'}
    paddingTop={3}
    paddingBottom={3}
    >
      <Grid item xs={12} md={6} className="home-info">
        <HomeInfo />
      </Grid>
      <Grid item xs={0} md={6} className="home-models">
        <HomeModels />
      </Grid>
    </Grid>
  );
}
