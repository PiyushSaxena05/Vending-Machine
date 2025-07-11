
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from './VendingMachine';

interface ProductDisplayProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  disabled: boolean;
}

const ProductDisplay = ({ product, isSelected, onSelect, disabled }: ProductDisplayProps) => {
  const IconComponent = product.icon;

  return (
    <Card className={`transition-all duration-300 cursor-pointer ${
      isSelected 
        ? 'ring-2 ring-blue-400 shadow-lg scale-105' 
        : 'hover:scale-102 hover:shadow-md'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <CardContent className="p-4">
        <Button
          onClick={onSelect}
          disabled={disabled}
          className={`w-full h-32 bg-gradient-to-br ${product.color} hover:opacity-90 transition-all duration-300 flex flex-col items-center justify-center space-y-2 text-white border-0`}
        >
          <IconComponent className="w-8 h-8" />
          <div className="text-center">
            <div className="font-semibold text-sm">{product.name}</div>
            <div className="text-xs opacity-90">{product.description}</div>
            <div className="text-lg font-bold mt-1">₹{product.price}</div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDisplay;
