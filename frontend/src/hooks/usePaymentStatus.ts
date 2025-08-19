import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { fetchPaymentStatus, markPaid } from "../redux/features/payment/paymentSlice";

export const usePaymentStatus = () => {
  const dispatch = useAppDispatch();
  const { hasPaid, loading, status } = useAppSelector((state) => state.payment);

  useEffect(() => {
    dispatch(fetchPaymentStatus());
  }, [dispatch]);

  // Call this after successful Razorpay payment
  const setPaid = () => {
    dispatch(markPaid());
  };

  return { hasPaid, loading, status, setPaid };
};
