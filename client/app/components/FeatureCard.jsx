import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "react-bootstrap";

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="col-10 col-md-6 col-lg-3">
      <CardImg
        style={{ height: "50%" }}
        className="p-3"
        variant="top"
        src={icon}
      />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
}

export default FeatureCard;
