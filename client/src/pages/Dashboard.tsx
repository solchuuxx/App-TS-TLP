import React, { useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { GoPencil, GoTrash } from 'react-icons/go';
import { Product } from '../types/product.interface';
import '../styles/Dashboard.css'; // Asegúrate de incluir este archivo CSS

const Dashboard: React.FC = () => {
  const [stock, setStock] = useState<Product[]>([]);
  const [newEquipment, setNewEquipment] = useState<Product>({
    name: '',
    type: '',
    status: 'Disponible',
    location: '',
    acquisitionDate: '',
  });
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userRole = JSON.parse(atob(token.split('.')[1])).role; 
      setRole(userRole);
    }

    fetch('http://localhost:8000/api/equipments', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setStock(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddEquipment = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/equipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newEquipment),
      });
      if (res.status === 200) {
        const data = await res.json();
        setStock([...stock, data]);
        setNewEquipment({
          name: '',
          type: '',
          status: 'Disponible',
          location: '',
          acquisitionDate: '',
        });
      } else {
        console.error('Failed to add equipment', await res.text());
      }
    } catch (error) {
      console.error('Error adding equipment', error);
    }
  };

  const handleUpdateEquipment = async (id: string, updatedEquipment: Product) => {
    try {
      const res = await fetch(`http://localhost:8000/api/equipments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedEquipment),
      });
      if (res.status === 200) {
        const data = await res.json();
        setStock(stock.map(e => (e.id === id ? data : e)));
      } else {
        console.error('Failed to update equipment', await res.text());
      }
    } catch (error) {
      console.error('Error updating equipment', error);
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/equipments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.status === 200) {
        setStock(stock.filter(e => e.id !== id));
      } else {
        console.error('Failed to delete equipment', await res.text());
      }
    } catch (error) {
      console.error('Error deleting equipment', error);
    }
  };

  return (
    <div className='dashboard-container'>
      <Typography variant="h4" gutterBottom className='dashboard-title'>Inventario de Equipos</Typography>

      {role === 'admin' && (
        <div className='form-container'>
          <Typography variant="h6" className='form-title'>Añadir Equipo</Typography>
          <TextField
            label="Nombre del Equipo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newEquipment.name}
            onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
            className='form-input'
          />
          <TextField
            label="Tipo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newEquipment.type}
            onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
            className='form-input'
          />
          <Select
            value={newEquipment.status}
            onChange={(e) => setNewEquipment({ ...newEquipment, status: e.target.value as 'Disponible' | 'En Reparación' | 'Asignado' })}
            fullWidth
            className='form-select'
          >
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="En Reparación">En Reparación</MenuItem>
            <MenuItem value="Asignado">Asignado</MenuItem>
          </Select>
          <TextField
            label="Ubicación"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newEquipment.location}
            onChange={(e) => setNewEquipment({ ...newEquipment, location: e.target.value })}
            className='form-input'
          />
          <TextField
            label="Fecha de Adquisición"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newEquipment.acquisitionDate}
            onChange={(e) => setNewEquipment({ ...newEquipment, acquisitionDate: e.target.value })}
            className='form-input'
          />
          <Button variant="contained" color="primary" onClick={handleAddEquipment} className='submit-button'>Añadir Equipo</Button>
        </div>
      )}

      <TableContainer component={Paper} className='table-container'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Fecha de Adquisición</TableCell>
              {role === 'admin' && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {stock.map((equip: Product) => (
              <TableRow key={equip.id}>
                <TableCell>{equip.name}</TableCell>
                <TableCell>{equip.type}</TableCell>
                <TableCell>{equip.status}</TableCell>
                <TableCell>{equip.location}</TableCell>
                <TableCell>{equip.acquisitionDate}</TableCell>
                {role === 'admin' && (
                  <TableCell>
                    <IconButton color="primary" onClick={() => equip.id && handleUpdateEquipment(equip.id, { ...equip, status: 'En Reparación' })}>
                      <GoPencil />
                    </IconButton>
                    <IconButton color="error" onClick={() => equip.id && handleDeleteEquipment(equip.id)}>
                      <GoTrash />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
