import express, { json } from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import cors from 'cors';
import areaRoutes from './routes/areaRoutes.js';
import areaAssetRoutes from './routes/areaAssetRoutes.js';
import modelAssetRoutes from './routes/modelAssetRoutes.js';
import stationRoutes from './routes/stationRoutes.js';
import sideRoutes from './routes/sideRoutes.js';

dotenv.config();
const { Pool } = pkg;
const app = express();

// Middleware para parsear JSON
app.use(json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  schema: process.env.DB_SCHEMA
});

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('API activa');
});

// Rutas
app.use('/areas', areaRoutes);
app.use('/area-assets', areaAssetRoutes);
app.use('/model-assets', modelAssetRoutes);
app.use('/stations', stationRoutes);
app.use('/sides', sideRoutes);

export default app;