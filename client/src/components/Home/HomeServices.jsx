import StorefrontIcon from "@mui/icons-material/Storefront"; // Discover products icon
import AddBusinessIcon from "@mui/icons-material/AddBusiness"; // Become vendor icon
import ContactSupportIcon from "@mui/icons-material/ContactSupport"; // Support icon
import { Box, Stack, Typography, Button } from "@mui/material";

export default function HomeServices() {
  return (
    <Stack
      direction="row"
      justifyContent={"space-around"}
      alignItems={"center"}
      marginY={8}
      sx={{}}
      bgcolor={'#0D0D0D'}
      
    >
      <Stack padding={5} alignItems='center'>
        <StorefrontIcon sx={{ fontSize: 100, color: "white" }} />
        <Button 
        variant="outlined" 
        href="explore/all">
            Shop
        </Button>
      </Stack>

      <Stack padding={5} alignItems='center'>
        <AddBusinessIcon sx={{ fontSize: 100, color: "white" }} />
        <Button 
        variant="outlined"
        href="#"
        >
            Sell
        </Button>
      </Stack>

      <Stack padding={5} alignItems='center'>
        <ContactSupportIcon sx={{ fontSize: 100, color: "white" }} />
        <Button 
        variant="outlined"
        href="#"
        >
            Ask
        </Button>
      </Stack>
    </Stack>
  );
}
