// this can be logos, photos, products, model photoshoot photos

import "./HomeModels.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import model1 from "../../assets/images/model1.jpg";
import model2 from "../../assets/images/model2.jpg";
import model3 from "../../assets/images/model3.jpg";
import model4 from "../../assets/images/model4.jpg";

export default function HomeModels() {
  return (
    <Grid container className="model-container" sx={3} direction={"row"}>
      <Grid item className="model-wrapper">
        <img src={model1} className="model-photo" alt="model photograph" />
      </Grid>
      <Grid item className="model-wrapper">
        2
      </Grid>
      <Grid item className="model-wrapper">
        3
      </Grid>
    </Grid>
  );
}
