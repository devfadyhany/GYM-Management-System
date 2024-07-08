import RegisterForm from "../../components/RegisterForm";
import React from "react";
import { Container, Row } from "react-bootstrap";

function RegisterPage() {
  return (
    <Container>
      <Row
        style={{ height: "100vh" }}
        className="pt-4 justify-content-between align-items-center"
      >
        <RegisterForm />
        <img
          className="col-6 d-none d-lg-block"
          height={500}
          src="Register.svg"
        />
      </Row>
    </Container>
  );
}

export default RegisterPage;
