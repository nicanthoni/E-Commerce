// RootLayout to hold NavBar, Outlet, and *potentially* Footer component
import Navbar from "../components/Navbar/Navbar";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
    <Container className="root-Container" maxWidth='xl'>
      <Box className="root-Navbar">
        <Navbar />
      </Box>
      <main className="root-Outlet">
        <Outlet />
      </main>
      </Container>
      </>
  );
}
