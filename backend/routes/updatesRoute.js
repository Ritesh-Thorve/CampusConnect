import express from 'express';
import { createUpdate, getAllUpdates, deleteUpdate, getUserUpdates } from '../controllers/updatesController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createUpdate);
router.get('/', getAllUpdates);
router.get('/your-updates', authMiddleware, getUserUpdates);
router.delete('/your-updates/delete/:id', authMiddleware, deleteUpdate);

export default router;