import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import "./HomeInfo.css";

export default function HomeInfo() {
  return (

    <Grid
      container
      className="home-info-Container"
      direction={"column"}
      rowSpacing={2}
    >
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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum nulla
          voluptatibus consequatur animi recusandae unde ipsa eligendi magni,
          porro fugiat dicta ut sequi at perspiciatis. Necessitatibus, et
          numquam. Autem, aperiam.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          className="discover-products-btn"
          variant="contained"
          href="explore/all"
          sx={{ bgcolor: "fourth.main", color: "white" }}
        >
          Discover Products
        </Button>
      </Grid>
    </Grid>
  );
}
