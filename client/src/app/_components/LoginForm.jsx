import React from 'react'
import { Button, Container, Form, FormControl, Row } from 'react-bootstrap';
import styles from "../(auth)/register/page.module.css"

function LoginForm() {
  return (
    <Form className="h-100 col-12 col-lg-5">
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

          <Button className={styles.LoginBtn} type="submit">Login</Button>
        </Row>
      </Container>
    </Form>
  )
}

export default LoginForm