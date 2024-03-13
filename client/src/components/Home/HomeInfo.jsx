// This is marketing typography shown on the landing page (slogan, etc)

import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import "./HomeInfo.css";

export default function HomeInfo() {
  return (
    // Need to apply grid / flex layout
    <article>
      <Typography className="info-header" variant="h2" sx={{ fontWeight: "bold" }}>
        STEP INTO ELEGANCE.
      </Typography>
      <Typography className="info-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
        quaerat nostrum quia nam earum, libero, expedita impedit delectus
        provident quo eveniet.
      </Typography>
      <Button className="discover-products-btn" variant="contained" href="explore/all">
        Discover Products
      </Button>
    </article>
  );
}
