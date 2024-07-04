"use client";

import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import { Button, Container, Form, FormCheck, FormControl, Row } from "react-bootstrap";
import styles from "../(auth)/register/page.module.css"

function RegisterForm() {
  return (
    <Form className="h-100 col-12 col-lg-6">
      <Container>
        <h1 className="lead BoldText text-center mb-5">Register Form</h1>
        <Row className="gap-4">
          <FormControl
            name="username"
            type="text"
            placeholder="Enter your username."
          />
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

          <FormCheck name="isCoach" label="Are you a Coach ?"/>

          <CldUploadWidget uploadPreset="UserAvatar">
            {({ open }) => {
              return (
                <>
                  <div className={styles.UploadGroup}>
                    <img
                      height={200}
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                      src="cloudinaryUpload.svg"
                    />
                    <span className="text-dark">Upload an Image</span>
                  </div>
                </>
              );
            }}
          </CldUploadWidget>

          <Button className={styles.RegisterBtn} type="submit">Register</Button>
        </Row>
      </Container>
    </Form>
  );
}

export default RegisterForm;
