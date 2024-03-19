import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import CheckoutUser from "./CheckoutUser";
import CheckoutOrder from "./CheckoutOrder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Checkout Drawer Component
export default function CheckoutMain() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Sub components displayed in Drawer
  const DrawerList = (
    <Box
      sx={{ width: 250, textAlign: "center" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box sx={{ bgcolor: "primary.main"}}>
        <ShoppingCartIcon sx={{ my: 2 }} />
      </Box>
      <Divider />
      <CheckoutUser />
      <CheckoutOrder />
    </Box>
  );

  return (
    <Box>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
