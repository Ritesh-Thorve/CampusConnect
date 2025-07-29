import express from 'express';
import { createUpdate, getUpdates, deleteUpdate } from '../controllers/updatesController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createUpdate);
router.get('/', getUpdates);
router.delete('/:id', authMiddleware, deleteUpdate);

export default router;
