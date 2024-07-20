"use client";

import apiRequest from "@/app/lib/apiRequest";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";

function AdminSubscriptionsDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetSubscriptions = async () => {
    try {
      const res = await apiRequest.get("/subscription");

      setSubscriptions(res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetSubscriptions();
  }, []);

  return (
    <>
      <h1 className="lead secondary">Subscriptions</h1>
      <hr></hr>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {subscriptions.length > 0 ? (
            <Table responsive="sm">
              <thead>
                <tr>
                  <th className="bgPrimary text-white">#</th>
                  <th className="bgPrimary text-white">Client</th>
                  <th className="bgPrimary text-white">Assigned Coach</th>
                  <th className="bgPrimary text-white">Created At</th>
                  <th className="bgPrimary text-white">End At</th>
                  <th className="bgPrimary text-white">Operations</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription, index) => {
                  return (
                    <tr key={index}>
                      <td>{subscription._id}</td>
                      <td>{subscription.clientId}</td>
                      <td>
                        {subscription.coachId ? subscription.coachId : "-"}
                      </td>
                      <td>{new Date(subscription.createdAt).toDateString()}</td>
                      <td>{new Date(subscription.endAt).toDateString()}</td>
                      <td className="d-flex">
                        <Button className="me-2" variant="success">
                          ✏️
                        </Button>
                        <Button variant="danger">X</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h3>No Subscriptions Found!</h3>
          )}
        </>
      )}
    </>
  );
}

export default AdminSubscriptionsDashboard;
