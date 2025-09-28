'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button';

interface BestSellersProps {
  products: Product[];
  loading: boolean;
}

export function BestSellersSection({ products, loading }: BestSellersProps) {
  const { t } = useTranslation();

  return (
    <section id="products" className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-10 sm:py-14 md:py-18">
      <div className="mb-6 sm:mb-8 md:mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
          {t('bestSellers.title')}
        </h2>
        <p className="text-base sm:text-lg text-primary-600 max-w-2xl mx-auto">
          {t('bestSellers.subtitle')}
        </p>
      </div>

            {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3 sm:mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 sm:h-4 bg-gray-200 rounded"></div>
                <div className="h-4 sm:h-6 bg-gray-200 rounded w-16 sm:w-20"></div>
                <div className="h-6 sm:h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      {products.length > 0 && (
        <div className="text-center mt-10">
          <Link href="/products">
            <Button size="lg" className="transition-colors w-full sm:w-auto">
              {t('bestSellers.viewAllProducts')}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}