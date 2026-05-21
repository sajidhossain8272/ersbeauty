'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
  maxStock?: number;
}

export default function QuantitySelector({ quantity, onChange, maxStock = 10 }: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxStock) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</span>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit bg-gray-50">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          className="px-3.5 py-2.5 bg-white border-r border-gray-300 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors select-none"
        >
          <Minus size={14} className="stroke-[3]" />
        </button>
        
        <span className="w-12 text-center font-bold text-gray-800 text-sm select-none">
          {quantity}
        </span>
        
        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= maxStock}
          className="px-3.5 py-2.5 bg-white border-l border-gray-300 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors select-none"
        >
          <Plus size={14} className="stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
