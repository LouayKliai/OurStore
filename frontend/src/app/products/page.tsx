'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/types';
import { getStaticProducts, getProductsByCategory, productCategories } from '@/lib/staticData';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useTranslation } from '@/hooks/useTranslation';

export default function ProductsPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getStaticProducts();
        setProducts(allProducts);
        
        // Check for category parameter in URL
        const categoryParam = searchParams.get('category');
        if (categoryParam && ['clothes', 'tech', 'beauty'].includes(categoryParam)) {
          setActiveCategory(categoryParam);
          const categoryProducts = await getProductsByCategory(categoryParam as 'clothes' | 'tech' | 'beauty');
          setFilteredProducts(categoryProducts);
        } else {
          setFilteredProducts(allProducts);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams]);

  const handleCategoryFilter = async (category: string) => {
    setActiveCategory(category);
    setLoading(true);
    
    try {
      if (category === 'all') {
        setFilteredProducts(products);
      } else {
        const categoryProducts = await getProductsByCategory(category as 'clothes' | 'tech' | 'beauty');
        setFilteredProducts(categoryProducts);
      }
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-800 to-accent-700 bg-clip-text text-transparent mb-4">
            {t('products.title')}
          </h1>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {/* All Products Button */}
            <button
              onClick={() => handleCategoryFilter('all')}
              className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-2xl'
                  : 'bg-white/80 backdrop-blur-sm text-primary-700 hover:bg-white shadow-lg border-2 border-primary-200'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
                </svg>
                {t('products.all')}
              </span>
            </button>

            {/* Category Buttons */}
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-2xl`
                    : 'bg-white/80 backdrop-blur-sm text-primary-700 hover:bg-white shadow-lg border-2 border-primary-200'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center gap-3">
                  {category.icon === 'clothes' && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  {category.icon === 'tech' && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                  {category.icon === 'beauty' && (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  {t(`products.categories.${category.name}`)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Count */}
        <div className="text-center mb-8">
          <p className="text-lg text-primary-600">
            {loading ? 'Loading...' : `${t('products.found', { count: filteredProducts.length })}`}
            {activeCategory !== 'all' && (
              <span className="ml-2 px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold">
                {productCategories.find(cat => cat.id === activeCategory)?.name}
              </span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} loading={loading} />
      </div>
    </div>
  );
}