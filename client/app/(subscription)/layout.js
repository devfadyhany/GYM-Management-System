"use client";

import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Subscriptionlayout({ children }) {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  if (!currentUser) {
    router.replace("/login");
  }

  return <>{children}</>;
}

export default Subscriptionlayout;
