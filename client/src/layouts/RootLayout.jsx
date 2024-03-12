// RootLayout to hold NavBar, Outlet, and Footer components

import { Typography, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Typography>Navbar Component</Typography>
      <main>
        <Outlet />
      </main>
      <Typography>Footer</Typography>
    </>
  );
}
