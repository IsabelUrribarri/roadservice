// backend/routes/unitRoutes.js
import express from 'express';
import { getUnits, createUnit, getUnit, updateUnit, deleteUnit } from '../controllers/unitController.js';

const router = express.Router();

// Rutas para unidades
router.get('/', getUnits);          // GET /api/units -> todos los vehículos
router.post('/', createUnit);       // POST /api/units -> crear vehículo
router.get('/:id', getUnit);        // GET /api/units/:id -> un vehículo por id
router.put('/:id', updateUnit);     // PUT /api/units/:id -> actualizar vehículo
router.delete('/:id', deleteUnit);  // DELETE /api/units/:id -> eliminar vehículo

export default router;
