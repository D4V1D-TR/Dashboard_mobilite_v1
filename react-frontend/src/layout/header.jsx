import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../assets/header.css'; // Assuming the updated CSS is here
import Sidebar from "../components/sidebar";

function Header() {
  const [sidebarOpen] = useState(false);

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Collapse>
          <Nav className="d-flex w-100 align-items-center">
            <Sidebar className={sidebarOpen ? "open" : "closed"} />
            <img src="/logo.svg" alt="Logo" style={{width: '80px', height: '80px', marginRight: '20px', marginLeft: '10px', marginTop: '5px'}}/>
            <Navbar.Brand className="navbar-brand">Dashboard des Mobilités</Navbar.Brand>
            <Navbar.Brand className="navbar-brand2 ms-auto">Une application créée et développée par le service Data</Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
