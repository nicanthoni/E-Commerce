import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

// Layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="explore" element={<Explore />} />
      <Route path="product" element={<Product />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
