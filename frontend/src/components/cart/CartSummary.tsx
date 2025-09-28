'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function CartSummary() {
  const { items, total, itemsCount } = useCart();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border-2 border-primary-200 p-8 sticky top-4 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-primary-800">Order Summary</h2>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
          <span className="text-primary-700 font-medium">Items ({itemsCount})</span>
          <span className="text-primary-800 font-semibold">{formatPrice(total)}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
          <span className="text-primary-700 font-medium">Shipping</span>
          <span className="text-accent-600 font-semibold">Free</span>
        </div>
        
        <div className="border-t-2 border-primary-300 pt-4">
          <div className="flex justify-between items-center p-4 bg-accent-100 rounded-xl shadow-sm">
            <span className="text-primary-800 font-bold text-xl">Total</span>
            <span className="text-accent-700 font-bold text-2xl">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <Link href="/checkout" className="block">
        <Button className="w-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-bold py-4" size="lg">
          <span className="flex items-center justify-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Proceed to Checkout
          </span>
        </Button>
      </Link>
    </div>
  );
}