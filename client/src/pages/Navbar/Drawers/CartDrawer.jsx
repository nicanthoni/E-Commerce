import { Box, Badge, IconButton, Drawer, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckoutMain from '../../Checkout/CheckoutDrawer/CheckoutMain'
import { useLazyQuery } from '@apollo/client';
import { User, Cart } from '../../../utils/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';


export default function CartDrawer() {
  let itemsInCart = 0;
  const { user, id } = useAuthContext();
  const [showCart, setShowCart] = useState(false);

   // Load Cart - array of prodcutIds (items in users' cart). Refetch whenever item is added/removed 
   const [loadCart, {loading: loadingCart, data: cartData, error: cartError, refetch: refetchCart}] = useLazyQuery(Cart, {
    variables: {id: id}
  })

    // Load User
    const [loadUser, { loading: loadingUser, data: userData, error: userError, refetch: refetchUserData }] = useLazyQuery(User, {
      variables: { userId: id },
    });

  // Toggle drawer - refetch cart data each time the cart is toggled
  const handleDrawerToggle = () => {
    setShowCart((prevShowCart) => !prevShowCart);
    if (!showCart) {
      refetchUserData()
    }
  };

  // Load users cart data
  useEffect(() => {
    if (user) {
    loadUser();
    loadCart();
  }
  }, [ loadCart, loadUser, user])


// Set cart badge = number of items in users cart
if (user && cartData) {
  itemsInCart = cartData.usersCart.length
} 

  return (
    <>
      {/* Icon */}
      <IconButton
        className='menu-icon'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ ml:{xs: 0, md: 2}, display: { color: '#fff' } }}
      >
        <Box className='cart-icon' sx={{  cursor: 'pointer' }}>
          <Badge badgeContent={itemsInCart} max={20} color='error'>
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
          display: { xs: 'inline-block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 285,
          },
          textAlign: 'center',
        }}
      >
        {user ? (
          <>
            <CheckoutMain refetchUserData={refetchUserData} loadUser={loadUser} />
          </>
        ) : (
          <>
            <Stack textAlign='center'>
              <Typography variant='h6' sx={{ m: 2 }}>
                <Link
                  onClick={handleDrawerToggle}
                  underline='hover'
                  fontWeight='bold'
                  to='/signin'
                >
                  Sign in
                </Link>{' '}
                to view your cart.
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
