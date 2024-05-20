import { Typography, AppBar, Box, Toolbar, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LogoDevIcon from '@mui/icons-material/LogoDev'; // Logo placeholder
import MenuDrawer from './Navigation/MenuDrawer';
import TopNavbar from './Navigation/TopNavbar';
import CartDrawer from './CartDrawer';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Navbar() {
  const { user } = useAuthContext();

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
              {user ? (
                <NavLink
                  to='/explore/all'
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  <LogoDevIcon /> AppName
                </NavLink>
              ) : (
                <NavLink
                  to='/'
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  <LogoDevIcon /> AppName
                </NavLink>
              )}
            </Typography>

            {/* Main navbar */}
            <TopNavbar />

            {/* Checkout drawer */}
            <CartDrawer />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
