"use client";

import apiRequest from "@/app/lib/apiRequest";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";

function AdminEquipmentDashboard() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="lead secondary">Equipment</h1>
        <Link
          href="/admin/equipment/add"
          className="bg-success fs-1 py-1 px-4 rounded-circle text-white"
        >
          +
        </Link>
      </div>
      <hr></hr>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {equipment.length > 0 ? (
            <div className="table-responsive-sm overflow-x-scroll">
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th className="bgPrimary text-white">#</th>
                    <th className="bgPrimary text-white">Name</th>
                    <th className="bgPrimary text-white">Quantity</th>
                    <th className="bgPrimary text-white">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((machine, index) => {
                    return (
                      <tr className="text-nowrap" key={index}>
                        <td>{machine._id}</td>
                        <td>{machine.name}</td>
                        <td>{machine.quantity}</td>
                        <td className="d-flex justify-content-center">
                          <Button
                            onClick={() => router.push(`equipment/edit/${machine._id}`)}
                            className="me-2"
                            variant="success"
                          >
                            ✏️
                          </Button>
                          <Button variant="danger">🗑️</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          ) : (
            <h3>No Equipment Found!</h3>
          )}
        </>
      )}
    </>
  );
}

export default AdminEquipmentDashboard;
