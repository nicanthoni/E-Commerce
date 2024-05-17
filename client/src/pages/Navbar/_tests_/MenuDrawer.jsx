import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'; 
import MenuIcon from '@mui/icons-material/Menu'; 
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import LogoDevIcon from '@mui/icons-material/LogoDev'; 
import LogoutButton from '../../../components/Buttons/Logout';
import GetStarted from '../../../components/Buttons/GetStarted';
import { useAuthContext } from '../../../hooks/useAuthContext';

// Width of menu drawer
const drawerWidth = 285;

export default function MenuDrawer () {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user } = useAuthContext();

    // Toggle drawer 
    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
      
    };

    // onClick - close drawer
    const closeDrawer = () => {
      setMobileOpen(false);
    };

    const menuDrawer = (
        <Box sx={{ textAlign: 'center' }}>

            {/* Logo */}
            <Box sx={{ bgcolor: 'primary.main' }}>
                <Typography
                    variant='h6'
                    color='#fff'
                    sx={{ my: 2, display: 'inline-block' }}
                >
                    <LogoDevIcon />
                </Typography>
            </Box>


            <Divider />


            {/* DRAWER ITEMS */}
            <List sx={{ display: 'inline-block' }}> 
            
                {/* HOME */}
                <ListItem key='Home' disablePadding>
                    <ListItemButton onClick={closeDrawer}>
                        <NavLink
                            to='/'
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ListItemText primary='Home' />
                        </NavLink>
                    </ListItemButton>
                </ListItem>

                {/* EXPLORE */}
                <ListItem key='Explore' disablePadding>
                    <ListItemButton onClick={closeDrawer}>
                        <NavLink
                            to='/explore/all'
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ListItemText primary='Explore' />
                        </NavLink>
                    </ListItemButton>
                </ListItem>

                {/* EXPLORE */}
                <ListItem key='Support' disablePadding>
                    <ListItemButton onClick={closeDrawer}>
                        <NavLink
                            to='/support'
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ListItemText primary='Support' />
                        </NavLink>
                    </ListItemButton>
                </ListItem>

                {/* Conditionally render by users auth status */}

            {user ? (
                <>
                  {/* PROFILE */}
                  <ListItem key='Profile' disablePadding>
                        <ListItemButton onClick={closeDrawer}>
                            <NavLink
                                to='/profile'
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <ListItemText primary='Profile' />
                            </NavLink>
                        </ListItemButton>
                    </ListItem>
                  <Box onClick={closeDrawer}> 
                        <LogoutButton  />
                  </Box>

                </>
            ) : (
                <>
                {/* SIGN IN */}
                <ListItem key='SignIn' disablePadding>
                        <ListItemButton onClick={closeDrawer}>
                            <NavLink
                                to='/signin'
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <ListItemText primary='Sign In' />
                            </NavLink>
                        </ListItemButton>
                    </ListItem>
                    <GetStarted />
                </>
            )}

            </List>

        </Box>
    );

    return (
        <>
            {/* Moved IconButton outside Drawer */}
            <IconButton
                className='menu-icon'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ ml: 3, display: { sm: 'none', color: '#fff' } }}
            >
                <MenuIcon />
            </IconButton>
            {/* Drawer component */}
            <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                {menuDrawer}
            </Drawer>
        </>
    );
}
