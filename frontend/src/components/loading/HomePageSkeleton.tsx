'use client';

import { 
  HeroSkeleton, 
  SectionHeaderSkeleton, 
  ProductGridSkeleton, 
  CategoriesGridSkeleton 
} from '../ui/SkeletonLoader';

export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Skeleton */}
            <div className="animate-pulse bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 bg-[length:200%_100%] h-8 w-32 rounded"></div>
            
            {/* Navigation Skeleton */}
            <div className="hidden md:flex space-x-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 bg-[length:200%_100%] h-4 w-16 rounded"></div>
              ))}
            </div>
            
            {/* Cart Skeleton */}
            <div className="animate-pulse bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 bg-[length:200%_100%] h-10 w-10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <HeroSkeleton />

      {/* Best Sellers Section Skeleton */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeaderSkeleton />
          <ProductGridSkeleton count={8} />
        </div>
      </section>

      {/* Categories Section Skeleton */}
      <section className="py-12 lg:py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeaderSkeleton />
          <CategoriesGridSkeleton />
        </div>
      </section>

      {/* Call to Action Section Skeleton */}
      <section className="py-12 lg:py-16 bg-accent-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="animate-pulse bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 bg-[length:200%_100%] h-12 w-96 mx-auto rounded"></div>
            <div className="animate-pulse bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 bg-[length:200%_100%] h-6 w-full max-w-2xl mx-auto rounded"></div>
            <div className="animate-pulse bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 bg-[length:200%_100%] h-6 w-3/4 mx-auto rounded"></div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <div className="animate-pulse bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 bg-[length:200%_100%] h-12 w-48 rounded-xl"></div>
              <div className="animate-pulse bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 bg-[length:200%_100%] h-12 w-48 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-primary-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="animate-pulse bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 bg-[length:200%_100%] h-6 w-32 rounded"></div>
                {Array.from({ length: 4 }).map((_, itemIndex) => (
                  <div key={itemIndex} className="animate-pulse bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 bg-[length:200%_100%] h-4 w-24 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}