import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { fetchPaymentStatus } from "@/redux/features/payment/paymentSlice";

export const usePaymentStatus = () => {
  const dispatch = useAppDispatch();
  const { hasPaid, status, amount, createdAt, loading, error } = useAppSelector(
    (s) => s.payment
  );

  useEffect(() => {
    // fire only once on mount
    dispatch(fetchPaymentStatus())
      .unwrap()
      .catch(() => {
        console.warn("Payment status fetch failed, continuing as unpaid");
      });
  }, [dispatch]);

  return { hasPaid, status, amount, createdAt, loading, error };
};
