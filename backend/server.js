import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { rateLimitMiddleware } from './middlewares/rateLimitMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import './jobs/autoDeleteOldRecords.js';

import authRoutes from './routes/authRoutes.js';
import profileRoute from './routes/profileRoute.js';
import updatesRoute from './routes/updatesRoute.js';
import trendsRoute from './routes/trendsRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import studentsRoute from './routes/studentsRoute.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimitMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoute);
app.use('/api/students', studentsRoute)
app.use('/api/updates', updatesRoute);
app.use('/api/trends', trendsRoute);
app.use('/api/payment', paymentRoute);

app.use('/', (req, res) => {
    res.send("server is running")
})

// Global Error Handler
app.use(errorHandlerMiddleware);


export default app