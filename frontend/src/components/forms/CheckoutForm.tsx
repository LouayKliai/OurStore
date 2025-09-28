'use client';

import React, { useState } from 'react';
import { CustomerInfo } from '@/lib/types';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { validatePhone } from '@/lib/utils';

interface CheckoutFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
  loading?: boolean;
}

export function CheckoutForm({ onSubmit, loading = false }: CheckoutFormProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(customerInfo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary-800">
            Contact Information
          </h2>
        </div>
        
        <div className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            value={customerInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            placeholder="Enter your full name"
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="Enter your phone number"
            required
          />

          <TextArea
            label="Delivery Address"
            value={customerInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            error={errors.address}
            placeholder="Enter your complete delivery address"
            rows={4}
            required
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent-100 to-accent-200 border-2 border-accent-300 rounded-xl p-6 shadow-inner">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-primary-800 mb-2 text-lg">Order Process</h3>
            <p className="text-primary-700 leading-relaxed">
              This is a demo version. Your order will be saved locally and you&apos;ll receive a confirmation.
              In the full version, our team will contact you within 24 hours to confirm the details and arrange delivery.
            </p>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        loading={loading}
        className="w-full shadow-xl hover:shadow-2xl transition-all duration-300 text-xl py-4"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Placing Order...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Place Order
          </span>
        )}
      </Button>
    </form>
  );
}