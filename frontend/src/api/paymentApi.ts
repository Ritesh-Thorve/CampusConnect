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

// Get latest payment status
export const getPaymentStatus = async () => {
  const res = await axiosInstance.get("/payment/status", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data; // { status: "paid" } or { status: "unpaid" }
};
