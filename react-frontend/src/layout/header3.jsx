import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../assets/header3.css';

function Header() {
  return (
    <Navbar expand="lg">
      <Container>       
        <Navbar.Collapse>
          <Nav className="me-auto">
            <img src="/logo.svg" alt="Logo" style={{ width: '80px', height: '80px', marginRight: '20px', marginLeft: '10px' }} />
            
            <Navbar.Brand>Dashboard Mobilités</Navbar.Brand>
            <Nav.Link href="accueil">Accueil</Nav.Link>
            <Nav.Link href="carte">Carte</Nav.Link>          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
