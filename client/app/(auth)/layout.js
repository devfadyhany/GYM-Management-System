import React from "react";

function Authlayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(-45deg, var(--secondaryColor), white)",
      }}
    >
      {children}
    </div>
  );
}

export default Authlayout;
