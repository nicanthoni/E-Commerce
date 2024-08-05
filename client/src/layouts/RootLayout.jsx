import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import BottomNav from '../components/Navbar/BottomNav';
import Footer from '../components/Footer/Footer';

export default function RootLayout() {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      minHeight="100vh" 
      bgcolor="background.default"
    >
      <Navbar />
      <Box flex="1">
        <Outlet />
      </Box>
      <Footer />
      <BottomNav />
    </Box>
  );
}
