import RegisterForm from "@/app/components/RegisterForm/RegisterForm";
import React from "react";
import { Container, Row } from "react-bootstrap";

function RegisterPage() {
  return (
    <Container>
      <Row
        className="pb-5 justify-content-between align-items-center"
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
