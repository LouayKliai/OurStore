'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { CustomerInfo, LocalOrder } from '@/lib/types';
import { orderStorage } from '@/lib/localStorage';
import { generateOrderId } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-24">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-accent-300 to-accent-400 rounded-full flex items-center justify-center shadow-lg">
              <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5a2 2 0 100 4 2 2 0 000-4zm-6 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-primary-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-xl text-primary-600 mb-8 max-w-md mx-auto">
              Add some items to your cart before checking out.
            </p>
            <Link href="/">
              <Button size="lg" className="shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4">
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Continue Shopping
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleOrderSubmit = async (customerInfo: CustomerInfo) => {
    setLoading(true);
    
    try {
      // Generate a unique order ID for local storage
      const localOrderId = generateOrderId();
      
      // Create local order record
      const localOrder: LocalOrder = {
        id: localOrderId,
        items: [...items],
        customer: customerInfo,
        total,
        created_at: new Date().toISOString(),
        status: 'pending'
      };

      // Save to localStorage (no backend call for now)
      orderStorage.addOrder(localOrder);

      // Simulate order processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear cart and redirect to success page
      clearCart();
      router.push(`/success?orderId=${localOrderId}`);
      
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-primary-800">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-primary-50 rounded-xl border-2 border-primary-200 p-8 shadow-lg">
              <CheckoutForm onSubmit={handleOrderSubmit} loading={loading} />
            </div>

            <div className="mt-8">
              <Link href="/cart">
                <Button variant="outline" className="shadow-md hover:shadow-lg transition-all duration-300 hover:bg-primary-50">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Back to Cart
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border-2 border-primary-200 p-8 shadow-lg sticky top-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-primary-800">Your Order</h2>
              </div>
              
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.color || 'default'}-${index}`} 
                       className="flex justify-between p-4 bg-white rounded-lg shadow-sm border border-primary-200">
                    <div className="flex-1">
                      <p className="font-semibold text-primary-800">{item.name}</p>
                      {item.color && (
                        <p className="text-primary-600 text-sm mt-1">
                          <span className="inline-flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-accent-400"></span>
                            Color: {item.color}
                          </span>
                        </p>
                      )}
                      <p className="text-primary-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent-600 text-lg">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-primary-300 pt-6 mt-6">
                <div className="flex justify-between items-center p-4 bg-accent-100 rounded-xl shadow-sm">
                  <span className="text-primary-800 font-bold text-2xl">Total</span>
                  <span className="text-accent-700 font-bold text-3xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}