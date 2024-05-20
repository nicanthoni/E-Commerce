import Navbar from '../pages/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import BottomNav from '../pages/Profile/_tests_/BottomNav';


export default function RootLayout() {
const { user } = useAuthContext();

  return (
    <>
      <Navbar/>
      <Outlet />
      {/* {user &&
        <BottomNav/>
      } */}
    </>
  );
}
