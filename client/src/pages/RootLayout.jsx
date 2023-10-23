import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";

function RootLayout() {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      
      {/* <Footer /> */}
    </>
  );
}
export function Auth() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default RootLayout;
