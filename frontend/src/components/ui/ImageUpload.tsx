'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  onMultipleImagesUploaded?: (urls: string[]) => void;
  multiple?: boolean;
  folder?: string;
  maxSize?: number; // in MB
  acceptedTypes?: string;
  className?: string;
}

export function ImageUpload({
  onImageUploaded,
  onMultipleImagesUploaded,
  multiple = false,
  folder = 'products',
  maxSize = 5, // 5MB default
  acceptedTypes = 'image/*',
  className = ''
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Validate file sizes
    const maxSizeBytes = maxSize * 1024 * 1024;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > maxSizeBytes) {
        setError(`File "${files[i].name}" is too large. Maximum size is ${maxSize}MB.`);
        return;
      }
    }

    setError(null);
    setUploading(true);

    try {
      if (multiple && onMultipleImagesUploaded) {
        // Upload multiple files
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }
        formData.append('folder', folder);

        const response = await fetch('/api/images/upload-multiple', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Upload failed');
        }

        onMultipleImagesUploaded(result.image_urls);
        setPreviewUrls(result.image_urls);
      } else {
        // Upload single file
        const formData = new FormData();
        formData.append('image', files[0]);
        formData.append('folder', folder);

        const response = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Upload failed');
        }

        onImageUploaded(result.image_url);
        setPreviewUrls([result.image_url]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removePreview = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handleButtonClick}
          disabled={uploading}
          variant="outline"
          className="flex items-center gap-2"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {multiple ? 'Upload Images' : 'Upload Image'}
            </>
          )}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="text-sm text-gray-600">
          Max {maxSize}MB per file • {acceptedTypes.replace('image/', '').toUpperCase()}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Image Previews */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Remove button */}
                  <button
                    onClick={() => removePreview(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Instructions */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium mb-1">Upload Instructions:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Images are automatically optimized and compressed</li>
          <li>Supported formats: JPG, PNG, GIF, WebP</li>
          <li>Maximum file size: {maxSize}MB per image</li>
          <li>Images are stored securely in the cloud (free tier: 25GB)</li>
        </ul>
      </div>
    </div>
  );
}