"use client";

import EquipmentCard from "@/app/components/EquipmentCard/EquipmentCard";
import apiRequest from "@/app/lib/apiRequest";
import React, { useEffect, useState } from "react";
import { Container, FormControl, Row, Spinner } from "react-bootstrap";

function EquipmentPage() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");

  const getEquipment = async () => {
    try {
      setLoading(true);
      const result = await apiRequest.get(`/equipment?name=${searchName}`);
      setEquipment(result.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEquipment();
  }, [searchName]);
  return (
    <Container style={{ paddingTop: "100px" }}>
      <FormControl
        type="text"
        placeholder="Search For Machine..."
        className="fs-4 mt-3"
        onChange={(e) => setSearchName(e.target.value)}
      />
      {loading ? (
        <div className="w-100 d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="gap-5 py-5 px-lg-3 justify-content-center justify-content-lg-start">
          {equipment.map((machine) => {
            return <EquipmentCard equipment={machine} />;
          })}
        </Row>
      )}
    </Container>
  );
}

export default EquipmentPage;
