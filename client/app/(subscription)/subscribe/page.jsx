"use client";

import React from "react";
import { Container, Form, FormControl } from "react-bootstrap";

function SubscribePage() {
  return (
    <Container>
      <Form>
        <FormControl type="text" placeholder="Enter Card Number."/>
      </Form>
    </Container>
  );
}

export default SubscribePage;
