import Navbar from '../pages/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Auth from '../utils/auth'; 
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'; // custom auth hook


export default function RootLayout() {
  const { user }  = useAuthContext() //auth context
  const [auth, setAuth] = useState(false);

  // Store auth status as variable
  const isLoggedIn = Auth.loggedIn();

  // Set state on render, & if the value of isLoggedIn changes
  useEffect(() => {
    console.log('RootLayout Effect() triggered');
    if (isLoggedIn) {
      console.log('User loggedIn');
      setAuth(true);
    } else {
      console.log('User loggedOut');
      setAuth(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar isAuthenticated={auth} />
      <Outlet />
    </>
  );
}
