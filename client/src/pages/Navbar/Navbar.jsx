import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import LogoDevIcon from '@mui/icons-material/LogoDev'; 
import MenuDrawer from './Navigation/MenuDrawer';
import TopNavbar from './Navigation/TopNavbar';
import CartDrawer from './CartDrawer';
import { useAuthContext } from '../../hooks/useAuthContext';
import SearchBar from './Search/Search'; 
import { useLocation } from 'react-router-dom';



export default function Navbar() {

  const { user } = useAuthContext(); // auth 

  const location = useLocation();
  const isExploreRoute = location.pathname === '/explore'; // Check if current path is '/explore'

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // mediaQuery for medium size or less

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component='nav'
        sx={{ backgroundColor: 'primary', display: 'flex' }}
        elevation={0}
      >
        <Container maxWidth='xl'>

          <Toolbar>
            
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
                  to='/explore'
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  <LogoDevIcon />
                </NavLink>
              ) : (
                <NavLink
                  to='/'
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  <LogoDevIcon />
                </NavLink>
              )}
            </Typography>


            {/* SearchBar for larger screens */}
            {!isMobile && isExploreRoute && <SearchBar />}


            {/* Main navbar */}
            <TopNavbar />


            {/* Checkout drawer */}
            <CartDrawer />
          </Toolbar>

          {/* SearchBar for mobile screens */}
          {isMobile && isExploreRoute && <SearchBar />}

        </Container>
      </AppBar>
    </Box>
  );
}
