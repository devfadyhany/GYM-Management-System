"use client";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormCheck,
  FormControl,
  Row,
  Spinner,
} from "react-bootstrap";
import styles from "../(auth)/register/page.module.css";
import { useRouter } from "next/navigation";
import apiRequest from "../lib/apiRequest";

function RegisterForm({ admin }) {
  const [avatar, setAvatar] = useState(null);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const { username, email, password, isCoach } = Object.fromEntries(formData);

    try {
      const result = await apiRequest.post("/user/", {
        avatar: avatar.public_id,
        username,
        email,
        password,
        isCoach,
      });

      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      onSubmit={HandleSubmit}
      className={`h-100 col-12 ${!admin ? "col-lg-6" : ""}`}
    >
      <Container>
        {!admin && (
          <h1 className="lead BoldText text-center mb-5">Register Form</h1>
        )}
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

          {!admin && <FormCheck name="isCoach" label="Are you a Coach ?" />}

          <CldUploadWidget
            name="avatar"
            onUpload={(result) => setAvatar(result.info)}
            uploadPreset="UserAvatar"
          >
            {({ open }) => {
              return (
                <>
                  <div
                    className={`d-flex flex-wrap justify-content-between p-5 border border-primary rounded`}
                  >
                    <div className={`col-12 col-lg-6 ${styles.UploadGroup}`}>
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
                    {avatar && (
                      <CldImage
                        className="col-12 col-lg-6 rounded"
                        width="200"
                        height="200"
                        src={avatar.public_id}
                      />
                    )}
                  </div>
                </>
              );
            }}
          </CldUploadWidget>

          <Button className={styles.RegisterBtn} type="submit">
            {isLoading ? <Spinner animation="border" /> : "Register"}
          </Button>

          {error && <span className="text-danger">{error}</span>}
        </Row>
      </Container>
    </Form>
  );
}

export default RegisterForm;
