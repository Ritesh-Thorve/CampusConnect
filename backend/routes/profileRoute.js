import express from 'express';
import { createOrUpdateProfile, getMyProfile } from '../controllers/profileController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { profileUpload, handleMulterError } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getMyProfile )
router.post('/', authMiddleware, profileUpload, handleMulterError, createOrUpdateProfile);

export default router;
    