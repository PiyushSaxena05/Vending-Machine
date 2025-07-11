import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from './VendingMachine';
import { CreditCard, Banknote, Coins } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PaymentPanelProps {
  product: Product;
  onPaymentComplete: (amountPaid: number) => void;
  isProcessing: boolean;
}

const PaymentPanel = ({ product, onPaymentComplete, isProcessing }: PaymentPanelProps) => {
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [currentPayment, setCurrentPayment] = useState<string>('');
  const [paymentStage, setPaymentStage] = useState<'initial' | 'partial' | 'complete'>('initial');
  const { toast } = useToast();

  const denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500];

  const handleDenominationClick = (value: number) => {
    const newAmount = amountPaid + value;
    setAmountPaid(newAmount);
    setCurrentPayment(value.toString());
    
    toast({
      title: `Added ₹${value}`,
      description: `Total amount: ₹${newAmount}`,
    });
  };

  const handleManualPayment = () => {
    const amount = parseInt(currentPayment);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    const newAmount = amountPaid + amount;
    setAmountPaid(newAmount);
    setCurrentPayment('');
    
    toast({
      title: `Added ₹${amount}`,
      description: `Total amount: ₹${newAmount}`,
    });
  };

  const handlePayment = () => {
    if (amountPaid < product.price) {
      const remaining = product.price - amountPaid;
      setPaymentStage('partial');
      toast({
        title: "Insufficient Amount",
        description: `Please add ₹${remaining} more`,
        variant: "destructive"
      });
      return;
    }

    const change = amountPaid - product.price;
    if (change > 0) {
      toast({
        title: "Change Returned",
        description: `Returning ₹${change}`,
      });
    }

    onPaymentComplete(amountPaid);
    setAmountPaid(0);
    setPaymentStage('complete');
  };

  const handleReset = () => {
    setAmountPaid(0);
    setCurrentPayment('');
    setPaymentStage('initial');
  };

  const remaining = Math.max(0, product.price - amountPaid);
  const change = Math.max(0, amountPaid - product.price);

  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <CreditCard className="w-5 h-5" />
          <span>Payment for {product.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment Status */}
        <div className="bg-slate-900 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-white">
            <span>Item Price:</span>
            <span className="font-bold">₹{product.price}</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Amount Paid:</span>
            <span className="font-bold text-green-400">₹{amountPaid}</span>
          </div>
          {remaining > 0 && (
            <div className="flex justify-between text-white">
              <span>Remaining:</span>
              <span className="font-bold text-red-400">₹{remaining}</span>
            </div>
          )}
          {change > 0 && (
            <div className="flex justify-between text-white">
              <span>Change:</span>
              <span className="font-bold text-blue-400">₹{change}</span>
            </div>
          )}
        </div>

        {/* Quick Payment Buttons */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm font-medium">Quick Add:</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {denominations.map((value) => (
              <Button
                key={value}
                onClick={() => handleDenominationClick(value)}
                disabled={isProcessing}
                variant="outline"
                size="sm"
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                ₹{value}
              </Button>
            ))}
          </div>
        </div>

        {/* Manual Payment Input */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Banknote className="w-4 h-4 text-green-400" />
            <span className="text-white text-sm font-medium">Custom Amount:</span>
          </div>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Enter amount"
              value={currentPayment}
              onChange={(e) => setCurrentPayment(e.target.value)}
              disabled={isProcessing}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <Button
              onClick={handleManualPayment}
              disabled={isProcessing || !currentPayment}
              variant="outline"
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={handlePayment}
            disabled={isProcessing || amountPaid < product.price}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Processing...</span>
              </div>
            ) : amountPaid < product.price ? (
              `Need ₹${remaining} more`
            ) : (
              'Complete Purchase'
            )}
          </Button>
          <Button
            onClick={handleReset}
            disabled={isProcessing}
            variant="outline"
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentPanel;
