import { Router } from 'express';
import { createEquipment, getEquipments, updateEquipment, deleteEquipment } from '../controllers/equipmentController';


const router = Router();

router.post('/equipments', createEquipment);
router.get('/equipments', getEquipments);
router.put('/equipments/:id', updateEquipment);
router.delete('/equipments/:id', deleteEquipment);

export default router;
