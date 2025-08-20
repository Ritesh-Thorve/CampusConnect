import { razorpay } from "../utils/razorpay.js";
import prisma from "../config/db.js";
import crypto from "crypto";

// Create Order
export const createOrder = async (req, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.userId;
    const FIXED_AMOUNT = 100; // ₹100

    // Check if user already has a paid payment
    const existingPayment = await prisma.payment.findFirst({
      where: { userId, status: "paid" },
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "You have already completed the payment.",
      });
    }

    // Create new Razorpay order
    const options = {
      amount: FIXED_AMOUNT * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}_${userId}`,
    };

    const order = await razorpay.orders.create(options);

    // Check if this Razorpay order already exists (avoid duplicate crash)
    const existingOrder = await prisma.payment.findUnique({
      where: { razorpayId: order.id },
    });

    if (!existingOrder) {
      await prisma.payment.create({
        data: {
          userId,
          amount: FIXED_AMOUNT,
          razorpayId: order.id,
          status: "created",
        },
      });
    }

    return res.json({
      success: true,
      message: "Order created successfully",
      amount: FIXED_AMOUNT,
      order,
    });
  } catch (err) {
    // Prisma-specific error handling
    if (err.code === "P2002") {
      console.error(
        "Prisma unique constraint failed (duplicate razorpayId):",
        err.meta?.target
      );
      return res.status(400).json({
        error: "Order already exists for this razorpayId",
        details: err.meta?.target,
      });
    }

    // Razorpay API errors
    if (err.error && err.error.description) {
      console.error("Razorpay error:", err.error.description);
      return res.status(400).json({
        error: "Razorpay API Error",
        details: err.error.description,
      });
    }

    // Generic error logging
    console.error("Error creating order:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing payment details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    await prisma.payment.update({
      where: { razorpayId: razorpay_order_id },
      data: {
        status: "paid",
      },
    });

    return res.json({ success: true, message: "Payment verified successfully" });
  } catch (err) {
    console.error("Payment verification failed:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
};

// Get Payment Status
export const getPaymentStatus = async (req, res) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.userId;

    // Get the latest payment for this user
    const payment = await prisma.payment.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!payment) {
      return res.json({ status: "unpaid" });
    }

    return res.json({
      status: payment.status,
      amount: payment.amount,
      createdAt: payment.createdAt,
    });
  } catch (err) {
    console.error("Error fetching payment status:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
};
