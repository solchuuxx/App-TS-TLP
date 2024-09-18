import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2', borderRadius:"10px", marginBottom:'50px' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestión de Inventario
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
