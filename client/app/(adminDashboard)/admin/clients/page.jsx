"use client";

import apiRequest from "@/app/lib/apiRequest";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";

function AdminClientsDashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetClients = async () => {
    try {
      const res = await apiRequest.get("/user/clients");

      setClients(res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetClients();
  },[]);

  return (
    <>
      <h1 className="lead secondary">Clients</h1>
      <hr></hr>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {clients.length > 0 ? (
            <Table responsive="sm">
              <thead>
                <tr>
                  <th className="bgPrimary text-white">#</th>
                  <th className="bgPrimary text-white">Username</th>
                  <th className="bgPrimary text-white">E-mail</th>
                  <th className="bgPrimary text-white">Assigned Coach</th>
                  <th className="bgPrimary text-white">Active Subscription</th>
                  <th className="bgPrimary text-white">Operations</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client,index) => {
                  return (
                    <tr key={index}>
                      <td>{client._id}</td>
                      <td>{client.username}</td>
                      <td>{client.email}</td>
                      <td>
                        {client.assignedCoach ? client.assignedCoach : "-"}
                      </td>
                      <td>
                        {client.activeSubscription
                          ? client.activeSubscription
                          : "-"}
                      </td>
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
            <h3>No Clients Found!</h3>
          )}
        </>
      )}
    </>
  );
}

export default AdminClientsDashboard;
