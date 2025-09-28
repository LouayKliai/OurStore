'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { getFeaturedProducts, getProductsByCategory, productCategories } from '@/lib/staticData';
import { HeroSection } from '@/components/sections/HeroSection';
import { BestSellersSection } from '@/components/sections/BestSellersSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { CallToActionSection } from '@/components/sections/CallToActionSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categoryPreviews, setCategoryPreviews] = useState<{[key: string]: Product[]}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        
        // Load featured/bestseller products
        const featured = await getFeaturedProducts();
        setFeaturedProducts(featured);
        
        // Load preview products for each category (3 products each)
        const previews: {[key: string]: Product[]} = {};
        for (const category of productCategories) {
          const categoryProducts = await getProductsByCategory(category.id as 'clothes' | 'tech' | 'beauty');
          previews[category.id] = categoryProducts.slice(0, 3);
        }
        setCategoryPreviews(previews);
        
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Best Sellers Section */}
      <BestSellersSection products={featuredProducts} loading={loading} />

      {/* Categories Section */}
      <CategoriesSection categoryPreviews={categoryPreviews} loading={loading} />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
