import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import BottomNav from '../components/Navbar/BottomNav';

export default function RootLayout() {
  const { user } = useAuthContext();

  return (
    <>
      <Navbar />
      <Outlet />
      <BottomNav />
    </>
  );
}
