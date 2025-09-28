'use client';

import React, { useState, useEffect } from 'react';
import { CustomerInfo, Product, LocalOrder } from '@/lib/types';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { validatePhone, generateOrderId, formatPrice } from '@/lib/utils';
import { orderStorage } from '@/lib/localStorage';
import { customerStorage } from '@/lib/customerStorage';
import { useTranslation } from '@/hooks/useTranslation';

interface ContactFormProps {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  onSuccess: (orderId: string) => void;
  onCancel: () => void;
}

export function ContactForm({ product, selectedColor, selectedSize, quantity, onSuccess, onCancel }: ContactFormProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});
  const [submitting, setSubmitting] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const { t } = useTranslation();

  // Load saved customer info on component mount
  useEffect(() => {
    const savedCustomerInfo = customerStorage.getCustomerInfo();
    if (savedCustomerInfo) {
      setCustomerInfo(savedCustomerInfo);
      setIsAutoFilled(true);
    }
  }, []);

  const totalPrice = parseFloat(product.price) * quantity;

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Remove auto-fill indicator when user modifies fields
    if (isAutoFilled) {
      setIsAutoFilled(false);
    }
  };

  const clearCustomerInfo = () => {
    setCustomerInfo({ name: '', address: '', phone: '' });
    setErrors({});
    setIsAutoFilled(false);
    customerStorage.clearCustomerInfo();
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = t('contact.form.name.required');
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = t('contact.form.address.required');
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = t('contact.form.phone.required');
    } else if (!validatePhone(customerInfo.phone)) {
      newErrors.phone = t('contact.form.phone.invalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    
    try {
      // Generate a unique order ID for local storage
      const localOrderId = generateOrderId();
      
      // Create local order record
      const localOrder: LocalOrder = {
        id: localOrderId,
        items: [{
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          stock: product.stock,
          color: selectedColor || undefined
        }],
        customer: customerInfo,
        total: totalPrice,
        created_at: new Date().toISOString(),
        status: 'pending'
      };

      // Save to localStorage
      orderStorage.addOrder(localOrder);

      // Save customer info for future use
      customerStorage.saveCustomerInfo(customerInfo);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Call success callback
      onSuccess(localOrderId);
      
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary - Responsive */}
      <div className="bg-gradient-to-r from-accent-100 to-accent-200 border-2 border-accent-300 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-inner">
        <h4 className="font-bold text-primary-800 mb-3 text-base sm:text-lg flex items-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {t('contact.form.yourOrder')}
        </h4>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm space-y-2 sm:space-y-0">
          <div className="flex-1">
            <p className="font-semibold text-primary-800 text-sm sm:text-base">{product.name}</p>
            <p className="text-xs sm:text-sm text-primary-600">
              {t('contact.form.quantity')}: {quantity}
              {selectedColor && ` • ${t('contact.form.color')}: ${selectedColor}`}
              {selectedSize && ` • ${t('contact.form.size')}: ${selectedSize}`}
            </p>
          </div>
          <p className="font-bold text-accent-600 text-lg sm:text-xl text-right sm:text-left">{formatPrice(totalPrice.toString())}</p>
        </div>
      </div>

      {/* Auto-fill Status */}
      {isAutoFilled && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 text-sm sm:text-base">{t('contact.form.autoFillLoaded')}</h4>
                <p className="text-green-700 text-xs sm:text-sm">{t('contact.form.autoFillDescription')}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearCustomerInfo}
              className="text-green-700 hover:text-green-800 border-green-300 hover:bg-green-50 self-start sm:self-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {t('contact.form.clear')}
            </Button>
          </div>
        </div>
      )}

      {/* Contact Form - Responsive */}
      <div className="space-y-4 sm:space-y-6">
        <Input
          label={t('contact.form.name.label')}
          type="text"
          value={customerInfo.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
          placeholder={t('contact.form.name.placeholder')}
          required
        />

        <Input
          label={t('contact.form.phone.label')}
          type="tel"
          value={customerInfo.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={errors.phone}
          placeholder={t('contact.form.phone.placeholder')}
          required
        />

        <TextArea
          label={t('contact.form.address.label')}
          value={customerInfo.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          error={errors.address}
          placeholder={t('contact.form.address.placeholder')}
          rows={3}
          required
        />
      </div>

      {/* Info Box - Responsive */}
      {/* <div className="bg-gradient-to-r from-primary-100 to-primary-200 border-2 border-primary-300 rounded-xl p-4 sm:p-6 shadow-inner mb-2">
        <div className="flex flex-wrap items-start gap-3">
          <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="min-w-[180px] flex-1">
            <h4 className="font-bold text-primary-800 mb-2 text-base sm:text-lg">How it works:</h4>
            <ul className="text-primary-700 leading-relaxed space-y-1 text-xs sm:text-sm">
              <li>• Our admin will contact you within 24 hours</li>
              <li>• We&apos;ll confirm your order details and arrange delivery</li>
              <li>• Payment is collected upon delivery</li>
              <li>• No credit card required!</li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* Submit Buttons - Responsive */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full sm:flex-1 order-2 sm:order-1"
          disabled={submitting}
        >
          {t('contact.form.cancel')}
        </Button>
        <Button
          type="submit"
          size="lg"
          className="w-full sm:flex-1 shadow-xl hover:shadow-2xl transition-all duration-300 order-1 sm:order-2"
          loading={submitting}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span className="text-sm sm:text-base">{t('contact.form.sending')}...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm sm:text-base">{t('contact.form.confirmOrder')}</span>
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}