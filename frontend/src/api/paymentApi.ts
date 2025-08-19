import { axiosInstance } from "./axiosConfig";

export const createOrder = async () => {
  try {
    const res = await axiosInstance.post("/payment/create-order");
    return res.data;
  } catch (err: any) {
    console.error("Payment initiation failed:", err.response?.data || err.message);
    throw err;
  }
};

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

export const getPaymentStatus = async (): Promise<{ hasPaid: boolean }> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { hasPaid: false }; 
    }

    const res = await axiosInstance.get("/payment/status", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Normalize API response → always boolean
    return { hasPaid: res.data.status === "paid" };
  } catch (err: any) {
    console.error("Failed to fetch payment status:", err.response?.data || err.message);
    return { hasPaid: false };
  }
};
