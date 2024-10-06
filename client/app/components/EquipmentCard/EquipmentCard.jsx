"use client";

import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./equipmentCard.module.css";
import { Card, CardBody, CardFooter, CardTitle } from "react-bootstrap";

function EquipmentCard({ equipment }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        router.push(`/equipment/${equipment._id}`);
      }}
      className={`col-10 col-md-6 col-lg-3 ${styles.MainCard}`}
    >
      <CldImage
        width="400"
        height="600"
        style={{ height: "100%", maxWidth: "300px" }}
        src={equipment.images[0]}
        alt="Equipment Image"
        priority
      />
      <CardBody>
        <CardTitle>{equipment.name}</CardTitle>
      </CardBody>
      <CardFooter className="pb-3">
        <p>Targeted Muscles: </p>
        <div className="d-flex justify-content-start gap-3">
          {equipment.targetedMuscles.map((muscle) => {
            return (
              <span key={muscle} className="bgSecondary text-white p-2 rounded">
                {muscle}
              </span>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}

export default EquipmentCard;
