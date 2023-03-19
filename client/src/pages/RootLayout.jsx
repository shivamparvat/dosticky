import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";

function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
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
