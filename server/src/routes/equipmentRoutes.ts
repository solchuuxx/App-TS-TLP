import express from 'express';
import EquipmentController from '../controllers/equipmentController';
import { verifyToken, checkRole } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/equipments', verifyToken, checkRole('admin'), EquipmentController.createEquipment);

router.get('/equipments', verifyToken, EquipmentController.getEquipments);

router.put('/equipments/:id', verifyToken, checkRole('admin'), EquipmentController.updateEquipment);

router.delete('/equipments/:id', verifyToken, checkRole('admin'), EquipmentController.deleteEquipment);

export default router;
