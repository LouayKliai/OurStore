'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-primary-200 hover:border-accent-300 bg-white hover:bg-primary-50 group">
      <CardContent className="flex flex-col h-full ">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl mb-6 flex items-center justify-center group-hover:from-accent-100 group-hover:to-primary-200 transition-all duration-300 relative overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <Image
              src={`${product.images[0]}?v=${Date.now()}`}
              alt={product.name}
              fill
              className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <svg className="w-20 h-20 text-primary-400 group-hover:text-accent-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
          
          {/* Image count indicator */}
          {product.images && product.images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {product.images.length}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-normal text-primary-800 mb-3 hover:text-accent-600 transition-colors leading-tight text-base">
              {product.name}
            </h3>
          </Link>
          
          {/* Price Section with Promotion Support */}
          <div className="mb-3">
            {product.original_price && product.original_price !== product.price ? (
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-lg font-bold text-accent-600">
                  {formatPrice(product.price)}
                </p>
                <p className="text-sm font-medium text-gray-500 line-through">
                  {formatPrice(product.original_price)}
                </p>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                  {t('product.save')} {Math.round(((parseFloat(product.original_price) - parseFloat(product.price)) / parseFloat(product.original_price)) * 100)}%
                </span>
              </div>
            ) : (
              <p className="text-lg font-bold text-accent-600">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          {/* Product Options Indicator */}
          {((product.color_options && product.color_options.length > 0) || (product.size_options && product.size_options.length > 0)) && (
            <div className="mb-3 flex flex-wrap gap-2">
              {product.color_options && product.color_options.length > 0 && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                  {product.color_options.length} {product.color_options.length === 1 ? t('product.color') : t('product.colors.title')}
                </span>
              )}
              {product.size_options && product.size_options.length > 0 && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                  {product.size_options.length} {product.size_options.length === 1 ? t('product.size') : t('product.sizes')}
                </span>
              )}
            </div>
          )}

          {/* View Details Button */}
          <div className="mt-auto">
            <Link href={`/product/${product.id}`} className="block">
              <Button 
                size="sm" 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-normal"
              >
                {t('common.viewDetails')}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}