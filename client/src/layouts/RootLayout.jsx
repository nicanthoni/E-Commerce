import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import BottomNav from '../components/Navbar/BottomNav';
import Footer from '../components/Footer/Footer';

export default function RootLayout() {
  return (
    <Box bgcolor='background.default' minHeight='100vh' paddingBottom={8}>
      <Navbar />
      <Outlet />
      <Footer/>
      <BottomNav />
    </Box>
  );
}
