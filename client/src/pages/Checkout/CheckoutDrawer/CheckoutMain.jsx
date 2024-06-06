import { Box, Button, Typography } from '@mui/material';
import CheckoutOrder from './CheckoutOrder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { User } from '../../../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';


// Layout of items within the Shopping Cart Drawer
export default function CheckoutMain() {
  const { id } = useAuthContext()
  const [loadUser, { loading, data, error, refetch: refetchUserData }] = useLazyQuery(User, {
    variables: { userId: id },
  });

// Run loadUser 1x when component renders - re-run loadUser if it changes
useEffect(() => {
  loadUser();
}, [loadUser]);

if (error) {
  console.error('GraphQL Error:', error);
  return <Typography>Error fetching data</Typography>;
}
if (loading) {
  return <Typography>Loading...</Typography>; 
}
if (!data || !data.user) {
  return <Typography>No user data found</Typography>;
}

// Grab data
const user = data.user;

// Calculate cart subtotal 
const subtotal = user.cart.reduce((total, item) => {
  return total + item.item.price;
}, 0);

  
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
        <CheckoutOrder refetchUserData={refetchUserData} userData={user} loadUser={loadUser}/>
      </Grid>

      {/* Checkout & Subtotal */}
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
            Subtotal: ${subtotal}
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
