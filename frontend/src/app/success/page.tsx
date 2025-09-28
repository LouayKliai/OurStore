'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LocalOrder } from '@/lib/types';
import { orderStorage } from '@/lib/localStorage';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<LocalOrder | null>(null);

  useEffect(() => {
    if (orderId) {
      const orders = orderStorage.getOrders();
      const foundOrder = orders.find(o => o.id === orderId);
      setOrder(foundOrder || null);
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-24">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-300 to-red-400 rounded-full flex items-center justify-center shadow-lg">
              <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-primary-800 mb-4">
              Order Not Found
            </h1>
            <p className="text-xl text-primary-600 mb-8 max-w-md mx-auto">
              We couldn&apos;t find the order you&apos;re looking for.
            </p>
            <Link href="/">
              <Button className="shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-primary-800 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto leading-relaxed">
            Thank you for your order. We&apos;ll contact you soon to confirm the details and arrange delivery.
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-8 shadow-xl border-2 border-primary-200">
          <CardHeader className="bg-gradient-to-r from-primary-100 to-accent-100">
            <CardTitle className="text-2xl font-bold text-primary-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
                <h3 className="font-bold text-primary-800 mb-4 text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Order Information
                </h3>
                <div className="space-y-3">
                  <p className="text-primary-700"><span className="font-semibold">Order ID:</span> {order.id}</p>
                  <p className="text-primary-700"><span className="font-semibold">Date:</span> {formatDate(order.created_at)}</p>
                  <p className="text-primary-700">
                    <span className="font-semibold">Status:</span> 
                    <span className="capitalize text-accent-600 font-bold ml-2 px-3 py-1 bg-accent-100 rounded-full text-sm">
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-accent-50 rounded-xl p-6 border border-accent-200">
                <h3 className="font-bold text-primary-800 mb-4 text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <p className="text-primary-700"><span className="font-semibold">Name:</span> {order.customer.name}</p>
                  <p className="text-primary-700"><span className="font-semibold">Phone:</span> {order.customer.phone}</p>
                  <p className="text-primary-700"><span className="font-semibold">Address:</span> {order.customer.address}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-bold text-primary-800 mb-6 text-xl flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order Items
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={`${item.id}-${item.color || 'default'}-${index}`} 
                       className="flex justify-between items-center p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border-2 border-primary-200 shadow-sm">
                    <div className="flex-1">
                      <p className="font-bold text-primary-800 text-lg">{item.name}</p>
                      {item.color && (
                        <p className="text-primary-600 mt-1 flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-accent-400"></span>
                          Color: {item.color}
                        </p>
                      )}
                      <p className="text-primary-600 font-semibold">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent-700 text-xl">
                        {formatPrice((parseFloat(item.price) * item.quantity).toString())}
                      </p>
                      <p className="text-primary-600">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-4 border-primary-300 pt-6 mt-8">
                <div className="flex justify-between items-center p-6 bg-gradient-to-r from-accent-100 to-accent-200 rounded-xl shadow-lg">
                  <span className="text-2xl font-bold text-primary-800">Total</span>
                  <span className="text-3xl font-bold text-accent-700">
                    {formatPrice(order.total.toString())}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 shadow-xl border-2 border-primary-200">
          <CardContent className="p-8">
            <h3 className="font-bold text-primary-800 mb-6 text-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              What happens next?
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                <span className="flex-shrink-0 w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">1</span>
                <p className="text-primary-700 font-medium text-lg">Our team will contact you within 24 hours to confirm your order details.</p>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-accent-50 rounded-xl border border-accent-200">
                <span className="flex-shrink-0 w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">2</span>
                <p className="text-primary-700 font-medium text-lg">We&apos;ll arrange delivery to your specified address.</p>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-primary-50 rounded-xl border border-primary-200">
                <span className="flex-shrink-0 w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">3</span>
                <p className="text-primary-700 font-medium text-lg">Payment will be collected upon delivery.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/">
            <Button variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Continue Shopping
              </span>
            </Button>
          </Link>
          <Button 
            size="lg"
            onClick={() => window.print()}
            className="shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4"
          >
            <span className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Order Details
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}