"use client";

import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import apiRequest from "../lib/apiRequest";

function SubscribePage() {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  const CheckPaymentSession = async () => {
    try {
      const res = await apiRequest.post("/subscription/stripe-session", {
        userId: currentUser._id,
      });
      
      setResponse(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    CheckPaymentSession();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center text-center">
        {currentUser ? (
          <>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <div>
                <h1>{response.status === 200 ? "✅" : "❌"}</h1>
                <h2>
                  {response.status === 200
                    ? "Successful Payment"
                    : "Payment Failed"}
                </h2>
                <Link href="/">go back to home.</Link>
              </div>
            )}
          </>
        ) : (
          <>
            <h1>You Must Login First</h1>
            <Link href="/login">go to login page.</Link>
          </>
        )}
      </Row>
    </Container>
  );
}

export default SubscribePage;
