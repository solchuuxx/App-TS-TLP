import { Schema, model } from 'mongoose';

const equipmentSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ['Disponible', 'En Reparación', 'Asignado'], default: 'Disponible' },
  location: { type: String, required: true },
  acquisitionDate: { type: String, required: true },
});

export const Equipment = model('Equipment', equipmentSchema);
