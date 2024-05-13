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
      // Backup secondary colors:
      // #BDE9B3 - #FACFCE - #54BFA1 - #F28D77 - #F2A391
      main: "#F2A391",
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
import Checkout from "./pages/Buyer/Checkout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import VendorAccount from "./pages/Vendor/VendorAccount";
import VendorAddItem from "./pages/Vendor/AddItem" // Just to test adding a new item
import LoginType from "./pages/LoginType"; // Account type to log in to
import AccountType from "./pages/AccountType"; // Account type to sign up for
import Profile from "./pages/ProfileType";

// Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<AccountType />} /> 
      <Route path="/signin" element={<LoginType />} />
      <Route path="/signup/:userType" element={<Signup />} />
      <Route path="/signin/:userType" element={<Signin />} />
      <Route path="/profile" element={< Profile />} />
      <Route path="/profile/vendor/:vendorId" element={<VendorAccount />} />
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