import mongoose, { Document, Schema } from 'mongoose';
import { Equipment } from '../interfaces/equipment.interface';

const EquipmentSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ['Disponible', 'En Reparación', 'Asignado'], required: true },
  location: { type: String, required: true },
  acquisitionDate: { type: String, required: true },
});

const EquipmentModel = mongoose.model<Equipment & Document>('Equipment', EquipmentSchema);

export default EquipmentModel;
