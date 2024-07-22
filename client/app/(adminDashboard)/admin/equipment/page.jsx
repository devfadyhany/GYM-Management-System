"use client";

import MessageBox from "@/app/components/MessageBox/MessageBox";
import apiRequest from "@/app/lib/apiRequest";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";

function AdminEquipmentDashboard() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const CloseMB = () => {
    setMessage(null);
  };

  const CreateMessageBox = (Item_ID, Item_Name) => {
    setMessage({
      item_id: Item_ID,
      text: `Are You Sure You Want To Delete ${Item_Name}`,
      noFunction: CloseMB,
      yesFunction: () => DeleteEquipment(Item_ID),
    });
  };

  const DeleteEquipment = async (id) => {
    try {
      const result = await apiRequest.delete(`/equipment/${id}`);

      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      CloseMB();
      GetEquipment();
    }
  };

  const GetEquipment = async () => {
    try {
      setLoading(true);
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
      {message && <MessageBox message={message} />}

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
                            onClick={() =>
                              router.push(`equipment/edit/${machine._id}`)
                            }
                            className="me-2"
                            variant="success"
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() =>
                              CreateMessageBox(machine._id, machine.name)
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
            <h3>No Equipment Found!</h3>
          )}
        </>
      )}
    </>
  );
}

export default AdminEquipmentDashboard;
