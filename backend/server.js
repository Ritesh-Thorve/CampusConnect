import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import updatesRoutes from './routes/updatesRoutes.js';
import trendsRoutes from './routes/trendsRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { rateLimiterMiddleware } from './middlewares/rateLimitMiddleware.js';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 5000;


dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimiterMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/updates', updatesRoutes);
app.use('/api/trends', trendsRoutes);
app.use('/api/payment', paymentRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

