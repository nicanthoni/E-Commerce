import { Button, Typography, Stack } from "@mui/material";

export default function HomeCTA() {
  return (
    <Stack direction="column" alignItems={"center"} padding={5} gap={2}>
      <Typography variant="h4" color="#fff">
        The e-commerce experience for all
      </Typography>
      <Typography color="#fff">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolores
        molestiae accusamus maiores cumque.
      </Typography>
      <Button
        variant="contained"
        sx={{ bgcolor: "secondary.main", color: "primary.main" }}
      >
        Discover Products
      </Button>
    </Stack>
  );
}
