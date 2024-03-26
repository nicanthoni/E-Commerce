import { Stack, Box } from "@mui/material";
import ecommerceImg from "../../assets/images/ecommerce-icon.svg";
import { Link } from "@mui/material";

export default function HomeLogo() {
  return (
    <Stack direction="column" textAlign={"center"}>
      <Box>
        <img src={ecommerceImg} />
        {/* Link required without premium sub */}
        {/* If screen is xs size, do not display link (since img is hidden on xs size) */}
        <Link justifyContent={'center'} fontSize={8} marginTop={0} href="https://storyset.com/people" sx={{ display: {xs: 'none', md: 'yes'}}}>
          People illustrations by Storyset
        </Link>
      </Box>
    </Stack>
  );
}
