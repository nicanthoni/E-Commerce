import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function BottomNav() {
  const { user } = useAuthContext();
  const [active, setActive] = useState(1);

  // console.log('user: ', user.Userlogin) // buyer
  // console.log('vendor: ', user.Vendorlogin) // vendor

  const isBuyer = user.Userlogin
  const isVendor = user.Vendorlogin

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

          {/* Cart / Inbox - render depending on user type */}
          {isBuyer ? ( 
          <BottomNavigationAction
            component={NavLink}
            to='/checkout'
            label='Checkout'
            icon={<ShoppingCartIcon />}
            showLabel
          />
        ) : (
          <BottomNavigationAction
            component={NavLink}
            to='/inbox'
            label='Inbox'
            icon={<MailIcon />}
            showLabel
          />
        )}

        </BottomNavigation>
      </Paper>
    </Box>
  );
}
