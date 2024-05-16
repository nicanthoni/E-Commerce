import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { Container } from '@mui/material';
import CheckoutMain from '../Checkout/CheckoutDrawer/CheckoutMain';
import LogoDevIcon from '@mui/icons-material/LogoDev'; // Logo placeholder
import LogoutButton from '../../components/Buttons/Logout';
import GetStarted from '../../components/Buttons/GetStarted';
import { useAuthContext } from '../../hooks/useAuthContext';

// Width of menu drawer
const drawerWidth = 285;

export default function Navbar() {
  const { user }  = useAuthContext() //auth context
  const [showCart, setShowCart] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Nav items array
  const navItems = ['Home', 'Explore', 'Support'];

  // Nav item routes
  const routes = {
    Home: '/',
    Explore: '/explore/all',
    Support: '#',
  };

  // Toggle CHECKOUT drawer
  const toggleShowCart = () => {
    setShowCart((prevShowCart) => !prevShowCart); // 
  };

  // Toggle MENU drawer (mobile)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // console.log('Auth Context: ', user);

  // MENU items
  const menuDrawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ bgcolor: 'primary.main' }}>
        <Typography
          variant='h6'
          color='#fff'
          sx={{ my: 2, display: 'inline-block' }}
        >
          <LogoDevIcon />
        </Typography>
      </Box>
      <Divider />
      <List sx={{ display: 'inline-block' }}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <NavLink
                to={routes[item]}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemText primary={item} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
        {/* Conditionally render by auth status */}
        {!user ? (
          <>
            <ListItem key='SignIn' disablePadding>
              <ListItemButton>
                <NavLink
                  to='/signin'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary='Sign In' />
                </NavLink>
              </ListItemButton>
            </ListItem>
            <GetStarted />
          </>
        ) : (
          <>
            <ListItem key='Profile' disablePadding>
              <ListItemButton>
                <NavLink
                  to='/profile'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary='Profile' />
                </NavLink>
              </ListItemButton>
            </ListItem>
            <LogoutButton />
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component='nav'
        sx={{ backgroundColor: 'primary', display: 'flex' }}
        elevation={0}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <IconButton
              className='menu-icon'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ ml: 3, display: { sm: 'none', color: '#fff' } }}
            >
              <MenuIcon />
            </IconButton>
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

            {/* Navbar items - desktop view */}
            <Box
              className='nav-link-Container'
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: '#fff', textTransform: 'none' }}
                >
                  <NavLink
                    to={routes[item]}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {item}
                  </NavLink>
                </Button>
              ))}
              {/* Conditionally render by auth status */}
              {!user ? (
                <>
                  <Button
                    key='Signin'
                    sx={{ color: '#fff', textTransform: 'none' }}
                  >
                    <NavLink
                      to='/signin'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Sign In
                    </NavLink>
                  </Button>
                  <GetStarted />
                </>
              ) : (
                <>
                  <Button
                    key='Profile'
                    sx={{ color: '#fff', textTransform: 'none' }}
                  >
                    <NavLink
                      to='/profile'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Profile
                    </NavLink>
                  </Button>
                  <LogoutButton />
                </>
              )}
            </Box>

            {/* CheckoutMain renders on Cart click */}
            <Box className='cart-icon' sx={{ ml: 3, mr: 4, cursor: 'pointer' }}>
              <Badge
                onClick={toggleShowCart}
                badgeContent={1}
                max={10}
                color='error'
              >
                {/* Color for icon controlled in <CheckoutMain/> */}
                <ShoppingCartIcon />
              </Badge>
            </Box>
            {showCart && <CheckoutMain />}
          </Toolbar>
        </Container>
      </AppBar>

      <nav>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {menuDrawer}
        </Drawer>
      </nav>
    </Box>
  );
}
