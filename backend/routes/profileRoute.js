import express from 'express';
import { createOrUpdateProfile, getProfile } from '../controllers/profileController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { profileUpload, handleMulterError } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/update', authMiddleware, profileUpload, handleMulterError, createOrUpdateProfile);
router.get('/me', authMiddleware, getProfile);

export default router;
    