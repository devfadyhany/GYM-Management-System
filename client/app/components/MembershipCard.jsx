import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";
import styles from "../(main)/memberships/page.module.css";
import Link from "next/link";

function MembershipCard({ icon, title, description, features }) {
  return (
    <Link
      className={`col-10 col-md-6 col-lg-3 ${styles.membershipCard}`}
      href={`/subscribe?membership=${title}`}
    >
      <Card className={styles.card}>
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
              {features.map((feature) => {
                return <li key={title}>{feature}</li>;
              })}
            </ul>
          )}
        </CardBody>
      </Card>
    </Link>
  );
}

export default MembershipCard;
