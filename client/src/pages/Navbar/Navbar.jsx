import {Typography, AppBar, Box, Toolbar, Container} from '@mui/material';
import { NavLink } from 'react-router-dom';
import LogoDevIcon from '@mui/icons-material/LogoDev'; // Logo placeholder
import MenuDrawer from './_tests_/MenuDrawer'; 
import TopNavbar from './_tests_/TopNavbar';
import CartDrawer from './_tests_/CartDrawer';

export default function Navbar() {

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component='nav'
        sx={{ backgroundColor: 'primary', display: 'flex' }}
        elevation={0}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>

            {/* Menu drawer (mobile) */}
            <MenuDrawer />


            {/* Logo & Brand Name */}
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

            {/* Main navbar */}
            <TopNavbar/>

            {/* Checkout drawer */}
            <CartDrawer/>

          </Toolbar>
        </Container>

      </AppBar>
    </Box>
  );
}
