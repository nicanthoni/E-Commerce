import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

// Pages
import Test from "./pages/Test";

// Layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* <Route index element={<Test />} /> */}
      <Route path="test" element={<Test />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;