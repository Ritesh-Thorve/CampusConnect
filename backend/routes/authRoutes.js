import express from 'express';
import { signUp, login, syncGoogleUser } from '../controllers/authController.js';
import { authLimiter } from '../middlewares/rateLimitMiddleware.js'
const router = express.Router();

router.post('/signup', authLimiter, signUp);
router.post('/login', authLimiter,login);
router.post('/google/sync', syncGoogleUser)

export default router;
