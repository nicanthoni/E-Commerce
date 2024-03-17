// This is marketing typography shown on the landing page (slogan, etc)

import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import "./HomeInfo.css";

export default function HomeInfo() {
  return (
    <Grid container className="home-info-Container" direction={"column"} rowSpacing={1}>
      <Grid item>
        <Typography
          className="info-header"
          variant="h2"
          sx={{ fontWeight: "bold" }}
        >
          STEP INTO ELEGANCE.
        </Typography>
      </Grid>
      <Grid item>
        <Typography className="info-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          quaerat nostrum quia nam earum, libero, expedita impedit delectus
          provident quo eveniet.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          className="discover-products-btn"
          variant="contained"
          href="explore/all"
          sx={{bgcolor: "fourth.main", color: "white" }}

        >
          Discover Products
        </Button>
      </Grid>
    </Grid>
  );
}
