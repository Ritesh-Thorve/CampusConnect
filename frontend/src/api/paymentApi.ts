import { axiosInstance } from "./axiosConfig";

// Create Razorpay order
export const createOrder = async () => {
  try {
    const res = await axiosInstance.post("/payment/create-order");
    return res.data;
  } catch (err: any) {
    console.error("Payment initiation failed:", err.response?.data || err.message);
    throw err;
  }
};

// Verify Razorpay payment
export const verifyPayment = async (data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  try {
    const res = await axiosInstance.post("/payment/verify", data);
    return res.data;
  } catch (err: any) {
    console.error("Payment verification failed:", err.response?.data || err.message);
    throw err;
  }
};

// Get payment status
export const getPaymentStatus = async (): Promise<{
  hasPaid: boolean;
  status: "paid" | "created" | "unpaid";
  amount?: number;
  createdAt?: string;
}> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { hasPaid: false, status: "unpaid" };
    }

    const res = await axiosInstance.get("/payment/status", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { status, amount, createdAt } = res.data;

    return {
      hasPaid: status === "paid",
      status,
      amount,
      createdAt,
    };
  } catch (err: any) {
    console.error("Failed to fetch payment status:", err.response?.data || err.message);
    return { hasPaid: false, status: "unpaid" };
  }
};
