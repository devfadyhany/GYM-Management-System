"use client";

import apiRequest from "@/app/lib/apiRequest";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormCheck,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";

function EditEquipmentPage() {
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState(null);
  const params = useParams();

  const RetreiveData = async () => {
    try {
      const result = await apiRequest(`/equipment/${params.id}`);
      setEquipment(result.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    RetreiveData();
  }, []);

  let targetedMuscles = [
    {
      name: "Chest",
      value: "Chest",
      selected: false,
    },
    {
      name: "Biceps",
      value: "Biceps",
      selected: false,
    },
    {
      name: "Hamstring",
      value: "Hamstring",
      selected: false,
    },
    {
      name: "Glutes",
      value: "Glutes",
      selected: false,
    },
    {
      name: "Triceps",
      value: "Triceps",
      selected: false,
    },
    {
      name: "Back",
      value: "Back",
      selected: false,
    },
    {
      name: "Shoulder",
      value: "Shoulder",
      selected: false,
    },
    {
      name: "Calves",
      value: "Calves",
      selected: false,
    },
  ];

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { name, description, quantity } = Object.fromEntries(formData);
    let muscles = targetedMuscles.map((muscle) => {
      if (muscle.selected) {
        return muscle.value;
      }
    });

    muscles = muscles.filter((element) => {
      return element !== undefined;
    });

    try {
      await apiRequest.put(`/equipment/${params.id}`, {
        name,
        description,
        targetedMuscles: muscles,
        quantity,
      });

      toast.success("Machine Has Been Edited Successfully!", {
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

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setEquipment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={HandleSubmit}>
      <Container>
        {equipment && (
          <>
            <h1 className="lead BoldText text-center mb-5">Edit Machine</h1>
            <Row className="gap-4">
              <FormControl
                name="name"
                type="text"
                value={equipment.name}
                onChange={HandleChange}
                placeholder="Enter machine name."
              />
              <FormControl
                as="textarea"
                name="description"
                value={equipment.description}
                onChange={HandleChange}
                rows={5}
                placeholder="Enter machine description."
              />
              <FormControl
                name="quantity"
                type="number"
                value={equipment.quantity}
                onChange={HandleChange}
                placeholder="Enter machine quantity."
              />

              <h5>Choose targeted muscles:</h5>
              <InputGroup className="gap-5">
                {targetedMuscles.map((muscle) => {
                    if (equipment.targetedMuscles.includes(
                        muscle.value
                      )){
                        muscle.selected = true;
                      }
                  return (
                    <FormCheck
                      key={muscle.value}
                      label={muscle.name}
                      value={muscle.value}
                      defaultChecked={muscle.selected}
                      onChange={(e) => (muscle.selected = e.target.checked)}
                    />
                  );
                })}
              </InputGroup>

              <Button variant="success" type="submit">
                {loading ? <Spinner animation="border" /> : "Register"}
              </Button>
            </Row>
          </>
        )}
      </Container>
    </Form>
  );
}

export default EditEquipmentPage;
