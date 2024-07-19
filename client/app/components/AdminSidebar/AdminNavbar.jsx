"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.css";

const Links = [
  {
    icon: "👤",
    displayText: "Clients",
    path: "/admin/clients",
  },
  {
    icon: "🏋",
    displayText: "Coaches",
    path: "/admin/coaches",
  },
  {
    icon: "💪",
    displayText: "Equipment",
    path: "/admin/equipment",
  },
  {
    icon: "💳",
    displayText: "Subscriptions",
    path: "/admin/subscriptions",
  },
];

function AdminNavbar() {
  const [width, setWidth] = useState(null);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      style={{ left: "0", minHeight: "100vh" }}
      className="bg-dark col-2 col-md-3 position-fixed"
    >
      <Link href="/admin" className="lead d-block text-center">
        {width > 768 ? "GYM" : "G"}
      </Link>
      <hr className="text-secondary" />
      <ul className="nav flex-column">
        {Links.map((linkElement) => {
          return (
            <li
              key={linkElement.displayText}
              className="nav-item text-white fs-3"
            >
              <Link
                href={linkElement.path}
                className={`nav-link primary ${
                  width <= 1032 ? "text-center" : ""
                } ${styles.SidebarLink}`}
              >
                {`${linkElement.icon}${
                  width > 1032 ? linkElement.displayText : ""
                }`}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AdminNavbar;
