import CheckSubscription from "@/app/components/CheckSubscription/CheckSubscription";
import RegisterForm from "@/app/components/RegisterForm/RegisterForm";
import React from "react";
import { Row } from "react-bootstrap";

function AdminDashboard() {
  return (
    <>
      <h1 className="secondary">Admin Dashboard</h1>
      <hr></hr>
      <Row className="justify-content-between">
        <div className="col-12 col-lg-6 mb-5">
          <h4>Register a New Admin</h4>
          <br></br>
          <RegisterForm admin={true} />
        </div>
        <hr className="d-block d-lg-none"/>
        <div className="col-12 col-lg-5">
          <CheckSubscription />
        </div>
      </Row>
    </>
  );
}

export default AdminDashboard;
