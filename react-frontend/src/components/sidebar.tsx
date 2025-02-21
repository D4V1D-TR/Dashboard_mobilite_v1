import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav';


export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
        <Nav.Link as={Link} to="/parking">Parking</Nav.Link>
        <Nav.Link as={Link} to="/test">Test</Nav.Link> 
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Sidebar</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>{DrawerList}</Drawer>
    </div>
  );
}
