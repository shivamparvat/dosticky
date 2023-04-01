import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Profile from "./pages/Profile/Profile";
import Product from "./pages/Product/Product";
import Checkout from "./pages/Checkout/Checkout";
import AllCategoryPro from "./pages/Category/AllCategoryPro";
import Singup from "./pages/Auth/Singup";
import Login from "./pages/Auth/Login";
import RecoveryPass from "./pages/Auth/RecoveryPass";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user";
import { useDispatch } from "react-redux";
import Categorypage from "./pages/Category/Category";
import Dashboard from "./pages/dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/category" element={<Categorypage />} />
      <Route path="/category/all" element={<AllCategoryPro />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/singup" element={<Singup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recovery" element={<RecoveryPass />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
