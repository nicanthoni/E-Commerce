import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import "./index.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";


// Custom Theme - Colors & Font
const theme = createTheme({
  palette: {
    primary: {
      main: "#024959",
    },
    secondary: {
      main: "#FACFCE",
    },
  },
  typography: {
    fontFamily: 'muli, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  }
});

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SingleProductView from "./pages/SingleProductView";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VendorAddItem from "./pages/Vendor/AddItem"
import AccountType from "./pages/AccountType";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/accounttype" element={<AccountType/>} />
      <Route path="/signup/:userType" element={<Signup />} />
      <Route path="/signin/:userType" element={<Signin />} />
      <Route path="/explore/:category" element={<Explore />} />
      <Route path="/explore/all" element={<Explore />} />
      <Route path="/product/:productId" element={<SingleProductView />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/additem" element={<VendorAddItem />} />
    </Route>
  )
);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;