import express from 'express';
import { signUp, login, googleAuth } from '../controllers/authController.js';
import { authLimiter } from '../middlewares/rateLimitMiddleware.js'
const router = express.Router();

router.post('/signup', authLimiter, signUp);
router.post('/login', authLimiter,login);
router.post('/google', googleAuth);
router.post('/google', googleAuth);

export default router;
