
import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';



export default function BottomNav () {
    const [active, setActive] = useState(0);
  
    // React.useEffect(() => {
    
    // }, []);

    return (
        <Box>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={active}
                    onChange={(event, newActive) => {
                    setActive(newActive);
                    }}
                >
                    {/* Just these three needed (REMOVE THESE 3 FROM MENU DRAWER WHEN WORKING) */}

                    <NavLink to="/explore/all">
                    <BottomNavigationAction  label="Home" icon={<HomeIcon />} /> 
                    </NavLink>

                    <NavLink to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <BottomNavigationAction label="Explore" icon={<SearchIcon />} />
                    </NavLink>

                    <NavLink to="/Profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <BottomNavigationAction label="Profile" icon={<AccountBoxIcon />} /> 
                    </NavLink>

                
                </BottomNavigation>

            </Paper>
      </Box>

    )
}