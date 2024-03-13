// RootLayout to hold NavBar, Outlet, and *potentially* Footer component

import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";


export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
