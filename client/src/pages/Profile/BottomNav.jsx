import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MailIcon from '@mui/icons-material/Mail';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StoreIcon from '@mui/icons-material/Store';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import InsightsIcon from '@mui/icons-material/Insights';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Home from '../Home/Home';

export default function BottomNav() {
  const { user, type } = useAuthContext();
  const theme = useTheme();

  // Active nav item state
  const [active, setActive] = useState(1);

  // Viewport State
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // mediaQuery hook for mobile/sm size

  return (
    <>
      {/* Only display component on mobile view */}
      {isMobile ? (
        <Box>
          <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={0}
          >
            <BottomNavigation
              sx={{ bgcolor: 'primary.main' }}
              value={active} 
              onChange={(event, newActive) => {
                setActive(newActive);
              }}
            >
              {/* Home - unauthorized user */}
              {!user && (
                <BottomNavigationAction
                  component={NavLink}
                  to='/'
                  label='Home'
                  icon={<HomeIcon sx={{ color: '#fff' }} />}
                  showLabel
                  sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              )}

              {/* Shop OR Dashboard - buyer or vendor*/}
              {user && type === 'vendor' ? (
                <BottomNavigationAction
                  component={NavLink}
                  to='/dash'
                  label='Dash'
                  icon={<InsightsIcon sx={{ color: '#fff' }} />}
                  showLabel
                  sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              ) : (
                <BottomNavigationAction
                  component={NavLink}
                  to='/explore'
                  label='Shop'
                  icon={<StoreIcon sx={{ color: '#fff' }} />}
                  showLabel
                  sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              )}

              {/* Sign in - unauthorized user */}
              {!user && (
                <BottomNavigationAction
                  component={NavLink}
                  to='/signin'
                  label='Sign in'
                  icon={<LoginIcon sx={{ color: '#fff' }} />}
                  showLabel
                  sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              )}

              {/* Profile - authorized users */}
              {user && (
                <BottomNavigationAction
                  component={NavLink}
                  to='/profile'
                  label='Profile'
                  icon={<AccountBoxIcon sx={{ color: '#fff' }} />}
                  showLabel
                  sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              )}

              {/* Inventory - vendor */}
              {user && type === 'vendor' ? (
                <BottomNavigationAction
                  component={NavLink}
                  to='/inventory'
                  label='Inventory'
                  icon={<InventoryIcon sx={{ color: '#fff' }} />}
                  showLabel
                  sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              ) : null}

              {/* Upload item -vendor  */}
              {user && type === 'vendor' ? (
                <BottomNavigationAction
                  component={NavLink}
                  to='/uploaditem'
                  label='Upload'
                  icon={<AddBoxIcon sx={{ color: '#fff' }} />}
                  showLabel
                  sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              ) : null}

              {/* Wishlist - buyer  */}
              {user && type === 'buyer' ? (
                <BottomNavigationAction
                  component={NavLink}
                  to='/wishlist'
                  label='Wishlist'
                  icon={<FavoriteIcon sx={{ color: '#fff' }} />}
                  showLabel
                  sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              ) : null}


            </BottomNavigation>
          </Paper>
        </Box>
      ) : null}
    </>
  );
}
