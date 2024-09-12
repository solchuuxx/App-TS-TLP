import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/usuario.service';

// Registro de usuario
export const register = async (req: Request, res: Response) => {
  const { username, password, email, role } = req.body;

  try {
    const newUser = await registerUser(username, password, email, role);
    res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    } else {
      res.status(500).json({ message: 'Error al registrar usuario', error: 'Error desconocido' });
    }
  }
};

// Inicio de sesión
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    } else {
      res.status(500).json({ message: 'Error en el inicio de sesión', error: 'Error desconocido' });
    }
  }
};
