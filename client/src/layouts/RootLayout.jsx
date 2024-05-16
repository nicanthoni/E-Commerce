import Navbar from '../pages/Navbar/Navbar';
import { Outlet } from 'react-router-dom';


export default function RootLayout() {

  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
}
