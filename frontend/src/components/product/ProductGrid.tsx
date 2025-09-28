'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { useTranslation } from '@/hooks/useTranslation';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({ products, loading = false }: ProductGridProps) {
  const { t } = useTranslation();
  if (loading) {
    return (
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse h-full flex flex-col hover:shadow-xl transition-all duration-300 border-primary-200 bg-white rounded-xl sm:rounded-2xl border-2 shadow-lg">
            <div className="flex flex-col h-full p-3 sm:p-4 md:p-6">
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-accent-200 rounded-lg sm:rounded-xl mb-3 sm:mb-4 md:mb-6"></div>
              <div className="flex-1 flex flex-col">
                <div className="h-4 sm:h-5 md:h-6 bg-primary-200 rounded-lg mb-2 sm:mb-3"></div>
                <div className="h-6 sm:h-7 md:h-8 bg-accent-200 rounded-lg w-16 sm:w-20 md:w-24 mb-2 sm:mb-3"></div>
                <div className="mt-auto">
                  <div className="h-8 sm:h-10 md:h-12 bg-primary-200 rounded-lg sm:rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 md:py-20 lg:py-24 px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-primary-300 to-accent-300 rounded-full flex items-center justify-center shadow-lg">
          <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1m8 0H8m0 0v1h8V5H8z" />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-primary-800 mb-3 sm:mb-4">{t('common.noProductsFound')}</h3>
        <p className="text-base sm:text-lg text-primary-600 max-w-sm sm:max-w-md mx-auto">
          {t('common.noProductsAvailable')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}