import express from 'express';
import { createTrend, getTrends } from '../controllers/trendsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createTrend);
router.get('/', getTrends);

export default router;
