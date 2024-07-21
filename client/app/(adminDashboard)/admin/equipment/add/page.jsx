"use client";

import apiRequest from "@/app/lib/apiRequest";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
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

function AddNewEquipmentPage() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

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
      setLoading(true);

      await apiRequest.post("/equipment", {
        images,
        name,
        description,
        targetedMuscles: muscles,
        quantity,
      });

      toast.success("Machine Has Been Added Successfully!", {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={HandleSubmit}>
      <Container>
        <h1 className="lead BoldText text-center mb-5">Add New Machine</h1>
        <Row className="gap-4">
          <FormControl
            name="name"
            type="text"
            placeholder="Enter machine name."
          />
          <FormControl
            as="textarea"
            name="description"
            rows={5}
            placeholder="Enter machine description."
          />
          <FormControl
            name="quantity"
            type="number"
            placeholder="Enter machine quantity."
          />

          <h5>Choose targeted muscles:</h5>
          <InputGroup className="gap-5">
            {targetedMuscles.map((muscle) => {
              return (
                <FormCheck
                  key={muscle.value}
                  label={muscle.name}
                  onClick={(e) => (muscle.selected = e.target.checked)}
                />
              );
            })}
          </InputGroup>

          <CldUploadWidget
            name="images"
            onSuccess={(result) =>
              setImages((prev) => [...prev, result.info.public_id])
            }
            uploadPreset="EquipmentImages"
          >
            {({ open }) => {
              return (
                <img
                  style={{ cursor: "pointer" }}
                  className="border"
                  height={200}
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  src="/cloudinaryUpload.svg"
                />
              );
            }}
          </CldUploadWidget>

          <Button variant="success" type="submit">
            {loading ? <Spinner animation="border" /> : "Register"}
          </Button>
        </Row>
      </Container>
    </Form>
  );
}

export default AddNewEquipmentPage;
