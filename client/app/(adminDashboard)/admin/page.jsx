import RegisterForm from "@/app/components/RegisterForm";
import React from "react";
import { Row } from "react-bootstrap";

function AdminDashboard() {
  return (
    <>
      <h1 className="secondary">Admin Dashboard</h1>
      <hr></hr>
      <Row className="gap-2">
        <div className="col-12 col-lg-6">
          <h4>Register a New Admin</h4>
          <br></br>
          <RegisterForm admin={true} />
        </div>
        <div className="col-12 col-lg-5">
          <h4>GYM Income</h4>
        </div>
      </Row>
    </>
  );
}

export default AdminDashboard;
