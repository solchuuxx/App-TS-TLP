import React, { useEffect, useState } from 'react';
import EquipmentService from '../../../server/src/services/equipment.service';
import { Product } from '../types/index';

const Dashboard: React.FC = () => {
  const [equipments, setEquipments] = useState<Product[]>([]);
  const [newEquipment, setNewEquipment] = useState<Product>({
    name: '',
    type: '',
    status: 'Disponible',
    location: '',
    acquisitionDate: ''
  });

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const { data } = await EquipmentService.getEquipments();
        setEquipments(data);
      } catch (error) {
        console.error('Error fetching equipments', error);
      }
    };
    fetchEquipments();
  }, []);

  const handleAddEquipment = async () => {
    try {
      const { data } = await EquipmentService.createEquipment(newEquipment);
      setEquipments([...equipments, data]);
      setNewEquipment({
        name: '',
        type: '',
        status: 'Disponible',
        location: '',
        acquisitionDate: ''
      });
    } catch (error) {
      console.error('Error adding equipment', error);
    }
  };

  const handleUpdateEquipment = async (id: string, updatedEquipment: Product) => {
    try {
      if (id) {
        const { data } = await EquipmentService.updateEquipment(id, updatedEquipment);
        setEquipments(equipments.map(e => (e.id === id ? data : e)));
      }
    } catch (error) {
      console.error('Error updating equipment', error);
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    try {
      if (id) {
        await EquipmentService.deleteEquipment(id);
        setEquipments(equipments.filter(e => e.id !== id));
      }
    } catch (error) {
      console.error('Error deleting equipment', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Equipos</h3>
        <ul>
          {equipments.map((equipment) => (
            <li key={equipment.id!}>
              {equipment.name} - {equipment.type} - {equipment.status} - {equipment.location} - {equipment.acquisitionDate}
              <button onClick={() => equipment.id && handleUpdateEquipment(equipment.id, { ...equipment, status: 'En Reparación' })}>Update</button>
              <button onClick={() => equipment.id && handleDeleteEquipment(equipment.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Nombre del Equipo"
          value={newEquipment.name}
          onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipo"
          value={newEquipment.type}
          onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
        />
        <select
          value={newEquipment.status}
          onChange={(e) => setNewEquipment({ ...newEquipment, status: e.target.value as 'Disponible' | 'En Reparación' | 'Asignado' })}
        >
          <option value="Disponible">Disponible</option>
          <option value="En Reparación">En Reparación</option>
          <option value="Asignado">Asignado</option>
        </select>
        <input
          type="text"
          placeholder="Ubicación"
          value={newEquipment.location}
          onChange={(e) => setNewEquipment({ ...newEquipment, location: e.target.value })}
        />
        <input
          type="date"
          placeholder="Fecha de Adquisición"
          value={newEquipment.acquisitionDate}
          onChange={(e) => setNewEquipment({ ...newEquipment, acquisitionDate: e.target.value })}
        />
        <button onClick={handleAddEquipment}>Añadir Equipo</button>
      </div>
    </div>
  );
};

export default Dashboard;
