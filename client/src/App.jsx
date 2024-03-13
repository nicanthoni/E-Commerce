import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

// Custom Theme - Colors, Fonts, etc go here for global use/overriding default values
const theme = createTheme({
  palette: {
    primary: {
      main: "#A6A6A6",
    },
    secondary: {
      main: "#595959",
    },
    third: {
      main: "#262626",
    },
    fourth: {
      main: "#0D0D0D",
    },
  },
});

// Layouts
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/explore/:category" element={<Explore />} />
      <Route path="/explore/all" element={<Explore />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
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
