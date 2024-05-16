import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CheckoutOrder from './CheckoutOrder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Typography, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Auth from '../../../utils/auth';
import { useAuthContext } from '../../../hooks/useAuthContext';

// adjust drawer width
const drawerWidth = 285;

// Checkout Drawer Component
export default function CheckoutMain() {
  const { user } = useAuthContext()
  const [open, setOpen] = useState(true);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Layout of Drawers components
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
      onClick={toggleDrawer(false)}
      rowSpacing={2}
      margin={0}
    >
      {/* Shopping Cart icon */}
      <Grid item xs={12} sx={{ bgcolor: 'primary.main' }}>
        <ShoppingCartIcon sx={{ my: 2, color: '#fff' }} />
      </Grid>

      {/* Product info display */}
      <Grid item xs={12}>
        <CheckoutOrder />
      </Grid>

      {/* Container for Checkout btn and Total price */}
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

  // Component renders on ShoppingCart icon click
  return (
    <Drawer
      variant='temporary'
      anchor='right'
      open={open}
      onClose={toggleDrawer(false)}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >

      {/* Conditionally render cart items depending on if loggedIn or not */}
      {user ? (
        DrawerItems
      ) : (
        <Stack textAlign='center'>
          <Typography variant='h6' sx={{ m: 2 }}>
            Please sign in to view your cart.
          </Typography>
          <Button
          href='/signin'
          variant='contained'
          color='secondary'
          sx={{ textTransform: 'none', mx: 3 }}
        >
          Sign in
        </Button>
        </Stack>
      )}
    </Drawer>
  );
}
