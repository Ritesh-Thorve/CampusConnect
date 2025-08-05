import React, { useState } from 'react';
import { X, Crown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const PaymentPrompt = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-300">
      <Card className={`relative max-w-md w-full p-6 bg-gradient-to-br from-background to-muted border-2 border-primary/20 shadow-2xl ${isVisible ? 'animate-in zoom-in-95 duration-300' : 'animate-out zoom-out-95 fade-out-0 duration-300'}`}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
        </button>

        <div className="text-center space-y-4">
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
              Get access to 30+ exclusive student profiles and advanced features
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 p-4 bg-muted/50 rounded-lg">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-semibold">30+ Premium Profiles</span>
          </div>

          <div className="space-y-3">
            <div className="text-3xl font-bold text-primary">
              ₹100
              <span className="text-sm text-muted-foreground font-normal ml-1">one-time</span>
            </div>

            <Button 
              className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground font-semibold"
              onClick={() => {
                // Here you would integrate with your payment system
                console.log('Payment initiated');
              }}
            >
              Unlock Now
            </Button>

            <p className="text-xs text-muted-foreground">
              Secure payment processed by Razorpay
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentPrompt;
