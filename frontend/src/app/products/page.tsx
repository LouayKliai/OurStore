'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, Category } from '@/lib/types';
import { getProducts, getCategories } from '@/lib/api';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useTranslation } from '@/hooks/useTranslation';

const getCategoryIcon = (nameCode: string) => {
  const iconMap: Record<string, React.ReactElement> = {
    'electronics': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    'clothing': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    'home_garden': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    'books': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    'sports_outdoors': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    'beauty_health': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  };
  return iconMap[nameCode] || (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
};

export default function ProductsPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch products and categories from backend API
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        const allProducts = productsData.products || [];
        const allCategories = categoriesData.categories || [];

        setProducts(allProducts);
        setCategories(allCategories);

        // Check for category parameter in URL
        const categoryParam = searchParams.get('category');
        if (categoryParam && categoryParam !== 'all') {
          setActiveCategory(categoryParam);
          const categoryProducts = allProducts.filter((p: Product) => p.category === categoryParam);
          setFilteredProducts(categoryProducts);
        } else {
          setActiveCategory('all');
          setFilteredProducts(allProducts);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchParams]);

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    setLoading(true);
    try {
      if (category === 'all') {
        setFilteredProducts(products);
      } else {
        const categoryProducts = products.filter((p) => p.category === category);
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
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.name)}
                className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                  activeCategory === category.name
                    ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-2xl'
                    : 'bg-white/80 backdrop-blur-sm text-primary-700 hover:bg-white shadow-lg border-2 border-primary-200'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center gap-3">
                  {/* Category icon based on name_code */}
                  {getCategoryIcon(category.name_code)}
                  {t(`products.categories.${category.name_code}`)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Count */}
        <div className="text-center mb-8">
          <p className="text-lg text-primary-600">
            {loading ? 'Loading...' : `${t('products.found', { count: filteredProducts.length })}  `}
            {activeCategory !== 'all' && (
              <span className="ml-2 px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold">
                {categories.find(cat => cat.name === activeCategory)?.name_code ? t(`products.categories.${categories.find(cat => cat.name === activeCategory)!.name_code}`) : activeCategory}
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