import React, { useState } from "react";
import { X, Crown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { markPaid } from "@/redux/features/payment/paymentSlice";
import { createOrder, verifyPayment } from "@/api/paymentApi";
import toast from "react-hot-toast";

interface PaymentPromptProps {
  onClose: () => void;
  hasPaid: boolean;
  loading: boolean;
}

const PaymentPrompt: React.FC<PaymentPromptProps> = ({ onClose, hasPaid, loading }) => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Hide modal if already paid or closed
  if (!isVisible || hasPaid) return null;

  const handlePayment = async () => {
    if (!user) {
      toast.error("You need to login first!");
      return;
    }

    try {
      toast.loading("Initializing payment...", { id: "payment" });

      // Create order from backend
      const { order } = await createOrder();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Campus Connect",
        description: "Premium Access",
        order_id: order.id,
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            dispatch(markPaid()); // instantly update state
            toast.success("Payment successful!");
            handleClose();
          } catch (err) {
            console.error("Payment verification failed:", err);
            toast.error("Payment verification failed. Please try again.");
          }
        },
        theme: { color: "#6D28D9" },
      };

      toast.dismiss("payment");
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      toast.error("Payment failed to initiate. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-300">
      <Card
        className={`relative max-w-md w-full p-6 bg-gradient-to-br from-background to-muted border-2 border-primary/20 shadow-2xl ${
          isVisible
            ? "animate-in zoom-in-95 duration-300"
            : "animate-out zoom-out-95 fade-out-0 duration-300"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
        </button>

        <div className="text-center space-y-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Checking payment status...
            </p>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-gradient-to-r from-primary to-purple-600">
                  <Crown className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Unlock Premium Access
                </h3>
                <p className="text-muted-foreground">
                  Get access to 30+ exclusive student profiles and advanced
                  features
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 p-4 bg-muted/50 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold">30+ Premium Profiles</span>
              </div>

              <div className="space-y-3">
                <div className="text-3xl font-bold text-primary">
                  ₹100
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    one-time
                  </span>
                </div>

                <Button
                  className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground font-semibold"
                  onClick={handlePayment}
                >
                  Unlock Now
                </Button>

                <p className="text-xs text-muted-foreground">
                  Secure payment processed by Razorpay
                </p>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaymentPrompt;
