import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import CheckoutUser from "./CheckoutUser";
import CheckoutOrder from "./CheckoutOrder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

// adjust drawer width
const drawerWidth = 250;

// Checkout Drawer Component
export default function CheckoutMain() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Sub components displayed in Drawer
  const DrawerList = (
    <Grid
      container
      direction={'column'}
      sx={{ width: 250, textAlign: "center" }}
      onClick={toggleDrawer(false)}
      rowSpacing={3}
    >
      <Grid item sx={{ bgcolor: "primary.main" }} xs={12}>
        <ShoppingCartIcon sx={{ my: 2  }}/>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <CheckoutUser />
      </Grid>
      <Grid item xs={12}>
        <CheckoutOrder />
      </Grid>
      <Grid item xs={12}>
        <Button
          className="checkout-btn"
          variant="contained"
          href="/checkout"
          sx={{ bgcolor: "fourth.main", color: "white" }}
        >
          Checkout
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}
