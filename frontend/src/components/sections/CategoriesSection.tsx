'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

interface Category {
  id: number;
  name: string;
  description: string;
  name_code: string;
  description_code: string;
  icon?: string;
  color?: string;
}

interface CategoriesSectionProps {
  categories: Category[];
  categoryPreviews: {[key: string]: Product[]};
  loading: boolean;
}

export function CategoriesSection({ categories, categoryPreviews, loading }: CategoriesSectionProps) {
  const { t } = useTranslation();

  // Helper function to get icon and color for category
  const getCategoryStyle = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('clothes') || name.includes('clothing') || name.includes('fashion')) {
      return {
        icon: 'clothes',
        color: 'from-blue-500 to-blue-600'
      };
    } else if (name.includes('tech') || name.includes('electronics')) {
      return {
        icon: 'tech',
        color: 'from-green-500 to-green-600'
      };
    } else if (name.includes('home') || name.includes('garden') || name.includes('furniture')) {
      return {
        icon: 'home',
        color: 'from-amber-500 to-amber-600'
      };
    } else if (name.includes('sports') || name.includes('outdoors')) {
      return {
        icon: 'sports',
        color: 'from-red-500 to-red-600'
      };
    } else if (name.includes('beauty') || name.includes('health') || name.includes('cosmetics')) {
      return {
        icon: 'beauty',
        color: 'from-pink-500 to-pink-600'
      };
    } else if (name.includes('books') || name.includes('reading')) {
      return {
        icon: 'books',
        color: 'from-purple-500 to-purple-600'
      };
    } else {
      return {
        icon: 'default',
        color: 'from-gray-500 to-gray-600'
      };
    }
  };

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
          {categories.map((category, index) => (
            <div key={category.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Category Info */}
              <div className={`space-y-6 text-center lg:text-left ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryStyle(category.name).color} rounded-2xl flex items-center justify-center shadow-lg mx-auto lg:mx-0`}>
                    {getCategoryStyle(category.name).icon === 'clothes' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {getCategoryStyle(category.name).icon === 'tech' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                    {getCategoryStyle(category.name).icon === 'home' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                    {getCategoryStyle(category.name).icon === 'sports' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {getCategoryStyle(category.name).icon === 'beauty' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                    {getCategoryStyle(category.name).icon === 'books' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                    {getCategoryStyle(category.name).icon === 'default' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary-800">{t(`products.categories.${category.name_code}`)}</h3>
                  <p className="text-base sm:text-lg text-primary-600 max-w-lg mx-auto lg:mx-0">{t(`products.categories.${category.description_code}`)}</p>
                </div>
                
                <Link href={`/products?category=${category.id}`}>
                  <Button 
                    size="lg" 
                    className={`bg-gradient-to-r from-accent-500 to-accent-600 transition-colors w-full sm:w-auto`}
                  >
                    {t('products.categories.shop')} {t(`products.categories.${category.name_code}`)}
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
                        {(categoryPreviews[category.id.toString()] || []).map((product) => (
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