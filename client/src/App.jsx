import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import '../src/assets/global.css';

// Context
import { ThemeContextProvider } from './contexts/ThemeContext.jsx';

// Layouts
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home/Home.jsx';
import Explore from './pages/Explore/Explore.jsx';
import Support from './pages/Support/Support.jsx';
import SingleProduct from './pages/Explore/Product/SingleProduct.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import Inbox from './pages/Profile/Inbox/Inbox.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Signin from './pages/Signin/Signin.jsx';
import LoginType from './pages/Signin/LoginType.jsx'; // Account type - LOGIN
import AccountType from './pages/Signup/AccountType.jsx'; // Account type - SIGNUP
import Profile from './pages/Profile/ProfileType.jsx';
import UserWishlist from './pages/Profile/Buyer/Wishlist.jsx';
import ErrorPage from './pages/ErrorPage';
import UploadItem from './pages/Profile/Vendor/UploadItem.jsx';
import Inventory from './pages/Profile/Vendor/Inventory.jsx';
import VendorDashboard from './pages/Profile/Vendor/PerformanceData/VendorDashboard.jsx';

// Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      {/* <Route path='/test' element={<Test/>} /> */}
      <Route path='/dash' element={<VendorDashboard />} />
      <Route path='/home' element={<Home />} />
      <Route path='/support' element={<Support />} />
      <Route path='/signup' element={<AccountType />} />
      <Route path='/signin' element={<LoginType />} />
      <Route path='/signup/:userType' element={<Signup />} />
      <Route path='/signin/:userType' element={<Signin />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/explore/:category' element={<Explore />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/product/:itemId' element={<SingleProduct />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/inbox' element={<Inbox />} />
      <Route path='/uploaditem' element={<UploadItem />} />
      <Route path='/inventory' element={<Inventory />} />
      <Route path='/wishlist' element={<UserWishlist />} />
      <Route path='*' element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
}

export default App;
