import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import JwtPayload from '../types/index'; 

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  console.log('Token recibido:', token);

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY as string);

    console.log('Token verificado:', verified);

    if (typeof verified !== 'string') {
      req.user = verified as JwtPayload;
      next();
    } else {
      return res.status(400).json({ message: 'Token no válido.' });
    }
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(400).json({ message: 'Token no válido.' });
  }
}

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'No tienes los permisos necesarios.' });
    }
    next();
  };
};
