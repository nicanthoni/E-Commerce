// RootLayout.jsx
import { Typography, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
<>
      <main>
        <Outlet />
      </main>
</>
  );
}
