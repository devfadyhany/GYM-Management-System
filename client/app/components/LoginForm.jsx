"use client";

import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import styles from "../(auth)/register/page.module.css";
import { useRouter } from "next/navigation";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { UpdateUser } = useContext(AuthContext);

  const router = useRouter();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const result = await apiRequest.post("/user/login", {
        email,
        password,
      });

      UpdateUser(result.data);

      router.push("/");
    } catch (err) {
      setError("Wrong Credintials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={HandleSubmit} className="h-100 col-12 col-lg-5">
      <Container>
        <h1 className="lead BoldText text-center mb-5">Login Form</h1>
        <Row className="gap-4">
          <FormControl
            name="email"
            type="email"
            placeholder="Enter your email."
          />
          <FormControl
            name="password"
            type="password"
            placeholder="Enter your password."
          />

          <Button
            disabled={isLoading}
            className={styles.LoginBtn}
            type="submit"
          >
            {isLoading ? <Spinner animation="border" /> : "Login"}
          </Button>

          {error && <span className="text-danger">{error}</span>}
        </Row>
      </Container>
    </Form>
  );
}

export default LoginForm;
