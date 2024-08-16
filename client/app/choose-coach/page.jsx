"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Button, Container, FormSelect } from "react-bootstrap";

function ChooseCoachPage() {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");
  const { currentUser } = useContext(AuthContext);
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
    if (selectedCoach != "") {
      try {
        const result = apiRequest.put("/user/assignCoach", {
          clientId: currentUser._id,
          coachId: selectedCoach,
        });

        router.push("/");
      } catch (err) {
        console.log(err.message);
      }
    } else {
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
    <Container>
      <h1 className="lead secondary">Choose Your Coach.</h1>
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
    </Container>
  );
}

export default ChooseCoachPage;
