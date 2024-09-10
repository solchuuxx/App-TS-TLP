import { Request, Response } from 'express';
import { Equipment } from '../models/Equipment';

export const createEquipment = async (req: Request, res: Response) => {
  try {
    const newEquipment = new Equipment(req.body);
    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear equipo', error });
  }
};

export const getEquipments = async (req: Request, res: Response) => {
  try {
    const equipments = await Equipment.find();
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener equipos', error });
  }
};

export const updateEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEquipment) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.status(200).json(updatedEquipment);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar equipo', error });
  }
};

export const deleteEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(id);
    if (!deletedEquipment) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.status(200).json({ message: 'Equipo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar equipo', error });
  }
};
