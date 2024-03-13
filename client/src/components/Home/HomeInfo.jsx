// This is marketing typography shown on the landing page (slogan, etc)

import { Typography } from "@mui/material";
import { Button } from "@mui/material";

export default function HomeInfo() {
  return (
    // Need to apply grid / flex layout
    <article>
      <Typography variant="h2" >STEP INTO ELEGANCE.</Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
        quaerat nostrum quia nam earum, libero, expedita impedit delectus
        provident quo eveniet.
      </Typography>
      <Button variant="contained" href="explore/all">
        Discover Products
      </Button>
    </article>
  );
}
