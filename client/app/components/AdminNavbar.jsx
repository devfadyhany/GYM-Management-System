"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import styles from "../(adminDashboard)/admin/page.module.css";

const Links = [
  {
    icon: "👤",
    displayText: "Clients",
    path: "/clients",
  },
  {
    icon: "🏋",
    displayText: "Coaches",
    path: "/coaches",
  },
  {
    icon: "💪",
    displayText: "Equipments",
    path: "/equipments",
  },
  {
    icon: "💳",
    displayText: "Subscriptions",
    path: "/subscriptions",
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
    <div className="container-fluid position-fixed">
      <Row>
        <div className="bg-dark col-2 col-md-3 min-vh-100">
          <h1 href="#" className="lead text-center">
            {width > 768 ? "GYM" : "G"}
          </h1>
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
      </Row>
    </div>
  );
}

export default AdminNavbar;
