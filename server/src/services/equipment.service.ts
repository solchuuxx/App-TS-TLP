import { Equipment } from '../interfaces/equipment.interface';
import EquipmentModel from '../models/Equipment';

class EquipmentService {
  public async getEquipments(): Promise<Equipment[]> {
    try {
      const equipments = await EquipmentModel.find(); 
      return equipments;
    } catch (err) {
      console.error('Error al obtener equipos desde el servicio:', err);
      throw err;
    }
  }

  public async getOneEquipment(id: string): Promise<Equipment | null> {
    try {
      const equipment = await EquipmentModel.findById(id); 
      return equipment;
    } catch (err) {
      console.error('Error al obtener un equipo desde el servicio:', err);
      throw err;
    }
  }

  public async createEquipment(data: Equipment): Promise<Equipment> {
    try {
      const newEquipment = new EquipmentModel(data); 
      await newEquipment.save(); 
      return newEquipment;
    } catch (err) {
      console.error('Error al crear un equipo desde el servicio:', err);
      throw err;
    }
  }

  public async updateEquipment(id: string, data: Partial<Equipment>): Promise<Equipment | null> {
    try {
      const updatedEquipment = await EquipmentModel.findByIdAndUpdate(id, data, { new: true }); 
      return updatedEquipment;
    } catch (err) {
      console.error('Error al actualizar un equipo desde el servicio:', err);
      throw err;
    }
  }

  public async deleteEquipment(id: string): Promise<{ message: string } | null> {
    try {
      const result = await EquipmentModel.findByIdAndDelete(id);
      if (result) {
        return { message: 'Equipo eliminado exitosamente' };
      }
      return { message: 'Equipo no encontrado' };
    } catch (err) {
      console.error('Error al eliminar un equipo desde el servicio:', err);
      throw err;
    }
  }
}

export default new EquipmentService();
