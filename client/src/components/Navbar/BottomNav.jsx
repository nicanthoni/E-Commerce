import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MailIcon from '@mui/icons-material/Mail';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StoreIcon from '@mui/icons-material/Store';

import { useAuthContext } from '../../hooks/useAuthContext';
import InsightsIcon from '@mui/icons-material/Insights';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from '@mui/material';
import Home from '../../pages/Home/Home';

export default function BottomNav() {
  const { user, type } = useAuthContext();
  const theme = useTheme();

  // Active nav item state
  const [active, setActive] = useState(1);

  // Viewport State
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // mediaQuery hook for mobile/sm size

  return (
    <>
      {/* Only display on mobile view */}
      {isMobile ? (
        // pt on box keeps footer in view on mobile mode
        <Box pt={7}>
          <Paper
            sx={{
              opacity: 0.95,
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'background.paper', // to see the shadow from elevation prop
            }}
            elevation={2}
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
                  component={Link}
                  href='/'
                  label='Home'
                  icon={<HomeIcon sx={{ color: 'white.main' }} />}
                  showLabel
                  sx={{
                    color: 'white.main',
                    '&.Mui-selected': {
                      color: 'white.main',
                    },
                  }}
                />
              )}

              {/* Shop OR Dashboard - buyer or vendor*/}
              {user && type === 'vendor' ? (
                <BottomNavigationAction
                  component={Link}
                  href='/dash'
                  label='Dash'
                  icon={<InsightsIcon sx={{ color: 'white.main' }} />}
                  showLabel
                  sx={{
                    color: 'white.main',
                    '&.Mui-selected': {
                      color: 'white.main',
                    },
                  }}
                />
              ) : (
                <BottomNavigationAction
                  component={Link}
                  href='/explore'
                  label='Shop'
                  icon={<StoreIcon sx={{ color: 'white.main' }} />}
                  showLabel
                  sx={{
                    color: 'white.main',
                    '&.Mui-selected': {
                      color: 'white.main',
                    },
                  }}
                />
              )}

              {/* Sign in - unauthorized user */}
              {!user && (
                <BottomNavigationAction
                  component={Link}
                  href='/signin'
                  label='Sign in'
                  icon={<LoginIcon sx={{ color: 'white.main' }} />}
                  showLabel
                  sx={{
                    color: 'white.main',
                    '&.Mui-selected': {
                      color: 'white.main',
                    },
                  }}
                />
              )}

              {/* Profile - authorized users */}
              {user && (
                <BottomNavigationAction
                  component={Link}
                  href='/profile'
                  label='Profile'
                  icon={<AccountBoxIcon sx={{ color: 'white.main' }} />}
                  showLabel
                  sx={{
                    color: 'white.main',
                    '&.Mui-selected': {
                      color: 'white.main',
                    },
                  }}
                />
              )}

              {/* Inventory - vendor */}
              {user && type === 'vendor' ? (
                <BottomNavigationAction
                  component={Link}
                  href='/inventory'
                  label='Inventory'
                  icon={<InventoryIcon sx={{ color: 'white.main' }} />}
                  showLabel
                  sx={{
                    color: 'white.main',
                    '&.Mui-selected': {
                      color: 'white.main',
                    },
                  }}
                />
              ) : null}

              {/* Upload item -vendor  */}
              {user && type === 'vendor' ? (
                <BottomNavigationAction
                  component={Link}
                  href='/uploaditem'
                  label='Upload'
                  icon={<AddBoxIcon sx={{ color: 'white.main' }} />}
                  showLabel
                  sx={{
                    color: 'white.main',
                    '&.Mui-selected': {
                      color: 'white.main',
                    },
                  }}
                />
              ) : null}

              {/* Inbox - buyer  */}
              {user && type === 'buyer' ? (
                <BottomNavigationAction
                  component={Link}
                  href='/inbox'
                  label='Inbox'
                  icon={<MailIcon sx={{ color: 'white.main' }} />}
                  showLabel
                  sx={{
                    color: 'white.main',
                    '&.Mui-selected': {
                      color: 'white.main',
                    },
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
