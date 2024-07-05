"use client";

import React, { useContext } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavDropdown,
  Row,
} from "react-bootstrap";
import styles from "../(main)/page.module.css";
import Link from "next/link";
import { AuthContext } from "../_context/AuthContext";
import { CldImage } from "next-cloudinary";

function MainNavbar() {
  const { currentUser, UpdateUser } = useContext(AuthContext);

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
    {
      key: "Equipment",
      label: "Equipment",
      path: "/equipment",
    },
  ];

  const HandleLogout = () => {
    UpdateUser(null);
  };

  return (
    <Navbar
      expand="lg"
      className="fixed-top"
      style={{ backgroundColor: "var(--mainColor)", zIndex: 100 }}
    >
      <Container>
        <NavbarBrand
          style={{ color: "var(--primaryColor)", fontSize: "32px" }}
          className="BoldText"
        >
          GYM
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 BoldText align-items-lg-center">
            {Links.map((linkElement) => {
              return (
                <Link
                  key={linkElement.key}
                  className={`text-dark nav-link ${styles.link}`}
                  href={linkElement.path}
                >
                  {linkElement.label}
                </Link>
              );
            })}
            {currentUser ? (
              <Row className="px-5 ms-lg-5 gap-3 gap-lg-0 align-items-center">
                {currentUser.avatar ? (
                  <CldImage
                    width="50"
                    height="50"
                    className="rounded-circle col-12 col-lg-6"
                    src={currentUser.avatar}
                  />
                ) : (
                  <img
                    width="50"
                    height="50"
                    className="rounded-circle col-12 col-lg-6"
                    src="noAvatar.svg"
                  />
                )}

                <NavDropdown
                  className="col-12 col-lg-6"
                  title={currentUser.username}
                  id="user-menu"
                >
                  <NavDropdown.Item href="/">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={HandleLogout}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              </Row>
            ) : (
              <>
                <Link
                  href="/register"
                  className={`btn text-white ${styles.registerBtn}`}
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className={`btn text-white ${styles.loginBtn}`}
                >
                  Login
                </Link>
              </>
            )}
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
