import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

// Pages
import Test from "./pages/Test";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

// Layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* <Route index element={<Test />} /> */}
      <Route path="test" element={<Test />} />
      <Route path="home" element={<Home />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
