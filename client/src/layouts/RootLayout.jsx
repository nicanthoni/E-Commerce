// RootLayout to hold NavBar, Outlet, and *potentially* Footer component
import Navbar from '../pages/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Auth from '../utils/auth'; // check auth here, vs everywhere else
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const [auth, setAuth] = useState(false);

  // Store auth status as variable
  const isLoggedIn = Auth.loggedIn();

  // Set state on render, & if the value of isLoggedIn changes
  useEffect(() => {
    console.log('Effect triggered');
    if (isLoggedIn) {
      console.log('User logged in');
      setAuth(true);
    } else {
      console.log('User logged out');
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
