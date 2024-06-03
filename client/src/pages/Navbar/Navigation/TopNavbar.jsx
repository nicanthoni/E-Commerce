import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../../components/Buttons/Logout';
import GetStarted from '../../../components/Buttons/GetStarted';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function MainNav() {
  const { user, type } = useAuthContext();

  return (
    <>
      {/* DESKTOP/MAIN NAVBAR */}
      <Box
        className='nav-link-Container'
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >


        {/* HOME */}
        {user && type ==='vendor' ? (
          null
        ) : user && type==='buyer' ? (
        <Button key='Home' sx={{ color: '#fff', textTransform: 'none' }}>
            <NavLink
              to='/explore'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Home
            </NavLink>
        </Button>
        ) : (
          <Button key='Home' sx={{ color: '#fff', textTransform: 'none' }}>
          <NavLink
              to='/'
              style={{ textDecoration: 'none', color: 'inherit' }}
              >
              Home
              </NavLink>
          </Button>
        )}


        {/* DASHBOARD */}
        {user && type ==='vendor' ? (
          <Button key='Dashboard' sx={{ color: '#fff', textTransform: 'none' }}>
          <NavLink
            to='/dash'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Dashboard
          </NavLink>
        </Button>
        ) : (null)}


        {/* EXPLORE */}
        {user ? null : (
          <Button key='Explore' sx={{ color: '#fff', textTransform: 'none' }}>
            <NavLink
              to='/explore'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Explore
            </NavLink>
          </Button>
        )}


        {/* PROFILE or SIGN IN */}
        {user ? (
          <>
            <Button key='Profile' sx={{ color: '#fff', textTransform: 'none' }}>
              <NavLink
                to='/profile'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Profile
              </NavLink>
            </Button>
            {/* <LogoutButton /> */}
          </>
        ) : (
          <>
            <Button key='Signin' sx={{ color: '#fff', textTransform: 'none' }}>
              <NavLink
                to='/signin'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Sign In
              </NavLink>
            </Button>
            <GetStarted />
          </>
        )}


        {/* INBOX */}
        {user ? (
          <Button key='Inbox' sx={{ color: '#fff', textTransform: 'none' }}>
            <NavLink
              to='/inbox'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Inbox
            </NavLink>
          </Button>
        ) : null}


        {/* SUPPORT */}
        {user ? (
          <Button key='Support' sx={{ color: '#fff', textTransform: 'none' }}>
            <NavLink
              to='/support'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Support
            </NavLink>
          </Button>
        ) : null}


      {/* LOGOUT */}
      {user ? <LogoutButton /> : null}


      </Box>
    </>
  );
}
