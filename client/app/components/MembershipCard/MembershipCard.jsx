"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import styles from "./membership.module.css";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import apiRequest from "@/app/lib/apiRequest";

function MembershipCard({ icon, title, description, features }) {
  const { currentUser } = useContext(AuthContext);
  const priceId = useRef("");
  const quantity = useRef(0);
  const router = useRouter();

  const CalcPrice = () => {
    if (title == "basic") {
      priceId.current = process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID;
      quantity.current = 10;
    } else if (title == "pro") {
      priceId.current = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID;
      quantity.current = 20;
    } else {
      priceId.current = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID;
      quantity.current = 50;
    }
  };

  const CreateStripeSession = async () => {
    try {
      const result = await apiRequest.post("/subscription", {
        userId: currentUser._id,
        quantity: quantity.current,
        priceId: priceId.current,
        membership: title,
      });

      router.push(result.data.url);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    CalcPrice();
  }, []);

  return (
    <Card
      onClick={CreateStripeSession}
      className={`col-10 col-md-6 col-lg-3 ${styles.membershipCard}`}
    >
      <CardImg
        style={{ height: "50%", color: "var(--primaryColor)" }}
        className="p-3"
        variant="top"
        src={icon}
      />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
        {features && (
          <ul>
            {features.map((feature, index) => {
              return <li key={index}>{feature}</li>;
            })}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

export default MembershipCard;
