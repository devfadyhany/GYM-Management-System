"use client";

import apiRequest from "@/app/lib/apiRequest";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";

function AdminCoachesDashboard() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetCoaches = async () => {
    try {
      const res = await apiRequest.get("/user/coaches");

      setCoaches(res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCoaches();
  }, []);

  return (
    <>
      <h1 className="lead secondary">Coaches</h1>
      <hr></hr>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {coaches.length > 0 ? (
            <Table responsive="sm">
              <thead>
                <tr>
                  <th className="bgPrimary text-white">#</th>
                  <th className="bgPrimary text-white">Username</th>
                  <th className="bgPrimary text-white">E-mail</th>
                  <th className="bgPrimary text-white">Number-Of-Clients</th>
                  <th className="bgPrimary text-white">Operations</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((coach, index) => {
                  return (
                    <tr key={index}>
                      <td>{coach._id}</td>
                      <td>{coach.username}</td>
                      <td>{coach.email}</td>
                      <td>{coach.numOfClients}</td>
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
            <h3>No Coaches Found!</h3>
          )}
        </>
      )}
    </>
  );
}

export default AdminCoachesDashboard;
