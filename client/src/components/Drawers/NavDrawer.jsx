import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import LogoutButton from '../Buttons/Logout';
import GetStarted from '../Buttons/GetStarted';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import AuthAlert from '../Alerts/Auth/AuthAlert';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InventoryIcon from '@mui/icons-material/Inventory';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LoginIcon from '@mui/icons-material/Login';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StoreIcon from '@mui/icons-material/Store';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar } from '@mui/material';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import MenuIcon from '@mui/icons-material/Menu';
import WidgetsIcon from '@mui/icons-material/Widgets';

export default function NavDrawer() {
  const { logout } = useLogout();
  const { user, type } = useAuthContext();
  const theme = useTheme();

  // Viewport State
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // mediaQuery hook for mobile size

  // Mobile Drawer State
  const [mobileOpen, setMobileOpen] = useState(false);

  // Alert States
  const [alertMessage, setAlertMessage] = useState('');
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  // Toggle drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Close drawer when any nav button clicked
  const closeDrawer = () => {
    setMobileOpen(false);
  };

  // OnClick - handle logout
  const handleLogout = async () => {
    try {
      await logout(); // call logout hook
      setAlertMessage('Logout successful.');
      setShowLogoutAlert(true); // show alert via parent component
      setTimeout(() => {
        // hide alert after delay
        setShowLogoutAlert(false);
      }, 1000);
    } catch (e) {
      console.log('Logout error: ', e);
    }
  };

  const menuDrawer = (
    <Box sx={{ textAlign: 'center' }}>
      {/* User Avatar or Logo */}
      <Box sx={{ bgcolor: 'primary.main' }}>
        <Typography
          variant='h6'
          color='#fff'
          sx={{ my: 1.4, display: 'inline-block' }}
        >
          {user ? (
            <Avatar
              alt='users avatar'
              sizes='sm'
              sx={{ bgcolor: '#fff', color: 'primary.main' }}
            />
          ) : (
            <LogoDevIcon />
          )}
        </Typography>
      </Box>

      {/* DRAWER ITEMS */}
      <List sx={{ display: 'inline-block' }}>
        {/* HOME - buyer */}
        {user && type === 'vendor' ? null : user && type === 'buyer' ? (
          <ListItem key='Shop' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <StoreIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink
                to='/explore'
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText primary='Shop' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ) : (
          // HOME - non-authorized users
          <ListItem key='Home' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <HomeIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink to='/' style={{ textDecoration: 'none', color: '#fff' }}>
                <ListItemText primary='Home' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        )}

        {/* DASHBOARD - vendor */}
        {user && type === 'vendor' ? (
          <ListItem key='Dashboard' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <InsightsIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink
                to='/dash'
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText primary='Dashboard' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ) : null}

        {/* EXPLORE - non-authorized users */}
        {user ? null : (
          <ListItem key='Explore' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <StoreIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink
                to='/explore'
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText primary='Explore' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        )}

        {/* PROFILE - authorized users */}
        {!user ? null : (
          <ListItem key='Profile' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <AccountBoxIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink
                to='/profile'
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText primary='Profile' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        )}

        {/* INVENTORY - vendor */}
        {user && type === 'vendor' ? (
          <ListItem key='Inventory' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <InventoryIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink
                to='/inventory'
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText primary='Inventory' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ) : null}

        {/* UPLOAD - vendor */}
        {user && type === 'vendor' ? (
          <ListItem key='Upload' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <AddBoxIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink
                to='/uploaditem'
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText primary='Upload item' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ) : null}

        {/* WISHLIST - buyer */}
        {user && type === 'buyer' ? (
          <ListItem key='Dashboard' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <FavoriteIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink
                to='/wishlist'
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText primary='Wishlist' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ) : null}

        {/* INBOX - authorized users */}
        {!user ? null : (
          <ListItem key='Inbox' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <MailIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink
                to='/inbox'
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText primary='Inbox' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        )}

        {/* SUPPORT - authorized users */}
        {!user ? null : (
          <ListItem key='Support' disablePadding>
            <ListItemButton onClick={closeDrawer}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <ContactSupportIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <NavLink
                to='/support'
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <ListItemText primary='Support' />
              </NavLink>
            </ListItemButton>
          </ListItem>
        )}

        {/* LOGOUT button  */}
        {user && isMobile ? (
          <>
            <Divider sx={{ marginBottom: 2 }} />
            <Box onClick={closeDrawer}>
              <LogoutButton onClick={handleLogout} />
            </Box>
          </>
        ) : null}
        <>
          {/* SIGN IN */}
          {!user && (
            <>
              <ListItem key='SignIn' disablePadding>
                <ListItemButton onClick={closeDrawer}>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <LoginIcon sx={{ color: '#fff' }} />
                  </ListItemIcon>
                  <NavLink
                    to='/signin'
                    style={{ textDecoration: 'none', color: '#fff' }}
                  >
                    <ListItemText primary='Sign In' />
                  </NavLink>
                </ListItemButton>
              </ListItem>

              <Divider sx={{ marginBottom: 2 }} />
              <GetStarted />
            </>
          )}
        </>
      </List>
    </Box>
  );

  // MENU DRAWER
  return (
    <>
      <IconButton
        className='menu-icon'
        aria-label='open drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ display: { color: '#fff' } }}
      >
        <WidgetsIcon />
      </IconButton>

      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 285,
            bgcolor: 'primary.main',
          },
        }}
      >
        {menuDrawer}
      </Drawer>

      {/* Alerts */}
      <AuthAlert visible={showLogoutAlert} message={alertMessage} />
    </>
  );
}
