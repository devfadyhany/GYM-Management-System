import { CldImage } from "next-cloudinary";
import React from "react";
import { NavDropdown, Row } from "react-bootstrap";

function Profile({ user, updateUser }) {
  const HandleLogout = () => {
    updateUser(null);
  };

  return (
    <Row className="align-items-center justify-content-end">
      <CldImage
        width="200"
        height="200"
        alt="User Avatar"
        className="w-25 h-25  rounded-circle col-6"
        src={user.avatar || "GYM-Management-System/d_avatar"}
        priority
      />

      <NavDropdown className="col-6" title={user.username} id="user-menu">
        <NavDropdown.Item href="/profile">👤Profile</NavDropdown.Item>
        {user.isAdmin && <NavDropdown.Item href="/admin">⚙️Admin Dashboard</NavDropdown.Item>}
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={HandleLogout}>↩️LogOut</NavDropdown.Item>
      </NavDropdown>
    </Row>
  );
}

export default Profile;
