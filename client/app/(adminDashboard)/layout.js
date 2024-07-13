import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Container, Row } from "react-bootstrap";

function Adminlayout({ children }) {
  return (
    <Container>
      <Row>
        <AdminNavbar />
        <div className="px-5 py-3 col-10 col-md-9 ms-auto">{children}</div>
      </Row>
    </Container>
  );
}

export default Adminlayout;
