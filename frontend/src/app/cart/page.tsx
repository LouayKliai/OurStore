'use client';

import React, { useState, useEffect } from 'react';
import { LocalOrder } from '@/lib/types';
import { orderStorage } from '@/lib/localStorage';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';


export default function CartPage() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      try {
        const storedOrders = orderStorage.getOrders();
        setOrders([...storedOrders].reverse());
      } catch (error) {
        console.error('Error loading orders:', error);
        setOrders([]);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(loadOrders, 100);
    return () => clearTimeout(timer);
  }, []);

  const clearAllOrders = () => {
    if (window.confirm('Are you sure you want to clear all orders?')) {
      orderStorage.clearOrders();
      setOrders([]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 pt-20 sm:pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-primary-200 rounded-lg w-64"></div>
            <div className="h-6 bg-primary-200 rounded w-32"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-primary-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 pt-20 sm:pt-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-primary-800 mb-4">{t('cart.noOrders')}</h2>
          <p className="text-lg text-primary-600 mb-8">
            {t('cart.noOrdersDescription')}
          </p>
          <Link href="/">
            <Button size="lg" className="shadow-xl hover:shadow-2xl transition-all duration-300">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {t('cart.startShopping')}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 pt-20 sm:pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary-800 mb-2">{t('cart.myOrders')}</h1>
            <p className="text-lg text-primary-600">{orders.length} {t('cart.orders')} {orders.length !== 1 ? 's' : ''} {t('cart.total')}</p>
          </div>
          <Button
            variant="outline"
            onClick={clearAllOrders}
            className="mt-4 sm:mt-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {t('cart.clearAll')}
          </Button>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-primary-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-primary-100 to-accent-100 px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-800">Order #{order.id.slice(-8)}</h3>
                      <p className="text-sm text-primary-600">{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent-600">{formatPrice(order.total.toString())}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Customer Info */}
                  <div className="bg-primary-50 rounded-xl p-4">
                    <h4 className="font-semibold text-primary-800 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('cart.customerInformation')}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">{t('cart.name')}:</span> {order.customer.name}</div>
                      <div><span className="font-medium">{t('cart.phone')}:</span> <a href={`tel:${order.customer.phone}`} className="text-accent-600 hover:text-accent-700">{order.customer.phone}</a></div>
                      <div><span className="font-medium">{t('cart.address')}:</span> {order.customer.address}</div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-accent-50 rounded-xl p-4">
                    <h4 className="font-semibold text-primary-800 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {t('cart.orderSummary')}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>{t('cart.items')}:</span> <span className="font-medium">{order.items.length}</span></div>
                      <div className="flex justify-between"><span>{t('cart.total')}:</span> <span className="font-bold text-accent-600">{formatPrice(order.total.toString())}</span></div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-semibold text-primary-800 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {t('cart.itemsOrdered')} ({order.items.length})
                  </h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h5 className="font-medium text-primary-800">{item.name}</h5>
                          <div className="flex gap-4 text-sm text-primary-600 mt-1">
                            {item.color && <span>{t('cart.color')}: {item.color}</span>}
                            <span>{t('cart.qty')}: {item.quantity}</span>
                            <span>{t('cart.unit')}: {formatPrice(item.price)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-accent-600">
                            {formatPrice((parseFloat(item.price) * item.quantity).toString())}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Products */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                {t('cart.backToProducts')}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}