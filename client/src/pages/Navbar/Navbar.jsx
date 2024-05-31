import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Auth from '../../utils/auth';
import { NavLink } from 'react-router-dom';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import MenuDrawer from './Navigation/MenuDrawer';
import TopNavbar from './Navigation/TopNavbar';
import CartDrawer from './Drawers/CartDrawer';
import { useAuthContext } from '../../hooks/useAuthContext';
import SearchBar from './Search/Search';
import { useLocation } from 'react-router-dom';
import AlertsDrawer from './Drawers/AlertsDrawer';



export default function Navbar() {
  const { user } = useAuthContext();
  let userType = null; 
  const location = useLocation();
  const isExploreRoute = location.pathname === '/explore'; // Check if current path is '/explore'

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // mediaQuery for medium size or less

  // check & set userType (buyer or vendor)
  if (user) {
    userType = Auth.getProfile().data.userType;
  }

  return (
    <Box sx={{ display: 'flex', alignContent: 'center',}}>
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
                  <LogoDevIcon  />
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

            {/* Checkout & Alerts drawers - depending on vendor or not*/}
            {user && userType === 'vendor' ? <AlertsDrawer /> : <CartDrawer />}
          </Toolbar>

          {/* SearchBar for mobile screens */}
          {isMobile && isExploreRoute && <SearchBar />}
        </Container>
      </AppBar>
    </Box>
  );
}
