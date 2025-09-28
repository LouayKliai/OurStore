'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: string;
  height?: string;
  lines?: number;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  lines = 1
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100 bg-[length:200%_100%]";
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    rounded: 'rounded-xl'
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '12rem')
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]} ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
            style={{ height: '1rem' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          
          {/* Left Content Skeleton */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            {/* Brand Badge Skeleton */}
            <div className="flex justify-center lg:justify-start">
              <Skeleton variant="rounded" width="150px" height="40px" />
            </div>

            {/* Main Heading Skeleton */}
            <div className="space-y-4">
              <Skeleton variant="text" lines={2} className="text-4xl sm:text-5xl lg:text-6xl" height="4rem" />
            </div>

            {/* Subtitle Skeleton */}
            <Skeleton variant="text" lines={2} height="1.5rem" />

            {/* CTA Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Skeleton variant="rounded" width="200px" height="56px" />
              <Skeleton variant="rounded" width="200px" height="56px" />
            </div>

            {/* Trust indicators Skeleton */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton variant="circular" width="20px" height="20px" />
                  <Skeleton variant="text" width="100px" height="1rem" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Content Skeleton */}
          <div className="hidden lg:flex flex-col space-y-6 mt-8 lg:mt-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary-200/50">
              <Skeleton variant="text" width="150px" height="2rem" className="mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Skeleton variant="rounded" width="40px" height="40px" />
                    <div className="flex-1">
                      <Skeleton variant="text" width="120px" height="1.25rem" className="mb-1" />
                      <Skeleton variant="text" width="80px" height="0.875rem" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Skeleton */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-2">
          <Skeleton variant="text" width="100px" height="0.875rem" />
          <Skeleton variant="circular" width="24px" height="24px" />
        </div>
      </div>
    </section>
  );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton variant="rectangular" height="200px" className="w-full" />
      
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <Skeleton variant="text" lines={2} height="1.25rem" />
        
        {/* Price Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton variant="text" width="80px" height="1.5rem" />
          <Skeleton variant="text" width="60px" height="1rem" />
        </div>
        
        {/* Button Skeleton */}
        <Skeleton variant="rounded" height="40px" className="w-full" />
      </div>
    </div>
  );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Section Header Skeleton
export function SectionHeaderSkeleton() {
  return (
    <div className="text-center space-y-4 mb-8 lg:mb-12">
      <Skeleton variant="text" width="300px" height="3rem" className="mx-auto" />
      <Skeleton variant="text" lines={2} height="1.25rem" className="max-w-2xl mx-auto" />
    </div>
  );
}

// Categories Grid Skeleton
export function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <Skeleton variant="rectangular" height="150px" className="w-full" />
          <div className="p-4">
            <Skeleton variant="text" width="100px" height="1.5rem" className="mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}