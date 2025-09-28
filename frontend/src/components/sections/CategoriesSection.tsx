'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';
import { productCategories } from '@/lib/staticData';

interface CategoriesSectionProps {
  categoryPreviews: {[key: string]: Product[]};
  loading: boolean;
}

export function CategoriesSection({ categoryPreviews, loading }: CategoriesSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-10 sm:py-14 md:py-18">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-800 mb-4">
            {t('products.categories.title')}
          </h2>
          <p className="text-base sm:text-lg text-primary-600 max-w-2xl mx-auto">
            {t('products.categories.subtitle')}
          </p>
        </div>

        <div className="space-y-16">
          {productCategories.map((category, index) => (
            <div key={category.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Category Info */}
              <div className={`space-y-6 text-center lg:text-left ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg mx-auto lg:mx-0`}>
                    {category.icon === 'clothes' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {category.icon === 'tech' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                    {category.icon === 'beauty' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary-800">{t(`products.categories.${category.name}`)}</h3>
                  <p className="text-base sm:text-lg text-primary-600 max-w-lg mx-auto lg:mx-0">{t(`products.categories.${category.description}`)}</p>
                </div>
                
                <Link href={`/products?category=${category.id}`}>
                  <Button 
                    size="lg" 
                    className={`bg-gradient-to-r ${category.color} transition-colors w-full sm:w-auto`}
                  >
                    {t('products.categories.shop')}, {t(`products.categories.${category.name}`)}
                  </Button>
                </Link>
              </div>

              {/* Category Products Preview */}
              <div className={`mt-8 lg:mt-0 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h4 className="text-lg font-bold text-primary-800 mb-6 text-center">{t('products.categories.featuredProducts')}</h4>
                  <div className="w-full">
                    {loading ? (
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {[...Array(3)].map((_, idx) => (
                          <div key={idx} className="animate-pulse bg-white rounded-lg border shadow-sm">
                            <div className="p-3 sm:p-4">
                              <div className="aspect-square bg-gray-200 rounded-lg mb-3 sm:mb-4"></div>
                              <div className="h-3 bg-gray-200 rounded mb-2"></div>
                              <div className="h-4 sm:h-5 bg-gray-200 rounded w-12 sm:w-16 mb-2"></div>
                              <div className="h-6 sm:h-8 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {(categoryPreviews[category.id] || []).map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}