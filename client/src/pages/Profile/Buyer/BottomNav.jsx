import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function BottomNav() {
  const { user } = useAuthContext();
  const [active, setActive] = useState(1);

  return (
    <Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={active}
          onChange={(event, newActive) => {
            setActive(newActive);
          }}
        >
          {/* Home (explore)  */}
          <BottomNavigationAction
            component={NavLink}
            to='/explore'
            label='Home'
            icon={<HomeIcon />}
            showLabel
          />

          {/* Profile */}
          <BottomNavigationAction
            component={NavLink}
            to='/profile'
            label='Profile'
            icon={<AccountBoxIcon />}
            showLabel
          />

          {/* Cart */}

          <BottomNavigationAction
            component={NavLink}
            to='/checkout'
            label='Checkout'
            icon={<ShoppingCartIcon />}
            showLabel
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}