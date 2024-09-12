import express from 'express';
import { createEquipment, getEquipments, updateEquipment, deleteEquipment } from '../controllers/equipmentController';
import { verifyToken, checkRole } from '../middlewares/authMiddleware'; 

const router = express.Router();

router.post('/equipments', verifyToken, checkRole('admin'), createEquipment);

router.get('/equipments', verifyToken, getEquipments);

router.put('/equipments/:id', verifyToken, checkRole('admin'), updateEquipment);

router.delete('/equipments/:id', verifyToken, checkRole('admin'), deleteEquipment);

export default router;
