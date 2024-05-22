import { Box, Button, Typography } from '@mui/material';
import CheckoutOrder from './CheckoutOrder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid';

// Layout of items within the Shopping Cart Drawer
export default function CheckoutMain() {
  return (
    <Grid
      container
      direction='column'
      flexWrap='nowrap'
      sx={{
        boxSizing: 'border-box',
        width: 285,
        minHeight: '100vh', // Full height of the parent container
        textAlign: 'center',
      }}
    >
      {/* Cart icon */}
      <Grid
        item
        sx={{
          bgcolor: 'primary.main',
          flex: '0 0 10%', // Fixed height for the icon section
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='h6'
          color='#fff'
          sx={{ my: 2, display: 'inline-block' }}
        >
          <ShoppingCartIcon />
        </Typography>
      </Grid>

      {/* Cart Items */}
      <Grid
        item
        sx={{
          flex: '1 1 auto', // Grow to fill the remaining space
          overflowY: 'auto',
          justifyContent: 'flex-start',
          bgcolor: 'background.paper', // Adjust as needed
        }}
      >
        <CheckoutOrder />

      </Grid>

      {/* Checkout btn & Total price */}
      <Grid
        item
        sx={{
          flex: '0 0 auto', // Fixed height for the footer section
          mt: 'auto',
          bgcolor: 'primary.main',
        }}
      >
        <Box>
          <Typography padding={1} fontWeight='bold' color='#fff'>
            Subtotal: $0
          </Typography>

          <Button
            variant='contained'
            color='secondary'
            href='/checkout'
            sx={{
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
}
