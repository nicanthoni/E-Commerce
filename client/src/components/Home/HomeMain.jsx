// Parent Home component to neatly render other Home components within
import React from "react";
import HomeInfo from "./HomeInfo";
import HomeModels from "./HomeModels";
import "./HomeMain.css";
import Grid from "@mui/material/Unstable_Grid2";
import Footer from "../Footer/Footer";

export default function HomeMain() {
  return (
    <Grid
      container
      className="home-main-container"
      marginX={4}
      columnSpacing={4}
      alignItems={"center"}
      paddingTop={5}
    >
      <Grid item xs={12} md={6} lg={6} className="home-info">
        <HomeInfo />
      </Grid>
      <Grid item xs={0} md={6} lg={6} className="home-models">
        <HomeModels />
      </Grid>
    </Grid>
    
  );
}
