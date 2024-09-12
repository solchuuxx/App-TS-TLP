import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/usuario.interface';

export const registerUser = async (username: string, password: string, email: string, role: string): Promise<IUser> => {
  try {
    const isEmailAlreadyExist = await User.findOne({ email });

    if (isEmailAlreadyExist) {
      throw new Error('Email ya en uso');
    }

    // Encripta la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword, email, role });
    await newUser.save();
    return newUser;
  } catch (error: unknown) {
    // Verifica si el error es un objeto de Error
    if (error instanceof Error) {
      throw new Error(error.message || 'Error al registrar usuario');
    }
    throw new Error('Error al registrar usuario');
  }
};

export const loginUser = async (email: string, password: string): Promise<{ user: IUser; token: string }> => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verifica la contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Contraseña incorrecta');
    }

    // Crear token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY as string,
      { expiresIn: '1d' }
    );

    return { user, token };
  } catch (error: unknown) {
    // Verifica si el error es un objeto de Error
    if (error instanceof Error) {
      throw new Error(error.message || 'Error en el inicio de sesión');
    }
    throw new Error('Error en el inicio de sesión');
  }
};
