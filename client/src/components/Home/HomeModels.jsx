import Grid from "@mui/material/Grid"; // Grid version 2
import model1 from "../../assets/images/model1.jpg";
import model2 from "../../assets/images/model2.jpg";
import model3 from "../../assets/images/model3.jpg";
import StorefrontIcon from "@mui/icons-material/Storefront"; // Discover products icon
import AddBusinessIcon from "@mui/icons-material/AddBusiness"; // Become vendor icon
import ContactSupportIcon from '@mui/icons-material/ContactSupport'; // Support icon
import { Stack, Typography, Button, Paper } from "@mui/material";

export default function HomeModels() {
  return (

      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        spacing={1}
      >
        <Stack direction="row" alignItems={"center"} spacing={1} >
          <Stack direction="column" alignItems={"center"}  borderBottom='inset'>
            <StorefrontIcon sx={{ fontSize: 90 }} />
            <Button sx={{ color: "fourth.main" }}>Shop</Button>
          </Stack>
          <Typography variant="caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, cumque dolore. Placeat fuga eaque.</Typography>
        </Stack>
        <Stack direction="row" alignItems={"center"} spacing={1}>
          <Stack direction="column" alignItems={"center"}  borderBottom='inset'>
            <AddBusinessIcon sx={{ fontSize: 90 }} />
            <Button sx={{ color: "fourth.main" }}>Sell</Button>
          </Stack>
          <Typography variant="caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
        </Stack>
        <Stack direction="row" alignItems={"center"} spacing={1}>
          <Stack direction="column" alignItems={"center"}  borderBottom='inset'>
            <ContactSupportIcon sx={{ fontSize: 90 }} />
            <Button sx={{ color: "fourth.main" }}>Ask</Button>
          </Stack>
          <Typography variant="caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iste illo adipisci omnis veniam quod tempora provident.</Typography>
        </Stack>
      </Stack>

  );
}

