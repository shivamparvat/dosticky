import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";

function RootLayout() {
  return (
    <>
    <Header/>
      <main>
        <Outlet />
      </main>
    <Footer/>
    </>
  );
}

export default RootLayout;
