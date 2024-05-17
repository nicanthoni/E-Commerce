import { Box, Badge, IconButton, Drawer,Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckoutMain from '../../Checkout/CheckoutDrawer/CheckoutMain';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function CartDrawer() {
  const { user } = useAuthContext()
  const [showCart, setShowCart] = useState(false);

  // Toggle drawer
  const handleDrawerToggle = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };


  return (
    <>
      <IconButton
        className='menu-icon'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ ml: 3, display: { color: '#fff' } }}
      >
        <Box className='cart-icon' sx={{ ml: 3, mr: 4, cursor: 'pointer' }}>
          <Badge badgeContent={1} max={10} color='error'>
            <ShoppingCartIcon />
          </Badge>
        </Box>
      </IconButton>


        <Drawer
        variant='temporary'
        anchor='right' 
        open={showCart}
        onClose={handleDrawerToggle}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile
        }}
        sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 285,
            },
        }}
        
        >
        {user ? (

        <>
            <CheckoutMain />
        </>

        ) : (
            <>
        <Stack textAlign='center'>
          <Typography variant='h6' sx={{ m: 2 }}>
            <Link onClick={handleDrawerToggle} underline='hover' fontWeight='bold' to='/signin'>
                Sign in
            </Link> to view your cart.
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
            </>
        )}
        
      </Drawer>
    </>
  );
}
