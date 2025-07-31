import { razorpay } from "../utils/razorpay.js";
import prisma from "../config/db.js";

/**
 * @desc Create a Razorpay order with a fixed amount of ₹100
 * @route POST /payment/order
 * @access Private (JWT Required)
 */
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const FIXED_AMOUNT = 100; // ₹100

    // Razorpay expects amount in paise
    const options = {
      amount: FIXED_AMOUNT * 100, // 100 * 100 = 10,000 paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    // Create order in Razorpay
    const order = await razorpay.orders.create(options);

    // Save order details in DB
    await prisma.payment.create({
      data: {
        userId,
        amount: FIXED_AMOUNT,
        razorpayId: order.id,
        status: "created"
      }
    });

    return res.json({
      message: "Order created successfully",
      amount: FIXED_AMOUNT,
      order
    });
  } catch (err) {
    console.error("Error creating order:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
