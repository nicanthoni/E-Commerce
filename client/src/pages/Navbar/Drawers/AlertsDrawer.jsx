import {
  Box,
  Badge,
  IconButton,
  Drawer,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function AlertsDrawer() {
  const { user } = useAuthContext();
  const [showCart, setShowCart] = useState(false);

  // Toggle drawer
  const handleDrawerToggle = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  return (
    <>
      {/* Notifcations Icon */}
      <IconButton
        className='notifications-icon'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ ml:{xs: 0, md: 2}, display: { color: '#fff' } }}
      >
        <Box className='cart-icon' sx={{ cursor: 'pointer' }}>
          <Badge badgeContent={1} max={20} color='error'>
            <NotificationsIcon />
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
        {/* Where component for Messages/Notifications will go */}
        <>
          <Stack textAlign='center'>
            <Typography variant='h6' sx={{ m: 2 }}>
              You have no notifications
            </Typography>
          </Stack>
        </>
      </Drawer>
    </>
  );
}
