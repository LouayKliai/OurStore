'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { getStaticProductById } from '@/lib/staticData';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ContactForm } from '@/components/forms/ContactForm';
import { useTranslation } from '@/hooks/useTranslation'

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock product images - in a real app, these would come from the product data
  const productImages = [
    { id: 1, alt: 'Main product view', color: '#f3f4f6' },
    { id: 2, alt: 'Side view', color: '#e5e7eb' },
    { id: 3, alt: 'Back view', color: '#d1d5db' },
    { id: 4, alt: 'Detail view', color: '#9ca3af' },
  ];

  // Color mapping for real color swatches
  const getColorHex = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
      'White': '#FFFFFF',
      'Black': '#000000',
      'Blue': '#3B82F6',
      'Red': '#DC2626',
      'Green': '#059669',
      'Yellow': '#D97706',
      'Purple': '#7C3AED',
      'Pink': '#DB2777',
      'Gray': '#6B7280',
      'Brown': '#92400E',
      'Orange': '#EA580C',
      'Navy': '#1E3A8A',
      'Beige': '#F5F5DC',
      'Cream': '#F5F5DC',
      'Silver': '#C0C0C0',
      'Gold': '#FFD700',
      'Rose': '#F43F5E',
      'Mint': '#10B981',
      'Lavender': '#A78BFA',
      'Coral': '#F97316',
    };
    return colorMap[colorName] || '#6B7280'; // Default to gray if color not found
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = parseInt(params.id as string);
      if (isNaN(productId)) {
        router.push('/');
        return;
      }

      try {
        setLoading(true);
        const productData = await getStaticProductById(productId);
        if (productData) {
          setProduct(productData);
          setSelectedColor(productData.color_options?.[0] || '');
          setSelectedSize(productData.size_options?.[0] || '');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setSelectedImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setSelectedImageIndex(prev => prev === productImages.length - 1 ? 0 : prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [productImages.length]);

  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  const handleOrderSuccess = (orderId: string) => {
    setIsModalOpen(false);
    router.push(`/success?orderId=${orderId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
          <div className="animate-pulse">
            {/* Back button skeleton */}
            <div className="h-8 bg-primary-200 rounded w-32 mb-8"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Image Gallery skeleton */}
              <div className="space-y-4">
                {/* Main image skeleton */}
                <div className="aspect-square bg-gradient-to-br from-primary-200 to-accent-200 rounded-xl sm:rounded-2xl shadow-xl"></div>
                {/* Thumbnails skeleton */}
                <div className="flex space-x-3">
                  <div className="w-20 h-20 bg-primary-300 rounded-lg"></div>
                  <div className="w-20 h-20 bg-primary-300 rounded-lg"></div>
                  <div className="w-20 h-20 bg-primary-300 rounded-lg"></div>
                  <div className="w-20 h-20 bg-primary-300 rounded-lg"></div>
                </div>
              </div>
              
              {/* Product info skeleton */}
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-primary-200 space-y-6">
                  {/* Title skeleton */}
                  <div className="h-8 sm:h-10 bg-primary-200 rounded-lg w-3/4"></div>
                  
                  {/* Price skeleton */}
                  <div className="h-8 sm:h-10 bg-accent-200 rounded-lg w-32"></div>
                  
                  {/* Color options skeleton */}
                  <div className="space-y-3">
                    <div className="h-6 bg-primary-200 rounded w-16"></div>
                    <div className="flex space-x-3">
                      <div className="h-10 w-20 bg-accent-200 rounded-lg"></div>
                      <div className="h-10 w-20 bg-accent-200 rounded-lg"></div>
                      <div className="h-10 w-20 bg-accent-200 rounded-lg"></div>
                    </div>
                  </div>
                  
                  {/* Quantity skeleton */}
                  <div className="space-y-3">
                    <div className="h-6 bg-primary-200 rounded w-20"></div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent-200 rounded-full"></div>
                      <div className="w-16 h-8 bg-primary-200 rounded"></div>
                      <div className="w-12 h-12 bg-accent-200 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Total skeleton */}
                  <div className="h-16 bg-accent-100 rounded-xl"></div>
                  
                  {/* Order button skeleton */}
                  <div className="h-14 bg-accent-300 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary-700 hover:text-primary-900 mb-8 transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('products.backToProducts')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            {/* Main Image with Navigation */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-accent-200 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden group">
                <div 
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{ backgroundColor: productImages[selectedImageIndex].color }}
                />
                
                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {selectedImageIndex + 1} / {productImages.length}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? productImages.length - 1 : selectedImageIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group/btn"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5 text-primary-600 group-hover/btn:text-accent-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => setSelectedImageIndex(selectedImageIndex === productImages.length - 1 ? 0 : selectedImageIndex + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group/btn"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5 text-primary-600 group-hover/btn:text-accent-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Main Image Content */}
                <div className="relative z-10 text-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-primary-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-primary-600 font-medium">{productImages[selectedImageIndex].alt}</p>
                </div>
              </div>
            </div>

            {/* Enhanced Image Thumbnails */}
            <div className="relative">
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 relative group/thumb ${
                      selectedImageIndex === index
                        ? 'border-accent-500 ring-2 ring-accent-200 shadow-lg scale-105'
                        : 'border-primary-200 hover:border-accent-300 hover:shadow-md hover:scale-102'
                    }`}
                    aria-label={`View ${image.alt}`}
                  >
                    <div 
                      className="w-full h-full flex items-center justify-center transition-all duration-300 relative"
                      style={{ backgroundColor: image.color }}
                    >
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-accent-500/20 flex items-center justify-center">
                          <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500 group-hover/thumb:text-accent-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Scroll Indicators */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-full bg-gradient-to-r from-primary-50 to-transparent pointer-events-none opacity-50"></div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-full bg-gradient-to-l from-primary-50 to-transparent pointer-events-none opacity-50"></div>
            </div>

            {/* Image Info */}
            <div className="text-center">
              <p className="text-sm text-primary-600">
                {t('products.clickThumbnails')}
              </p>
            </div>
          </div>

          {/* Product Info & Order Form */}
          <div className="space-y-6 sm:space-y-8">
            {/* Product Details */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border border-primary-200/50">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-800 mb-3 sm:mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-3 sm:gap-4 mb-2">
                    <div className="inline-flex items-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full shadow-lg">
                      <span className="text-2xl sm:text-3xl font-bold">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    {product.original_price && (
                      <div className="flex flex-col">
                        <span className="text-lg sm:text-xl text-gray-500 line-through font-medium">
                          {formatPrice(product.original_price)}
                        </span>
                        <span className="text-xs sm:text-sm text-red-600 font-bold bg-red-100 px-2 py-1 rounded-full">
                          {t('products.save')} {Math.round(((parseFloat(product.original_price) - parseFloat(product.price)) / parseFloat(product.original_price)) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Color Selection */}
                {product.color_options && product.color_options.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-primary-800 mb-3 sm:mb-4">
                      {t('products.color')}: <span className="font-normal text-primary-600">{selectedColor}</span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {product.color_options.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-300 group ${
                            selectedColor === color
                              ? 'border-accent-500 ring-2 ring-accent-200 scale-110 shadow-lg'
                              : 'border-gray-300 hover:border-accent-400 hover:scale-105 shadow-md hover:shadow-lg'
                          }`}
                          style={{ backgroundColor: getColorHex(color) }}
                          aria-label={`Select ${color} color`}
                          title={color}
                        >
                          {/* Inner border for better contrast on light colors */}
                          <div className="absolute inset-1 rounded-full border border-black/10"></div>
                          
                          {/* Selected indicator */}
                          {selectedColor === color && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                                <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                          )}
                          
                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.size_options && product.size_options.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-primary-800 mb-3 sm:mb-4">
                      {t('products.size')}: <span className="font-normal text-primary-600">{selectedSize}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {product.size_options.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 sm:px-6 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 min-w-[3rem] ${
                            selectedSize === size
                              ? 'border-accent-500 bg-accent-100 text-accent-700 shadow-lg scale-105'
                              : 'border-primary-300 text-primary-700 hover:border-accent-400 hover:bg-accent-50 hover:scale-102'
                          }`}
                          aria-label={`Select size ${size}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selection */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary-800 mb-3 sm:mb-4">{t('products.quantity')}</h3>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-accent-300 bg-white hover:bg-accent-100 flex items-center justify-center transition-all duration-300 font-bold text-accent-600 text-lg sm:text-xl shadow-sm hover:shadow-md"
                    >
                      <span>−</span>
                    </button>
                    
                    <span className="w-12 sm:w-16 text-center font-bold text-xl sm:text-2xl text-primary-800 bg-accent-50 py-2 rounded-lg border border-accent-200">{quantity}</span>
                    
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-accent-300 bg-white hover:bg-accent-100 flex items-center justify-center transition-all duration-300 font-bold text-accent-600 text-lg sm:text-xl shadow-sm hover:shadow-md"
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>

                {/* Order Total */}
                <div className="bg-gradient-to-r from-accent-100 to-accent-200 p-4 sm:p-6 rounded-xl border-2 border-accent-300 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-primary-800">{t('products.total')}:</span>
                    <span className="text-xl sm:text-2xl font-bold text-accent-700">
                      {formatPrice((parseFloat(product.price) * quantity).toString())}
                    </span>
                  </div>
                </div>

                {/* Order Now Button */}
                <Button
                  onClick={handleOrderClick}
                  size="lg"
                  className="w-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg sm:text-xl py-4"
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {t('products.orderNow')}
                  </span>
                </Button>
              </div>
            </div>

            {/* Order Modal */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={t("contact.form.title")}
              size="lg"
            >
              <ContactForm
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
                onSuccess={handleOrderSuccess}
                onCancel={() => setIsModalOpen(false)}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}