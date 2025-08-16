import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { fetchPaymentStatus, markPaid } from "../redux/features/payment/paymentSlice";

// Custom hook to manage payment status.

export const usePaymentStatus = () => {
  const dispatch = useAppDispatch();
  const { hasPaid, loading } = useAppSelector((state) => state.payment);

  useEffect(() => {
    // Fetch current payment status from backend on mount
    dispatch(fetchPaymentStatus());
  }, [dispatch]);

  // Optional: function to manually mark as paid after successful Razorpay payment
  const setPaid = () => {
    dispatch(markPaid());
  };

  return { hasPaid, loading, setPaid };
};
