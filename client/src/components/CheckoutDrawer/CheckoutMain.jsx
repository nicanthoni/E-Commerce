import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import CheckoutOrder from "./CheckoutOrder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

// adjust drawer width
const drawerWidth = 250;

// Checkout Drawer Component
export default function CheckoutMain() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  
  // Layout of components inside Drawer
  const DrawerItems = (
<Grid
  container
  sx={{
    width: 250,
    height: '100%',
    textAlign: "center",
    flexDirection: 'column', // Stack items vertically
    overflowY: 'auto'
  }}
  onClick={toggleDrawer(false)}
  rowSpacing={2}
  margin={0}
>
  {/* Shopping Cart icon */}
  <Grid item xs={12} sx={{ bgcolor: "primary.main" }}>
    <ShoppingCartIcon sx={{ my: 2, color: '#fff' }} />
  </Grid>

  {/* Product summary */}
  <Grid item xs={12}>
    <CheckoutOrder />
  </Grid>

  {/* BELOW is for overflow issue 
  - needs to be scrollable with component shrinking when item count  */}

  {/* <Grid item xs={12}>
    <CheckoutOrder />
  </Grid>  
  <Grid item xs={12}>
    <CheckoutOrder />
  </Grid>  
  <Grid item xs={12}>
    <CheckoutOrder />
  </Grid>
  <Grid item xs={12}>
    <CheckoutOrder />
  </Grid> */}

  {/* Container for Checkout btn and Total price */}
  <Grid item xs={12} sx={{ padding: 0, marginTop: 'auto' }}>
    <Box sx={{ bgcolor: "primary.main" }}>
      <Typography padding={1} fontWeight={'bold'} color='#fff'>Total: $0</Typography>
      <Button
        variant="contained"
        href="/checkout"
        sx={{ bgcolor: "secondary.main", color: "primary.main", marginBottom: 2, fontWeight: 'bold' }}
      >Checkout</Button>
    </Box>
  </Grid>
</Grid>

  );

  // Navbar component renders Drawer onClick
  return (
      <Drawer
        variant="temporary"
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
        {DrawerItems}
      </Drawer>
  );
}
