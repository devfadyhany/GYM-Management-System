import React from "react";
import MainNavbar from "../_components/MainNavbar";
import MainFooter from "../_components/MainFooter";

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
