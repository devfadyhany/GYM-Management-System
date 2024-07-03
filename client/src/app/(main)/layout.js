import React from "react";
import MainNavbar from "../_components/MainNavbar";

function Homelayout({ children }) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}

export default Homelayout;
