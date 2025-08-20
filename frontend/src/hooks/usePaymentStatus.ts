import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { fetchPaymentStatus } from "@/redux/features/payment/paymentSlice";

export const usePaymentStatus = () => {
  const dispatch = useAppDispatch();
  const { hasPaid, status, amount, createdAt, loading, error } = useAppSelector(
    (s) => s.payment
  );

  useEffect(() => {
    dispatch(fetchPaymentStatus());
  }, [dispatch]);

  return { hasPaid, status, amount, createdAt, loading, error };
};
