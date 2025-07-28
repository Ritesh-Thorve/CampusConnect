import { razorpay } from '../utils/razorpay.js';
import prisma from '../config/db.js';

export const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const userId = req.user.userId;

    const options = {
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    await prisma.payment.create({
      data: { userId, amount, razorpayId: order.id, status: 'created' }
    });

    res.json({ order });
  } catch (err) {
    next(err);
  }
};