"use client";

import MessageBox from "@/app/components/MessageBox/MessageBox";
import apiRequest from "@/app/lib/apiRequest";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";

function AdminSubscriptionsDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const CloseMB = () => {
    setMessage(null);
  };

  const CreateMessageBox = (Item_ID) => {
    setMessage({
      item_id: Item_ID,
      text: "Are You Sure You Want To Cancel This Subscription",
      noFunction: CloseMB,
      yesFunction: () => DeleteSubscription(Item_ID),
    });
  };

  const DeleteSubscription = async (id) => {
    try {
      const result = await apiRequest.delete(`/subscription/${id}`);

      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      CloseMB();
      GetSubscriptions();
    }
  };

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
      {message && <MessageBox message={message} />}
      <h1 className="lead secondary">Subscriptions</h1>
      <hr></hr>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {subscriptions.length > 0 ? (
            <div className="table-responsive-sm overflow-x-scroll">
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
                      <tr className="text-nowrap" key={index}>
                        <td>{subscription._id}</td>
                        <td>{subscription.clientId}</td>
                        <td>
                          {subscription.coachId ? subscription.coachId : "-"}
                        </td>
                        <td>
                          {new Date(subscription.createdAt).toDateString()}
                        </td>
                        <td>{new Date(subscription.endAt).toDateString()}</td>
                        <td className="d-flex justify-content-center">
                          <Button
                            variant="danger"
                            onClick={() => CreateMessageBox(subscription._id)}
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          ) : (
            <h3>No Subscriptions Found!</h3>
          )}
        </>
      )}
    </>
  );
}

export default AdminSubscriptionsDashboard;
