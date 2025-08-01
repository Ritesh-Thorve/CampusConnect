import express from 'express';
import { createUpdate, getAllUpdates, deleteUpdate, getUserUpdates } from '../controllers/updatesController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createUpdate);
router.get('/', getAllUpdates);
router.get('/your-updates', authMiddleware, getUserUpdates);
router.delete('/your-upadates/delete', authMiddleware, deleteUpdate)

export default router;
