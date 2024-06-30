import Navbar from '../pages/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import BottomNav from '../pages/Profile/BottomNav';
import PermNavDrawer from '../pages/Navbar/Drawers/PermNavDrawer';


export default function RootLayout() {
  const { user } = useAuthContext();

  return (
    <>
      <Navbar />
      {/* <PermNavDrawer/> */}
      <Outlet />
      <BottomNav />
    </>
  );
}
