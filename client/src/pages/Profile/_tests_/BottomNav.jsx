
import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';



export default function BottomNav () {
    
    const [active, setActive] = useState(0);
  

    return (
        <Box>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

                <BottomNavigation
                    value={active}
                    onChange={(event, newActive) => {
                    setActive(newActive);
                    }}
                >
                    {/* Just these three needed (REMOVE THESE 3 FROM MENU DRAWER WHEN WORKING) */}

                    {/* Home (explore)  */}
                    <NavLink to="/explore/all">
                    <BottomNavigationAction showLabel label="Home" icon={<HomeIcon />} /> 
                    </NavLink>

                    {/* Profile */}
                    <NavLink to="/Profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <BottomNavigationAction showLabel label="Profile" icon={<AccountBoxIcon />} /> 
                    </NavLink>

                    {/* Cart */}
                    <NavLink to="/checkout" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <BottomNavigationAction showLabel label="Checkout" icon={<ShoppingCartIcon />} />
                    </NavLink>
                
                </BottomNavigation>
            </Paper>
      </Box>

    )
}