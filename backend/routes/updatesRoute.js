import express from 'express';
import { createUpdate, getAllUpdates } from '../controllers/updatesController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createUpdate);
router.get('/', getAllUpdates);

export default router;