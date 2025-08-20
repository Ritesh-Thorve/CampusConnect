import { useAppSelector } from "@/redux/store/hooks";

export const usePaymentStatus = () => {
  const { hasPaid, status, amount, createdAt, loading, error } = useAppSelector(
    (s) => s.payment
  );

  return { hasPaid, status, amount, createdAt, loading, error };
};
