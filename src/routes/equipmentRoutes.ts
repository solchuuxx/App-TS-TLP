import { Router } from 'express';
import { createEquipment, getEquipments, updateEquipment, deleteEquipment } from '../controllers/equipmentController';
import verifyToken from '../middlewares/authMiddleware'; 


const router = Router();

router.post('/equipments', verifyToken, createEquipment);
router.get('/equipments', verifyToken, getEquipments);
router.put('/equipments/:id', verifyToken, updateEquipment);
router.delete('/equipments/:id', verifyToken, deleteEquipment);

export default router;
