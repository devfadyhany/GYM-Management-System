import React from "react";
import MainNavbar from "../components/MainNavbar/MainNavbar";
import MainFooter from "../components/MainFooter/MainFooter";

function Homelayout({ children }) {
  return (
    <>
      <MainNavbar />
      {children}
      <MainFooter />
    </>
  );
}

export default Homelayout;
