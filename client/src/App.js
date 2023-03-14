import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product" element={<Product />} />
      <Route path="/checkout" element={<Checkout />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;

// import "./App.css";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import RootLayout from "./pages/RootLayout";
// import Home from "./pages/Home/index.jsx";
// import Cart from "./pages/Cart";
// import Order from "./pages/Order";
// import Profile from "./pages/Profile";
// import Product from "./pages/Product";
// import Checkout from "./pages/Checkout";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//   <Route path="/" element={<RootLayout />}>
//     <Route index element={<>herloo</>}/>
//     <Route path="/cart" element={<Cart/>}/>
//     <Route path="/order" element={<Order/>}/>
//     <Route path="/profile" element={<Profile/>}/>
//     <Route path="/product" element={<Product/>}/>
//     <Route path="/checkout" element={<Checkout/>}/>
//   </Route>)
// );

// function App() {
//   <RouterProvider router={router} />;
// }

// export default App;
