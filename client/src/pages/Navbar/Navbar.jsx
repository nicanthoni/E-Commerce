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
import NavDrawer from '../../components/Drawers/NavDrawer';
import CartDrawer from '../../components/Drawers/CartDrawer';
import { useAuthContext } from '../../hooks/useAuthContext';
import SearchBar from '../../components/Search/Search';
import { useLocation } from 'react-router-dom';
import AlertsDrawer from '../../components/Drawers/AlertsDrawer';
import { User, Vendor } from '../../graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useLogout } from '../../hooks/useLogout';
import AuthAlert from '../../components/Alerts/Auth/AuthAlert';
import GetStarted from '../../components/Buttons/GetStarted';
import LogoutButton from '../../components/Buttons/Logout';

export default function Navbar() {
  const { user, id, type } = useAuthContext();
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
      <AppBar
        component='nav'
        sx={{ backgroundColor: 'primary', display: 'flex' }}
        elevation={0}
      >
        <Container maxWidth='xl'>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Navigation drawer - mobile */}
            <Box>
              <NavDrawer />
            </Box>

            {/* SearchBar - desktop view */}
            <Box sx={{ flexGrow: 1 }}>
              {/* SearchBar - desktop view */}
              {!isMobile && isExploreRoute && <SearchBar />}
            </Box>

            {/* MAIN navbar */}
            <Box
              sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
            >
              {!user ? (
                <>
                  {/* Home */}
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

                  {/* Shop */}
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

                  {/* Sign in */}
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

            {/* Checkout & Alerts drawers - right side */}
            <Box>
              {user && type === 'vendor' ? <AlertsDrawer /> : <CartDrawer />}
            </Box>
          </Toolbar>

          {/* SearchBar - mobile view */}
          {isMobile && isExploreRoute && <SearchBar />}
        </Container>
      </AppBar>
      {/* ⚠️Alerts ⚠️*/}
      <AuthAlert visible={showLogoutAlert} message={alertMessage} />
    </Box>
  );
}
