import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Container,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import NavDrawer from '../Drawers/NavDrawer';
import SearchBar from '../Search/Search';
import CartDrawer from '../Drawers/CartDrawer';
import AlertsDrawer from '../Drawers/AlertsDrawer';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';
import { User, Vendor } from '../../graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useLogout } from '../../hooks/useLogout';
import AuthAlert from '../Alerts/Auth/AuthAlert';
import GetStarted from '../Buttons/GetStarted';
import LogoutButton from '../Buttons/Logout';
import CategorySelection from '../Filters/Categories';

export default function Navbar() {
  // Contexts
  const { user, id, type } = useAuthContext();

  //
  const location = useLocation();
  const theme = useTheme();

  // Booleans
  const isExploreRoute = location.pathname === '/explore'; // Check if current path is '/explore'
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // mediaQuery for medium size or less

  // Hooks
  const { logout } = useLogout();

  // Alert States
  const [alertMessage, setAlertMessage] = useState('');
  const [showLogoutAlert, setShowLogoutAlert] = useState(false); // manage logout alert visibility

  // Query for buyers name
  const [
    loadBuyer,
    { loading: userLoading, error: userError, data: userData },
  ] = useLazyQuery(User, { variables: { userId: id } });

  // Query for vendors name
  const [
    loadVendor,
    { loading: vendorLoading, error: vendorError, data: vendorData },
  ] = useLazyQuery(Vendor, { variables: { vendorId: id } });

  // If buyer, loadBuyer - If vendor, loadVendor
  useEffect(() => {
    if (type === 'buyer') {
      loadBuyer();
    }
    if (type === 'vendor') {
      loadVendor();
    }
  }, [user, type, loadBuyer, loadVendor]);

  // OnClick - handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setAlertMessage('Logout successful.');
      setShowLogoutAlert(true);
      setTimeout(() => {
        setShowLogoutAlert(false);
      }, 1000);
    } catch (e) {
      console.log('Logout error: ', e);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav' sx={{ backgroundColor: 'primary' }} elevation={2}>
        <Container maxWidth='xl'>
          <Toolbar>
            {/*  LEFT - Nav Drawer & Greetings*/}
            <Box display='flex' justifyContent='flex-start'>
              <NavDrawer />
              {user && userData && type === 'buyer' && (
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    marginLeft: 1,
                  }}
                >
                  <Typography>Hi, {userData.user.firstName}</Typography>
                </Box>
              )}
              {user && vendorData && type === 'vendor' && (
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    marginLeft: 1,
                  }}
                >
                  <Typography>Hi, {vendorData.vendor.vendorName}</Typography>
                </Box>
              )}
              {!user && (
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    marginLeft: 1,
                  }}
                >
                  <Typography fontWeight='bolder'> AppName</Typography>
                </Box>
              )}
            </Box>

            {/* CENTER */}
            <Box display='flex' justifyContent='flex-end' sx={{ flexGrow: 1 }}>
              {!isMobile && isExploreRoute && <SearchBar />}
            </Box>

            {/* RIGHT */}
            <Box
              sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
            >
              {!user ? (
                // unauthenticated - Home, Shop, & Signin
                <>
                  <Button
                    key='Home'
                    sx={{ color: '#fff', textTransform: 'none' }}
                  >
                    <NavLink
                      to='/'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Home
                    </NavLink>
                  </Button>
                  <Button
                    key='Explore'
                    sx={{ color: '#fff', textTransform: 'none' }}
                  >
                    <NavLink
                      to='/explore'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Shop
                    </NavLink>
                  </Button>
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
                // authenticated users - Shop, Profile, & Logout
                <>
                  {user && type === 'buyer' && (
                    <Button
                      key='Explore'
                      sx={{ color: '#fff', textTransform: 'none' }}
                    >
                      <NavLink
                        to='/explore'
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        Shop
                      </NavLink>
                    </Button>
                  )}
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

                  <LogoutButton onClick={handleLogout} />
                </>
              )}
            </Box>

            {/* Checkout/Alerts drawers  */}
            <Box>
              {user && type === 'vendor' ? <AlertsDrawer /> : <CartDrawer />}
            </Box>
          </Toolbar>

          {/* CENTER - mobile view */}
          {isMobile && isExploreRoute && <SearchBar />}

          {/* Category selection - product filter */}
          {isExploreRoute && <CategorySelection />}
        </Container>
      </AppBar>
      {/* ⚠️Alerts ⚠️*/}
      <AuthAlert visible={showLogoutAlert} message={alertMessage} />
    </Box>
  );
}
