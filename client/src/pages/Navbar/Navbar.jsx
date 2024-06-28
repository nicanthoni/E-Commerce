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
import LogoDevIcon from '@mui/icons-material/LogoDev';
import NavDrawer from './Drawers/NavDrawer';
import NavDesktop from './Navigation/NavDesktop';
import CartDrawer from './Drawers/CartDrawer';
import { useAuthContext } from '../../hooks/useAuthContext';
import SearchBar from './Search/Search';
import { useLocation } from 'react-router-dom';
import AlertsDrawer from './Drawers/AlertsDrawer';
import { User, Vendor } from '../../graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useLogout } from '../../hooks/useLogout';
import AuthAlert from '../../components/Alerts/Auth/AuthAlert';
import GetStarted from '../../components/Buttons/GetStarted';
import LogoutButton from '../../components/Buttons/Logout';

export default function Navbar() {
  const { user, id, type } = useAuthContext();
  const [buyerName, setBuyerName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const location = useLocation();
  const theme = useTheme();
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

  // if data is available, update name States
  useEffect(() => {
    if (userData && userData.user) {
      const name = userData.user.firstName;
      setBuyerName(name);
      // console.log('username: ', name);
    }
    if (vendorData && vendorData.vendor) {
      const name = vendorData.vendor.vendorName;
      setVendorName(name);
      // console.log('vendor name: ', name);
    }
  }, [userData, vendorData]);

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
    <Box sx={{ display: 'flex', alignContent: 'center' }}>
      <AppBar
        component='nav'
        sx={{ backgroundColor: 'primary', display: 'flex' }}
        elevation={0}
      >
        <Container maxWidth='xl'>
          <Toolbar>
            {/* Navigation drawer - mobile */}
            <NavDrawer />

            {/* Logo & Brand Name */}
            <Typography
              variant='h6'
              component='div'
              sx={{
                flexGrow: 1,
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              {user && type === 'buyer' ? (
                <>
                  <Typography>Hi, {buyerName}</Typography>
                </>
              ) : user && type === 'vendor' ? (
                <>
                  <Typography>Hi, {vendorName}</Typography>
                </>
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
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {/* Non-authenticated users */}
              {!user ? (
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
                // Logout button - authenticated users
                <LogoutButton onClick={handleLogout} />
              )}
            </Box>

            {/* Checkout & Alerts drawers - depending on vendor or not*/}
            {user && type === 'vendor' ? <AlertsDrawer /> : <CartDrawer />}
          </Toolbar>

          {/* SearchBar for mobile screens */}
          {isMobile && isExploreRoute && <SearchBar />}
        </Container>
      </AppBar>
      {/* ⚠️Alerts ⚠️*/}
      <AuthAlert visible={showLogoutAlert} message={alertMessage} />
    </Box>
  );
}
