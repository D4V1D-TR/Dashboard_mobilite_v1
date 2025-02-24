import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../assets/header.css"; // Assurez-vous que ce fichier contient bien le CSS
import Sidebar from "../components/sidebar";

function Header() {
  const [sidebarOpen] = useState(false);

  return (
    <Navbar expand="lg" className="navbar">
    <div className="navbar-container">
      {/* Bloc gauche */}
      <Nav className="d-flex align-items-center">
        <Sidebar className={sidebarOpen ? "open" : "closed"} />
        <img
          src="/logo.svg"
          alt="Logo"
          style={{
            width: "80px",
            height: "80px",
            marginRight: "20px",
            marginLeft: "10px",
            marginTop: "5px",
          }}
        />
        <Navbar.Brand className="navbar-brand">
          Dashboard des Mobilités
        </Navbar.Brand>
      </Nav>

      {/* Bloc droit */}
      <Nav className="d-flex align-items-center">
        <Navbar.Brand className="navbar-brand2">
          Une application créée et développée par le service Data
        </Navbar.Brand>
      </Nav>
    </div>
  </Navbar>

  );
}

export default Header;
