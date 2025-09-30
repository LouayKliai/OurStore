'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ImageUpload } from '@/components/ui/ImageUpload';
import Image from 'next/image';

interface ProductImageManagerProps {
  productId: number;
  currentImages: string[];
  onImagesUpdated: (images: string[]) => void;
}

export function ProductImageManager({
  productId,
  currentImages,
  onImagesUpdated
}: ProductImageManagerProps) {
  const [images, setImages] = useState<string[]>(currentImages || []);

  useEffect(() => {
    setImages(currentImages || []);
  }, [currentImages]);

  const handleImageUploaded = (url: string) => {
    const newImages = [...images, url];
    setImages(newImages);
    onImagesUpdated(newImages);
  };

  const handleMultipleImagesUploaded = (urls: string[]) => {
    const newImages = [...images, ...urls];
    setImages(newImages);
    onImagesUpdated(newImages);
  };

  const removeImage = async (index: number) => {
    const imageToRemove = images[index];

    // Optionally delete from storage
    try {
      await fetch('/api/images/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_url: imageToRemove }),
      });
    } catch (error) {
      console.warn('Failed to delete image from storage:', error);
    }

    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesUpdated(newImages);
  };

  const setAsMainImage = (index: number) => {
    const newImages = [images[index], ...images.filter((_, i) => i !== index)];
    setImages(newImages);
    onImagesUpdated(newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [moved] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, moved);
    setImages(newImages);
    onImagesUpdated(newImages);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Product Images
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Upload New Images</h3>
          <ImageUpload
            onImageUploaded={handleImageUploaded}
            onMultipleImagesUploaded={handleMultipleImagesUploaded}
            multiple={true}
            folder={`products/${productId}`}
            maxSize={10}
          />
        </div>

        {/* Current Images */}
        {images.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">
              Current Images ({images.length})
              {images.length > 0 && (
                <span className="text-sm text-gray-500 ml-2">
                  First image is the main product image
                </span>
              )}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className={`aspect-square relative overflow-hidden rounded-lg border-2 ${
                    index === 0 ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                  }`}>
                    <Image
                      src={imageUrl}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />

                    {/* Main image indicator */}
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Main
                      </div>
                    )}

                    {/* Image number */}
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {index + 1}
                    </div>

                    {/* Action buttons */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        {/* Set as main */}
                        {index !== 0 && (
                          <button
                            onClick={() => setAsMainImage(index)}
                            className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
                            title="Set as main image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </button>
                        )}

                        {/* Move left */}
                        {index > 0 && (
                          <button
                            onClick={() => moveImage(index, index - 1)}
                            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
                            title="Move left"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                        )}

                        {/* Move right */}
                        {index < images.length - 1 && (
                          <button
                            onClick={() => moveImage(index, index + 1)}
                            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
                            title="Move right"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => removeImage(index)}
                          className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                          title="Delete image"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {images.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg font-medium mb-2">No images uploaded yet</p>
            <p className="text-sm">Upload some product images using the form above</p>
          </div>
        )}

        {/* Image Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Image Guidelines</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• First image will be used as the main product image</li>
            <li>• Use high-quality images (at least 800x800px recommended)</li>
            <li>• Images are automatically optimized and compressed</li>
            <li>• Supported formats: JPG, PNG, GIF, WebP</li>
            <li>• Maximum file size: 10MB per image</li>
            <li>• Free cloud storage: 25GB limit with automatic optimization</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}