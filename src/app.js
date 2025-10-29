import express, { json } from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import cors from 'cors';
import areaRoutes from './routes/areaRoutes.js';
import areaAssetRoutes from './routes/areaAssetRoutes.js';
import modelAssetRoutes from './routes/modelAssetRoutes.js';
import stationRoutes from './routes/stationRoutes.js';
import sideRoutes from './routes/sideRoutes.js';
import configRoutes from './routes/configRoutes.js';
import registerRouter from './routes/registerRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import sidesWorkstationsRoutes from './routes/sidesWorkstationsRoutes.js';
import registerEntryExit from './routes/registerEntryExitRoutes.js';

dotenv.config();
const { Pool } = pkg;
const app = express();

// Middleware para parsear JSON
app.use(json());
app.use(cors({
  origin: JSON.parse(process.env.CORS_ORIGIN)
}));

// Conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  schema: process.env.DB_SCHEMA,
  timezone: 'America/Mexico_City'
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
app.use('/config', configRoutes)
app.use('/register', registerRouter);
app.use('/attendance', attendanceRoutes);
app.use('/sides-workstations', sidesWorkstationsRoutes)
app.use('/register-entry-exit', registerEntryExit);

export default app;