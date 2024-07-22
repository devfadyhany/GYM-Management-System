"use client";

import apiRequest from "@/app/lib/apiRequest";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, FormSelect } from "react-bootstrap";
import { toast } from "react-toastify";

function AssignCoachPage() {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");
  const params = useParams();
  const router = useRouter();

  const GetCoaches = async () => {
    try {
      const res = await apiRequest.get("/user/coaches");

      setCoaches(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const AssignCoach = async () => {
    if (selectedCoach != ""){
      try {
        const result = apiRequest.put("/user/assignCoach", {
          clientId: params.userId,
          coachId: selectedCoach,
        });
  
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
  
        router.push("/admin/clients");
      } catch (err) {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 1000,
          theme: "light",
        });
      }
    }else {
      toast.error("Please select coach first.", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
    }
    
  };

  useEffect(() => {
    GetCoaches();
  }, []);

  return (
    <>
      <h1 className="lead secondary">Assign Coach to Client</h1>
      <hr></hr>
      <FormSelect onChange={(e) => setSelectedCoach(e.target.value)}>
        <option value="">Choose Coach.</option>
        {coaches.map((coach, index) => {
          return (
            <option value={coach._id} key={index}>
              {coach.username}
            </option>
          );
        })}
      </FormSelect>

      <Button onClick={AssignCoach} className="w-100 mt-3" variant="success">
        Submit
      </Button>
    </>
  );
}

export default AssignCoachPage;
