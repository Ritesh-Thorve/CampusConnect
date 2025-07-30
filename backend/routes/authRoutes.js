import express from 'express';
import { signUp, login, syncGoogleUser } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/google/sync', syncGoogleUser)

export default router;
