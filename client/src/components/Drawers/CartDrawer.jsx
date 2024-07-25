import {
  Box,
  Badge,
  IconButton,
  Drawer,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartLayout from '../../pages/Checkout/Drawer/CartLayout';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../graphql/queries';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function CartDrawer() {
  let itemsInCart = 0;
  const { user, id } = useAuthContext();

  // Drawer state
  const [showCart, setShowCart] = useState(false);

  // Load User
  const [
    loadUser,
    {
      loading: loadingUser,
      data: userData,
      error: userError,
      refetch: refetchUserData,
    },
  ] = useLazyQuery(User, {
    variables: { userId: id },
  });

  // Toggle drawer - refetch cart data each time the cart is toggled
  const handleDrawerToggle = () => {
    setShowCart((prevShowCart) => !prevShowCart);
    if (!showCart) {
      refetchUserData();
    }
  };

  // Load users cart data
  useEffect(() => {
    if (user) {
      loadUser();
    }
  }, [loadUser, user]);

  // Set cart badge = number of items in users cart
  if (user && userData) {
    itemsInCart = userData.user.cart.length;
  }

  // Users cart data - ids
  const cartData = userData?.user.cart.map((cartItem) => cartItem.item._id);

  return (
    <>
      {/* Icon */}
      <IconButton
        className='menu-icon'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ ml: { xs: 0, md: 0.5 }, color: 'text.secondary' }}
      >
        <Box className='cart-icon' sx={{ cursor: 'pointer' }}>
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
            <CartLayout
              refetchUserData={refetchUserData}
              loadUser={loadUser}
              userId={id}
              userData={userData}
              cartData={cartData}
            />
          </>
        ) : (
          <>
            <Stack textAlign='center'>
              <Typography variant='h6' sx={{ m: 2, color: 'black' }}>
                Sign in to view your cart.
              </Typography>

              <Button
                href='/signin'
                variant='contained'
                color='secondary'
                sx={{ textTransform: 'none', mx: 3, borderRadius: 6 }}
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
