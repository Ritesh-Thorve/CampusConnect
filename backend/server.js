// server.js
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
import studentsRoute from './routes/studentsRoute.js';

dotenv.config();
const app = express();

// CORS setup
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimitMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoute);
app.use('/api/students', studentsRoute);
app.use('/api/updates', updatesRoute);
app.use('/api/trends', trendsRoute);
app.use('/api/payment', paymentRoute);

app.use('/', (req, res) => {
  res.send("server is running");
});

app.use(errorHandlerMiddleware);

export default app;
