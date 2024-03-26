// RootLayout to hold NavBar, Outlet, and *potentially* Footer component
import Navbar from "../components/Navbar/Navbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Box className="root-Navbar">
        <Navbar />
      </Box>
      <Outlet />
    </>
  );
}
