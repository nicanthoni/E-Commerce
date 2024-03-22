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

  // Sub components displayed in Drawer
  const DrawerList = (
    <Grid
      container
      direction='row'
      sx={{ width: 250, height: '100%', textAlign: "center" }}
      onClick={toggleDrawer(false)}
      rowSpacing={2}
      margin={0}
      alignItems="flex-start"
    >
      <Grid item sx={{ bgcolor: "primary.main" }} xs={12} alignSelf={'flex-start'} >
        <ShoppingCartIcon sx={{ my: 2  }}/>
      </Grid>
      <Grid item xs={12} alignSelf='flex-start'>
        <CheckoutOrder />
      </Grid>
       <Grid item xs={12} alignSelf='flex-end' sx={{ padding: 0  }}>
        <Box sx={{ bgcolor: "primary.main" }} xs={12}>
        <Typography paddingTop={2} fontWeight={'bold'}>Total: $</Typography>
        <Button
          variant="contained"
          href="/checkout"
          sx={{ bgcolor: "fourth.main", color: "white", marginBottom: 2  }}
        >Checkout</Button>
       </Box>
      </Grid>
    </Grid>
  );

  return (
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
  );
}
