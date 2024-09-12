import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from '../interfaces/usuario.interface';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
