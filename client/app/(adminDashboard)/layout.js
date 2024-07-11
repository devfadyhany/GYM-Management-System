import React from "react";
import AdminNavbar from "../components/AdminNavbar";

function Adminlayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <div className="px-5 py-3 col-10 col-md-9 ms-auto">{children}</div>
    </>
  );
}

export default Adminlayout;
