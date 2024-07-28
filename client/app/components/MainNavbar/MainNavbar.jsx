"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import styles from "./navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "./Profile";
import AuthLinks from "./AuthLinks";
import { AuthContext } from "@/app/context/AuthContext";
import apiRequest from "@/app/lib/apiRequest";

const Links = [
  {
    key: "Home",
    label: "Home",
    path: "/",
  },
  {
    key: "Memberships",
    label: "Memberships",
    path: "/memberships",
  },
];

function MainNavbar() {
  const { currentUser, UpdateUser } = useContext(AuthContext);
  const [subscription, setSubscription] = useState(null);
  const pathname = usePathname();

  const RetreiveSubscription = async () => {
    try {
      const result = await apiRequest.get(
        `/subscription/${currentUser.activeSubscription}`
      );
      setSubscription(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    RetreiveSubscription();
  }, [currentUser]);

  return (
    <Navbar expand="lg" className={`fixed-top ${styles.mainNavbar}`}>
      <Container>
        <NavbarBrand className={`BoldText ${styles.navbarLogo}`}>
          GYM
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 BoldText align-items-lg-center">
            {/* Menu Links */}
            {Links.map((linkElement) => {
              return (
                <Link
                  key={linkElement.key}
                  className={`text-dark nav-link ${
                    pathname === linkElement.path ? `${styles.active}` : ""
                  } ${styles.link}`}
                  href={linkElement.path}
                >
                  {linkElement.label}
                </Link>
              );
            })}

            {/* Authentication Area */}
            {currentUser ? (
              <Profile
                subscription={subscription}
                user={currentUser}
                updateUser={UpdateUser}
              />
            ) : (
              <AuthLinks />
            )}
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
