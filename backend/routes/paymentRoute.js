import express from 'express';
import { createOrder, verifyPayment, getPaymentStatus } from '../controllers/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-order', authMiddleware, createOrder);
router.post('/verify', authMiddleware, verifyPayment);
router.get('/status', authMiddleware, getPaymentStatus);

export default router;
