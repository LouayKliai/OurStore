'use client';

import { useEffect, useState } from 'react';
import { Product, Category } from '@/lib/types';
import { getCategoriesWithFeatured } from '@/lib/api';
import { HeroSection } from '@/components/sections/HeroSection';
import { BestSellersSection } from '@/components/sections/BestSellersSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { CallToActionSection } from '@/components/sections/CallToActionSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryPreviews, setCategoryPreviews] = useState<{[key: string]: Product[]}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);

        // Load categories with featured products from API
        const data = await getCategoriesWithFeatured();
        setCategories(data.categories);
        setCategoryPreviews(data.categoryPreviews);

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
      <BestSellersSection />

      {/* Categories Section */}
      <CategoriesSection categories={categories} categoryPreviews={categoryPreviews} loading={loading} />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
