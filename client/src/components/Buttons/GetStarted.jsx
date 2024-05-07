import { Button } from "@mui/material";

// Reusable Get Started button component
export default function GetStarted() {
    
  return (
    <Button
      variant="contained"
      href="/accounttype"
      color="secondary"
      sx={{ color: "primary", textTransform: "none" }}
    >
      Get Started!
    </Button>
  );
}
