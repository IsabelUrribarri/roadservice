// routes/fuelRoutes.js
import express from 'express';
import { createFuel, getFuelByUnit, getMetrics } from '../controllers/fuelController.js';

const router = express.Router();

router.post('/', createFuel);
router.get('/unit/:id', getFuelByUnit);
router.get('/metrics/:id', getMetrics);

export default router;
