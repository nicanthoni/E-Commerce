import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MailIcon from '@mui/icons-material/Mail';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import InsightsIcon from '@mui/icons-material/Insights';


export default function BottomNav() {
  const { user, type } = useAuthContext()
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

          {/* Home OR Dashboard (buyer vs vendor)*/}
          {user && type === 'vendor' ? (
          <BottomNavigationAction
            component={NavLink}
            to='/dash'
            label='Dashboard'
            icon={<InsightsIcon />}
            showLabel
          />
          ) : (
          <BottomNavigationAction
            component={NavLink}
            to='/explore'
            label='Home'
            icon={<HomeIcon />}
            showLabel
          />
          )}

          
          {/* Profile */}
          <BottomNavigationAction
            component={NavLink}
            to='/profile'
            label='Profile'
            icon={<AccountBoxIcon />}
            showLabel
          />

          {/* Inbox */}
          <BottomNavigationAction
            component={NavLink}
            to='/inbox'
            label='Inbox'
            icon={<MailIcon />}
            showLabel
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
