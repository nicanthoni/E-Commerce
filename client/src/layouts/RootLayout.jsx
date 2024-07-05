import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import BottomNav from '../components/Navbar/BottomNav';

// add 'isMobile' breakpoint?

export default function RootLayout() {
  return (
    <Box bgcolor='background.main' minHeight='100vh' paddingBottom={8}>
      <Navbar />
      <Outlet />
      <BottomNav />
    </Box>
  );
}
