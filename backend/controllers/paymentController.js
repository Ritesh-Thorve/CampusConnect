import { razorpay } from "../utils/razorpay.js";
import prisma from "../config/db.js";
import crypto from "crypto";

// Create a Razorpay order
export const createOrder = async (req, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.userId;
    const FIXED_AMOUNT = 100; // ₹100

    const options = {
      amount: FIXED_AMOUNT * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}_${userId}`,
    };

    const order = await razorpay.orders.create(options);

    // Save order in DB (requires razorpayId @unique in Prisma)
    await prisma.payment.upsert({
      where: { razorpayId: order.id },
      update: {
        amount: FIXED_AMOUNT,
        status: "created",
      },
      create: {
        userId,
        amount: FIXED_AMOUNT,
        razorpayId: order.id,
        status: "created",
      },
    });

    return res.json({
      success: true,
      message: "Order created successfully",
      amount: FIXED_AMOUNT,
      order,
    });
  } catch (err) {
    console.error("Error creating order:", err); // full error for debugging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Verify Razorpay payment signature and update DB
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    await prisma.payment.updateMany({
      where: { razorpayId: razorpay_order_id },
      data: {
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
      },
    });

    return res.json({ success: true, message: "Payment verified successfully" });
  } catch (err) {
    console.error("Payment verification failed:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user payment status
export const getPaymentStatus = async (req, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.userId;

    const payment = await prisma.payment.findFirst({
      where: { userId, status: "paid" },
      orderBy: { createdAt: "desc" },
    });

    return res.json({ status: payment ? "paid" : "unpaid" });
  } catch (err) {
    console.error("Error fetching payment status:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
