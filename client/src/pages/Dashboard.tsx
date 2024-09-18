import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Modal, Box, SelectChangeEvent } from '@mui/material';
import { GoPencil, GoTrash } from 'react-icons/go';
import { Product } from '../types/product.interface';
import '../styles/Dashboard.css'; 
import Navbar from '../components/Navbar';

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
  const [openModal, setOpenModal] = useState<boolean>(false); // Estado para controlar el modal de agregar equipo
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [selectedEquip, setSelectedEquip] = useState<Product | null>(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const EditEquipmentModal = ({
    isOpen,
    handleClose,
    equip,
    handleUpdateEquipment
  }: {
    isOpen: boolean;
    handleClose: () => void;
    equip: Product;
    handleUpdateEquipment: (id: string, updatedEquip: Product) => void;
  }) => {
    const [updatedEquipment, setUpdatedEquipment] = useState<Product>(equip);
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
      const { name, value } = e.target as HTMLInputElement;
      setUpdatedEquipment((prev) => ({
        ...prev,
        [name]: value,
      }));
    };    
    
  
    const handleSave = () => {
      if (updatedEquipment._id) {
        handleUpdateEquipment(updatedEquipment._id, updatedEquipment);
        handleClose();
      }
    };

    return (
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: "20px", boxShadow: 24, p: 4 }}>
          <h2>Editar Equipamiento</h2>
          <TextField
            label="Nombre"
            name="name"
            value={updatedEquipment.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tipo"
            name="type"
            value={updatedEquipment.type}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Select
            label="Estado"
            name="status"
            value={updatedEquipment.status}
            onChange={(e: SelectChangeEvent) => handleInputChange(e as any)} // cast to handle select event type
            fullWidth
          >
            <MenuItem value="Disponible">Disponible</MenuItem>
            <MenuItem value="En Reparación">En Reparación</MenuItem>
            <MenuItem value="Asignado">Asignado</MenuItem>
          </Select>
          <TextField
            label="Ubicación"
            name="location"
            value={updatedEquipment.location}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha de Adquisición"
            name="acquisitionDate"
            type="date"
            value={updatedEquipment.acquisitionDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Modal>
    );
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEquipment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewEquipment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  

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
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
        handleCloseModal();
      } else {
        console.error('Failed to add equipment', await res.text());
      }
    } catch (error) {
      console.error('Error adding equipment', error);
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
        setStock(stock.filter(e => e._id !== id));
      } else {
        console.error('Failed to delete equipment', await res.text());
      }
    } catch (error) {
      console.error('Error deleting equipment', error);
    }
  };

  const handleOpen = (equip: Product) => {
    setSelectedEquip(equip);
    setAddModalOpen(true);
  };

  const handleClose = () => {
    setAddModalOpen(false);
    setSelectedEquip(null);
  };

  const handleUpdateEquipment = async (id: string, updatedEquip: Product) => {
    try {
      const res = await fetch(`http://localhost:8000/api/equipments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedEquip),
      });
      if (res.status === 200) {
        const updatedStock = stock.map(e => (e._id === id ? updatedEquip : e));
        setStock(updatedStock);
      } else {
        console.error('Failed to update equipment', await res.text());
      }
    } catch (error) {
      console.error('Error updating equipment', error);
    }
  };

  return (
    <div className='dashboard-container'>
      <Navbar />
      <Typography variant="h4" gutterBottom className='dashboard-title'>Inventario de Equipos</Typography>

      {role === 'admin' && (
        <>
          <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{margin:'10px'}}>
            Añadir Equipo
          </Button>
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: '10px', boxShadow: 24, p: 4 }}>
              <Typography variant="h6" gutterBottom>Añadir Nuevo Equipo</Typography>
              <TextField
                label="Nombre del Equipo"
                name="name"
                value={newEquipment.name}
                onChange={handleTextFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Tipo"
                name="type"
                value={newEquipment.type}
                onChange={handleTextFieldChange}
                fullWidth
                margin="normal"
              />
              <Select
                label="Estado"
                name="status"
                value={newEquipment.status}
                onChange={(e: SelectChangeEvent) => handleSelectChange(e as any)} 
              >
                <MenuItem value="Disponible">Disponible</MenuItem>
                <MenuItem value="En Reparación">En Reparación</MenuItem>
                <MenuItem value="Asignado">Asignado</MenuItem>
              </Select>
              <TextField
                label="Ubicación"
                name="location"
                value={newEquipment.location}
                onChange={handleTextFieldChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Fecha de Adquisición"
                name="acquisitionDate"
                type="date"
                value={newEquipment.acquisitionDate}
                onChange={handleTextFieldChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <Button variant="contained" color="primary" onClick={handleAddEquipment}>
                Guardar
              </Button>
            </Box>
          </Modal>
        </>
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
            {stock.map((equip) => (
              <TableRow key={equip._id}>
                <TableCell>{equip.name}</TableCell>
                <TableCell>{equip.type}</TableCell>
                <TableCell>{equip.status}</TableCell>
                <TableCell>{equip.location}</TableCell>
                <TableCell>{equip.acquisitionDate}</TableCell>
                {role === 'admin' && (
                  <TableCell>
                    <IconButton onClick={() => handleOpen(equip)}><GoPencil /></IconButton>
                    <IconButton
                    color="error"
                    onClick={() => {
                      console.log('equip:', equip);
                      if (equip && equip._id) {
                        console.log('Deleting equipment with id:', equip._id);
                        handleDeleteEquipment(equip._id);
                      } else {
                        console.error('equip._id is undefined or null');
                      }
                    }}
                  >
                    <GoTrash />
                  </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedEquip && (
        <EditEquipmentModal
          isOpen={addModalOpen}
          handleClose={handleClose}
          equip={selectedEquip}
          handleUpdateEquipment={handleUpdateEquipment}
        />
      )}
    </div>
  );
};

export default Dashboard;
