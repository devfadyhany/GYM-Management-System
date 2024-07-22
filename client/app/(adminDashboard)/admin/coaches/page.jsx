"use client";

import MessageBox from "@/app/components/MessageBox/MessageBox";
import apiRequest from "@/app/lib/apiRequest";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";

function AdminCoachesDashboard() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const CloseMB = () => {
    setMessage(null);
  };

  const CreateMessageBox = (Item_ID, Item_Name) => {
    setMessage({
      item_id: Item_ID,
      text: `Are You Sure You Want To Delete ${Item_Name}`,
      noFunction: CloseMB,
      yesFunction: () => DeleteAccount(Item_ID),
    });
  };

  const DeleteAccount = async (id) => {
    try {
      const result = await apiRequest.delete(`/user/${id}`);

      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      CloseMB();
      GetCoaches();
    }
  };

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

  const ApproveCoach = async (coachId) => {
    try {
      const result = await apiRequest.put(`user/approve/${coachId}`);

      toast.success(result.message, {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    }
  };

  return (
    <>
      {message && <MessageBox message={message} />}
      <h1 className="lead secondary">Coaches</h1>
      <hr></hr>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {coaches.length > 0 ? (
            <div className="table-responsive-sm overflow-x-scroll">
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
                      <tr className="text-nowrap" key={index}>
                        <td>{coach._id}</td>
                        <td>{coach.username}</td>
                        <td>{coach.email}</td>
                        <td>{coach.numOfClients}</td>
                        <td className="d-flex justify-content-center">
                          {!coach.Approved && (
                            <Button
                              onClick={() => ApproveCoach(coach._id)}
                              className="me-2"
                              variant="success"
                            >
                              ✅
                            </Button>
                          )}

                          <Button
                            variant="danger"
                            onClick={() =>
                              CreateMessageBox(coach._id, coach.username)
                            }
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
            <h3>No Coaches Found!</h3>
          )}
        </>
      )}
    </>
  );
}

export default AdminCoachesDashboard;
