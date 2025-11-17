import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import unitRoutes from './routes/unitRoutes.js';
import fuelRoutes from './routes/fuelRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// CORS abierto para desarrollo (permite cualquier origen)
app.use(cors({ origin: '*' }));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de API
app.use('/api/units', unitRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// Ruta base
app.get('/', (req, res) => res.send('Road Service API running'));

// Middleware de manejo de errores
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
