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
import ProfileLayout from "./pages/Profile/ProfileLayout";
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
import Paymentsuccess from "./pages/paymentsuccess/Paymentsuccess";
import OrderCard from "./pages/Profile/conponent/OrderCard";
import Address from "./pages/Profile/conponent/Address";
import Varifyemail from "./pages/Auth/Varifyemail" 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/category" element={<Categorypage />} />
      <Route path="/category/all" element={<AllCategoryPro />} />
      <Route path="/product" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/singup" element={<Singup />} />
      <Route path="/emailverify/:token" element={<Varifyemail/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/recovery" element={<RecoveryPass />} />
      <Route path="/paymentsuccess" element={<Paymentsuccess />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfileLayout/>}>
        <Route index element={<OrderCard />} />
        <Route path="address" element={<Address/>} />
        <Route path="personal" element={<>personal</>} />
        <Route path="refere" element={<>refere</>} />
        <Route path="notification" element={<>notification</>} />
      </Route>
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
