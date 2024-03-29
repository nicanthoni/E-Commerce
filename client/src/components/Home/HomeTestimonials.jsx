import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Box, Paper, Typography } from "@mui/material";
import NicsAvatar from '../../assets/images/MyAvatar-PNG.png'

export default function HomeTestimonials() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      {/* Section Heading */}
      <Typography
        variant="h4"
        color="primary.main"
        fontWeight="bold"
        textAlign="center"
      >
        Testimonials
      </Typography>

      {/* Reviews */}
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        // On small screens, change direction to column
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        {/* Review 1 */}
        <Stack padding={1} alignItems="center" gap={1} direction="column">
          <Avatar src={NicsAvatar} sx={{ bgcolor: "primary.main" }}></Avatar>
          <Typography>
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
            repellat id quidem!"
          </Typography>
          <Typography>
            Name
          </Typography>
          <Typography>
            Web Developer
          </Typography>
          <Rating name="read-only" value={5} readOnly />
        </Stack>

        {/* Review 2 */}
        <Stack padding={1} alignItems="center" gap={1} direction="column">
          <Avatar src={NicsAvatar} sx={{ bgcolor: "primary.main" }}></Avatar>
          <Typography>
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
            repellat id quidem!"
          </Typography>
          <Typography>
            Name
          </Typography>
          <Typography>
            Web Developer
          </Typography>
          <Rating name="read-only" value={5} readOnly />
        </Stack>

        {/* Review 3 */}
        <Stack padding={1} alignItems="center" gap={1} direction="column">
          <Avatar src={NicsAvatar} sx={{ bgcolor: "primary.main" }}></Avatar>
          <Typography>
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
            repellat id quidem!"
          </Typography>
          <Typography>
            Name
          </Typography>
          <Typography>
            Web Developer
          </Typography>
          <Rating name="read-only" value={5} readOnly />
        </Stack>
      </Stack>
    </Stack>
  );
}
