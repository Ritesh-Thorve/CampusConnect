import { axiosInstance } from "./axiosConfig";

// Create Razorpay order
export const createOrder = async () => {
  const res = await axiosInstance.post("/payment/create-order");
  return res.data;
};

// Verify payment after success
export const verifyPayment = async (data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const res = await axiosInstance.post("/payment/verify", data);
  return res.data;
};

// Get latest payment status only if user is logged in
export const getPaymentStatus = async () => {
  try {
    const token = localStorage.getItem("token");

    // Only call backend if user is logged in
    if (!token) {
      return { status: "guest" }; // clearer than null
    }

    const res = await axiosInstance.get("/payment/status", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data; 
  } catch (err: any) {
    console.error("Failed to fetch payment status:", err.message);
    return { status: "unpaid" }; 
  }
};



