import { Paper, InputBase, Stack, IconButton, Typography, AppBar, Box, Toolbar, Container, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import LogoDevIcon from '@mui/icons-material/LogoDev'; // Logo placeholder
import MenuDrawer from '../Navigation/MenuDrawer';
import TopNavbar from '../Navigation/TopNavbar';
import CartDrawer from '../CartDrawer';
import { useAuthContext } from '../../../hooks/useAuthContext';


const SearchBar = (
  <Paper
    component="form"
    sx={{ display: 'flex',  marginY: 2, width: { sm: '100%', md: '50%'} }}
  >
    <InputBase
      sx={{ ml: 2, flex: 1 }}
      placeholder="Search Products"
      inputProps={{ 'aria-label': 'search google maps' }}
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
);


export default function NavWithSearch() {
  const { user } = useAuthContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // mediaQuery hook for mobile size 

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component='nav'
        sx={{ backgroundColor: 'primary', display: 'flex' }}
        elevation={0}
      >
        <Container maxWidth='xl'>
    
            <Toolbar disableGutters>

              {/* Menu drawer */}
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
                    <LogoDevIcon sx={{ }}/> E-Commerce
                  </NavLink> 
                ) : (
                  <NavLink
                    to='/'
                    style={{ textDecoration: 'none', color: '#fff' }}
                  >
                    <LogoDevIcon /> E-Commerce
                  </NavLink>
                )}
              </Typography>

              {/* SearchBar for non-mobile screens */}
              {!isMobile && SearchBar}

              {/* Main navbar */}
              <TopNavbar />

              {/* Checkout drawer */}
              <CartDrawer />


            </Toolbar>

            {/* SearchBar for mobile screens */}
            {isMobile && SearchBar}

         
        </Container>
      </AppBar>
    </Box>
  );
}
