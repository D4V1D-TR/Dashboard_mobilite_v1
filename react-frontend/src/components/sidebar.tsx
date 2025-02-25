import * as React from 'react';
import { Box, Drawer, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import "../assets/sidebar.css"

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="header">
        <img src="/logo.svg" alt="Logo" style={{ width: '80px', height: '80px', marginRight: '10px', marginLeft: '10px' }}/>
        <h2>Dashboard Mobilités</h2>
      </div>
      <Divider/>

      <Nav.Link as={Link} to="/">Accueil</Nav.Link>
      <Nav.Link as={Link} to="/parking">Parking</Nav.Link>
      <Nav.Link as={Link} to="/velov">Velov</Nav.Link>
      <Nav.Link as={Link} to="/lpaandco">LPA&Co</Nav.Link>
      <Divider />
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}><MenuIcon /></IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>{DrawerList}</Drawer>
    </div>
  );
}