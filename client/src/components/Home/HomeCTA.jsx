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
        href="/accounttype"
        sx={{ bgcolor: "secondary.main", color: "primary.main", textTransform: 'none' }}
      >
        Get Started!
      </Button>
    </Stack>
  );
}
