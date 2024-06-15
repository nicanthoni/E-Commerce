import { Box, Button, Typography } from '@mui/material';
import CartItem from './CartItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Grid from '@mui/material/Grid';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect } from 'react';


// Layout of components within the cart drawer
export default function CartLayout({  loadUser, userData, cartData, refetchCart, refetchUserData  }) {
const { id } = useAuthContext()

// Run loadUser when component mounts
useEffect(() => {
  loadUser();
}, [loadUser]);


 // Loading check
 if (!userData || !cartData) {
  return <Typography>Loading...</Typography>;
}

// Calculate cart subtotal 
const subtotal = userData.user.cart.reduce((total, item) => {
  return total + item.item.price;
}, 0).toFixed(2);
  
  return (
    <Grid container
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
      <Grid item
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


      {/* Items in Cart*/}
      {cartData.usersCart.length === 0 ?  (
      <Grid item>
        <Typography variant='h6' sx={{ m: 2 }}>
          0 items in your cart.
        </Typography>
        <Button
          href='/explore'
          variant='contained'
          color='secondary'
          sx={{ textTransform: 'none', mx: 3 }}
          >
          Shop Items
        </Button>
      </Grid>
      ) : (
      <Grid item
        p={1}
        sx={{
          overflowY: 'auto',
          justifyContent: 'flex-start',
          bgcolor: 'background.paper',
        }}>
        <CartItem refetchUserData={refetchUserData} refetchCart={refetchCart} userData={userData} loadUser={loadUser} cartData={cartData}/>
      </Grid>
      )} 


      {/* Checkout Button & Subtotal */}
      {cartData.usersCart.length === 0 ? (null) : (
      <Grid item
        sx={{
          flex: '0 0 auto', // Fixed height for the footer section
          mt: 'auto',
          bgcolor: 'primary.main',
        }}
      >
        <Box>
          <Typography padding={1}  color='#fff'>
            <span style={{ fontWeight: 'bold'}}>Subtotal:</span> ${subtotal}
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
      )}


    </Grid>
  );
}
