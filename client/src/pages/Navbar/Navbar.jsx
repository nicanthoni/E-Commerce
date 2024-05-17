import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { Container } from '@mui/material';
import CheckoutMain from '../Checkout/CheckoutDrawer/CheckoutMain';
import LogoDevIcon from '@mui/icons-material/LogoDev'; // Logo placeholder
import MenuDrawer from './_tests_/MenuDrawer'; 
import TopNavbar from './_tests_/TopNavbar';

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);


  // Toggle CHECKOUT drawer
  const toggleShowCart = () => {
    setShowCart((prevShowCart) => !prevShowCart); //
  };


  // console.log('Auth Context: ', user);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component='nav'
        sx={{ backgroundColor: 'primary', display: 'flex' }}
        elevation={0}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>


            {/* MENU DRAWER - component*/}
            <MenuDrawer />


            {/* Navbars Logo & AppName */}
            <Typography
              variant='h6'
              component='div'
              sx={{
                flexGrow: 1,
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              <NavLink to='/' style={{ textDecoration: 'none', color: '#fff' }}>
                <LogoDevIcon /> AppName
              </NavLink>
            </Typography>


            {/* MAIN NAVBAR */}
            <TopNavbar/>


            {/* CHECKOUT DRAWER */}
            <Box className='cart-icon' sx={{ ml: 3, mr: 4, cursor: 'pointer' }}>
              <Badge
                onClick={toggleShowCart}
                badgeContent={1}
                max={10}
                color='error'
              >
                <ShoppingCartIcon />
              </Badge>
            </Box>
            {showCart && <CheckoutMain />}



          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
