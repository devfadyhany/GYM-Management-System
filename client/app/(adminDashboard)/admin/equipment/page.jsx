"use client";

import apiRequest from "@/app/lib/apiRequest";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";

function AdminEquipmentDashboard() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetEquipment = async () => {
    try {
      const res = await apiRequest.get("/equipment");

      setEquipment(res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetEquipment();
  }, []);

  return (
    <>
      <h1 className="lead secondary">Equipment</h1>
      <hr></hr>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {equipment.length > 0 ? (
            <Table responsive="sm">
              <thead>
                <tr>
                  <th className="bgPrimary text-white">#</th>
                  <th className="bgPrimary text-white">Name</th>
                  <th className="bgPrimary text-white">Description</th>
                  <th className="bgPrimary text-white">Targeted Muscles</th>
                  <th className="bgPrimary text-white">Quantity</th>
                  <th className="bgPrimary text-white">Operations</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((machine, index) => {
                  return (
                    <tr key={index}>
                      <td>{machine._id}</td>
                      <td>{machine.name}</td>
                      <td>{machine.description}</td>
                      <td>{machine.targetedMuscles}</td>
                      <td>{machine.quantity}</td>
                      <td>
                        <Button className="me-2" variant="success">
                          ...
                        </Button>
                        <Button variant="danger">X</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h3>No Equipment Found!</h3>
          )}
        </>
      )}
    </>
  );
}

export default AdminEquipmentDashboard;
