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
      <Container>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Sidebar className={sidebarOpen ? "open" : "closed"} />
            <img src="/logo.svg" alt="Logo" style={{width: '80px', height: '80px', marginRight: '20px', marginLeft: '10px', marginTop: '5px'}}/>
            <Navbar.Brand className="navbar-brand">Dashboard Mobilités</Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
