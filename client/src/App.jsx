import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import '../src/assets/global.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

// Custom Theme - Colors & Font
const theme = createTheme({
  palette: {
    primary: {
      main: '#024959',
    },
    secondary: {
      // Backup secondary colors:
      // #BDE9B3 - #FACFCE - #54BFA1 - #F28D77 - #F2A391
      main: '#F2A391',
    },
  },
  typography: {
    fontFamily: 'muli, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

// Layouts
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home/Home.jsx';
import Explore from './pages/Explore/Explore.jsx';
import MainSupport from './pages/Support/MainSupport.jsx';
import SingleProduct from './pages/Explore/Product/SingleProduct.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import Inbox from './pages/Profile/Inbox/Inbox.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Signin from './pages/Signin/Signin.jsx';
import LoginType from './pages/Signin/LoginType.jsx'; // Account type - LOGIN
import AccountType from './pages/Signup/AccountType.jsx'; // Account type - SIGNUP
import Profile from './pages/Profile/ProfileType.jsx';
import ErrorPage from './pages/ErrorPage';

// Testing
import VendorAddItem from './pages/Profile/Vendor/_tests_/AddItem.jsx';
import VendorDashboard from './pages/Profile/Vendor/PerformanceData/VendorDashboard.jsx';

// Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      {/* <Route path='/test' element={<Test/>} /> */}
      <Route path='/dash' element={<VendorDashboard />} />
      <Route path='/home' element={<Home />} />
      <Route path='/support' element={<MainSupport />} />
      <Route path='/signup' element={<AccountType />} />
      <Route path='/signin' element={<LoginType />} />
      <Route path='/signup/:userType' element={<Signup />} />
      <Route path='/signin/:userType' element={<Signin />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/explore/:category' element={<Explore />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/product/:productId' element={<SingleProduct />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/inbox' element={<Inbox />} />
      <Route path='/additem' element={<VendorAddItem />} />
      <Route path='*' element={<ErrorPage />} />
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
