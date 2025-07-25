import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import updatesRoutes from './routes/updatesRoutes.js';
import trendsRoutes from './routes/trendsRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/updates', updatesRoutes);
app.use('/api/trends', trendsRoutes);
app.use('/api/payment', paymentRoutes);

app.use(errorHandler);

export default app;
