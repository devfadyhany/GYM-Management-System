import LoginForm from "@/app/components/LoginForm/LoginForm";
import React from "react";
import { Container, Row } from "react-bootstrap";

function LoginPage() {
  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <LoginForm />
        <img className="col-5 d-none d-lg-block" height={500} src="Login.svg" />
      </Row>
    </Container>
  );
}

export default LoginPage;
