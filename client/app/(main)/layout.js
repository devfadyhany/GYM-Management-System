import React from "react";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";

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
