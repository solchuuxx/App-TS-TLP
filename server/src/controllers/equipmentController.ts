import { Request, Response } from 'express';
import EquipmentService from '../services/equipment.service';
import { Equipment } from '../interfaces/equipment.interface';

class EquipmentController {
  public async getEquipments(req: Request, res: Response) {
    try {
      const equipments: Equipment[] = await EquipmentService.getEquipments();
      
      if (!equipments || !equipments.length) {
        return res.status(404).json({ message: 'No hay equipos registrados' });
      }

      res.status(200).json(equipments);
    } catch (err) {
      console.error('Error al obtener equipos:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  public async getOneEquipment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const equipment = await EquipmentService.getOneEquipment(id);

      if (!equipment) {
        return res.status(404).json({ message: 'No existe el equipo' });
      }

      res.status(200).json(equipment);
    } catch (err) {
      console.error('Error al obtener el equipo:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  public async createEquipment(req: Request, res: Response) {
    try {
      const data: Equipment = req.body;

      const equipment = await EquipmentService.createEquipment(data);

      if (!equipment) {
        return res.status(500).json({ message: 'No se ha podido crear el equipo!' });
      }

      res.status(201).json(equipment);
    } catch (err) {
      console.error('Error en la creación del equipo:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  public async updateEquipment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: Partial<Equipment> = req.body; 

      const updatedEquipment = await EquipmentService.updateEquipment(id, data);

      if (!updatedEquipment) {
        return res.status(500).json({ message: 'No se ha podido actualizar el equipo!' });
      }

      res.status(200).json(updatedEquipment);
    } catch (err) {
      console.error('Error al actualizar el equipo:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  public async deleteEquipment(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await EquipmentService.deleteEquipment(id);

      if (!result) {
        return res.status(404).json({ message: 'Equipo no encontrado' });
      }

      res.status(200).json(result);
    } catch (err) {
      console.error('Error al eliminar el equipo:', err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default new EquipmentController();
