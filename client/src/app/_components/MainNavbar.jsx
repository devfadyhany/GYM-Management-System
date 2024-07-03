import React from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import styles from "../(main)/page.module.css";
import Link from "next/link";

function MainNavbar() {
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

  return (
    <Navbar expand="lg" className="fixed-top" style={{ backgroundColor: "var(--mainColor)", zIndex: 100 }}>
      <Container>
        <NavbarBrand
          style={{ color: "var(--primaryColor)", fontSize: "32px" }}
          className="BoldText"
        >
          GYM
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 BoldText">
            {Links.map((linkElement) => {
              return (
                <Link key={linkElement.key} className={`text-dark nav-link ${styles.link}`} href={linkElement.path}>
                  {linkElement.label}
                </Link>
              );
            })}
            <Button className={styles.registerBtn}>Register</Button>
            <Button className={styles.loginBtn}>Login</Button>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
