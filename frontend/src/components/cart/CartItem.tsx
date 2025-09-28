'use client';

import React from 'react';
import { CartItem as CartItemType } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id, item.color);
    } else {
      updateQuantity(item.id, newQuantity, item.color);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-6 bg-primary-50 rounded-xl border border-primary-200 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product Image Placeholder */}
      <div className="w-20 h-20 bg-gradient-to-br from-accent-200 to-accent-300 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
        <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-primary-800 truncate text-lg">{item.name}</h3>
        {item.color && (
          <p className="text-sm text-primary-600 mt-1">
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-accent-400"></span>
              Color: {item.color}
            </span>
          </p>
        )}
        <p className="text-xl font-bold text-accent-600 mt-2">
          {formatPrice(item.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3 bg-white rounded-lg p-2 shadow-sm">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-10 h-10 rounded-full border-2 border-accent-300 flex items-center justify-center hover:bg-accent-100 hover:border-accent-400 transition-all duration-200 font-bold text-accent-600"
        >
          <span>−</span>
        </button>
        
        <span className="w-16 text-center font-bold text-primary-800 text-lg">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= item.stock}
          className="w-10 h-10 rounded-full border-2 border-accent-300 flex items-center justify-center hover:bg-accent-100 hover:border-accent-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-accent-600"
        >
          <span>+</span>
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right bg-white rounded-lg p-3 shadow-sm min-w-[120px]">
        <p className="text-sm text-primary-600 font-medium">Total</p>
        <p className="font-bold text-primary-800 text-xl">
          {formatPrice((parseFloat(item.price) * item.quantity).toString())}
        </p>
      </div>

      {/* Remove Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => removeItem(item.id, item.color)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300 hover:border-red-400 shadow-sm"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Remove
      </Button>
    </div>
  );
}