
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductDisplay from './ProductDisplay';
import PaymentPanel from './PaymentPanel';
import TransactionHistory from './TransactionHistory';
import { Coffee, Droplets, Waves, Grape, Power } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: number;
  name: string;
  price: number;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

export interface Transaction {
  id: string;
  item: string;
  price: number;
  amountPaid: number;
  timestamp: Date;
  change: number;
}

const VendingMachine = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [machineOn, setMachineOn] = useState(true);
  const { toast } = useToast();

  const products: Product[] = [
    {
      id: 1,
      name: 'Coffee',
      price: 100,
      icon: Coffee,
      color: 'from-amber-600 to-amber-800',
      description: 'Fresh hot coffee'
    },
    {
      id: 2,
      name: 'Cold Drink',
      price: 50,
      icon: Droplets,
      color: 'from-blue-500 to-blue-700',
      description: 'Refreshing cold beverage'
    },
    {
      id: 3,
      name: 'Water Bottle',
      price: 20,
      icon: Waves,
      color: 'from-cyan-400 to-cyan-600',
      description: 'Pure drinking water'
    },
    {
      id: 4,
      name: 'Juice',
      price: 60,
      icon: Grape,
      color: 'from-purple-500 to-purple-700',
      description: 'Fresh fruit juice'
    }
  ];

  const handleProductSelect = (product: Product) => {
    if (!machineOn) {
      toast({
        title: "Machine Offline",
        description: "Please turn on the vending machine first",
        variant: "destructive"
      });
      return;
    }
    setSelectedProduct(product);
  };

  const handlePaymentComplete = (amountPaid: number) => {
    if (!selectedProduct) return;

    const change = amountPaid - selectedProduct.price;
    const transaction: Transaction = {
      id: Date.now().toString(),
      item: selectedProduct.name,
      price: selectedProduct.price,
      amountPaid,
      timestamp: new Date(),
      change: Math.max(0, change)
    };

    setTransactions(prev => [transaction, ...prev]);
    setIsProcessing(true);

    // Simulate dispensing animation
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedProduct(null);
      toast({
        title: "Transaction Complete",
        description: `Here is your ${selectedProduct.name}. Have a nice day!`,
      });
    }, 3000);
  };

  const handleMachineToggle = () => {
    setMachineOn(!machineOn);
    if (machineOn) {
      setSelectedProduct(null);
      toast({
        title: "Machine Shutting Down",
        description: "Vending machine is now offline",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Machine Starting Up",
        description: "Vending machine is now online",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Vending Machine */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 shadow-2xl">
            <CardContent className="p-6">
              {/* Machine Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${machineOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <h1 className="text-2xl font-bold text-white">Digital Vending Machine</h1>
                </div>
                <Button
                  onClick={handleMachineToggle}
                  variant={machineOn ? "destructive" : "default"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Power className="w-4 h-4" />
                  <span>{machineOn ? 'Turn Off' : 'Turn On'}</span>
                </Button>
              </div>

              {/* Status Display */}
              <div className="bg-black p-4 rounded-lg mb-6 text-center">
                <div className="text-green-400 font-mono text-lg">
                  {!machineOn ? (
                    "MACHINE OFFLINE"
                  ) : isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full" />
                      <span>DISPENSING ITEM...</span>
                    </div>
                  ) : selectedProduct ? (
                    `SELECTED: ${selectedProduct.name.toUpperCase()} - ₹${selectedProduct.price}`
                  ) : (
                    "PLEASE SELECT AN ITEM"
                  )}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {products.map((product) => (
                  <ProductDisplay
                    key={product.id}
                    product={product}
                    isSelected={selectedProduct?.id === product.id}
                    onSelect={() => handleProductSelect(product)}
                    disabled={!machineOn || isProcessing}
                  />
                ))}
              </div>

              {/* Payment Panel */}
              {selectedProduct && machineOn && (
                <PaymentPanel
                  product={selectedProduct}
                  onPaymentComplete={handlePaymentComplete}
                  isProcessing={isProcessing}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-1">
          <TransactionHistory transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default VendingMachine;
