import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import BottomNav from '../components/Navbar/BottomNav';
import Footer from '../components/Footer/Footer';

export default function RootLayout() {
  return (
    <Box bgcolor='background.default' minHeight='100vh'>
      <Box minHeight='50px'>
        <Navbar />
      </Box>
      <Box minHeight='100vh'>
        <Outlet />
      </Box>
      <Box minHeight='50px'>
        <Footer />
      </Box>
      <Box>
        <BottomNav />
      </Box>
    </Box>
  );
}
