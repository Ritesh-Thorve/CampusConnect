import express from 'express';
import { createUpdate, getAllUpdates, getUserUpdates } from '../controllers/updatesController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createUpdate);
router.get('/', getAllUpdates);
router.get('/your-updates', authMiddleware, getUserUpdates);

export default router;