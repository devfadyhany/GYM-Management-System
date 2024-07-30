"use client";

import React, { useContext, useState } from "react";
import { Container, FormControl, Row } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

function SchedulePage() {
  const [editMode, setEditMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { currentUser, UpdateUser } = useContext(AuthContext);

  const ChangeDay = async (e) => {
    if (e.key == "Enter") {
      try {
        let newUser = currentUser;
        newUser.schedule[selectedIndex].body = e.target.value;

        await apiRequest.put(`/user/${currentUser._id}`, newUser);

        setEditMode(false);

        UpdateUser((prev) => {
          return { ...prev, schedule: newUser.schedule };
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(-45deg, var(--secondaryColor), white)",
        minHeight: "100vh",
      }}
    >
      {currentUser && (
        <Container>
          <h1 className="lead BoldText text-center mb-5">Schedule Organizer</h1>

          <Row>
            {currentUser.schedule.map((day, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedIndex(index);
                    setEditMode(true);
                  }}
                  key={day.title}
                  className={`${
                    index % 2 == 0 ? "bgPrimary" : "bgSecondary"
                  } col-12 col-lg-3 p-3 border`}
                >
                  <h3 className="text-black BoldText">{day.title}</h3>
                  {editMode && selectedIndex == index ? (
                    <FormControl
                      onKeyDown={ChangeDay}
                      defaultValue={day.body}
                      type="text"
                    />
                  ) : (
                    <p className="text-white">{day.body}</p>
                  )}
                </div>
              );
            })}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default SchedulePage;
