import { useState } from 'react';
import {Box, Drawer, Button, Typography } from '@mui/material';
import CheckoutOrder from './CheckoutOrder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Unstable_Grid2/Grid2';



// Layout of items within Checkout Drawer 
export default function CheckoutMain() {
  
  const DrawerItems = (

    <Grid
      container
      sx={{
        width: 285,
        height: '100%',
        textAlign: 'center',
        flexDirection: 'column', // Stack items vertically
        overflowY: 'scroll',
        flexWrap: 'nowrap', // addresses overflow issue
      }}
      rowSpacing={2}
      margin={0}
    >

      {/* Cart icon */}
      <Grid item xs={12} sx={{ bgcolor: 'primary.main' }}>
        <ShoppingCartIcon sx={{ my: 2, color: '#fff' }} />
      </Grid>

      {/* Cart Items */}
      <Grid item xs={12}>
        <CheckoutOrder />
      </Grid>

      {/* Checkout btn & Total price */}
      <Grid item xs={12} sx={{ padding: 0, marginTop: 'auto' }}>
        <Box sx={{ bgcolor: 'primary.main' }}>

          <Typography padding={1} fontWeight={'bold'} color='#fff'>
            Subtotal (0 items): $0
          </Typography>

          <Button
            variant='contained'
            href='/checkout'
            sx={{
              bgcolor: 'secondary.main',
              color: 'primary.main',
              marginBottom: 2,
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          >
            Checkout
          </Button>

        </Box>
      </Grid>
    </Grid>
  );

 
  return (

      (DrawerItems)

  );
}
