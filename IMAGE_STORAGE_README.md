# Image Storage Setup Guide

This guide explains how to set up image storage for OurStore using Cloudinary (free tier) or local storage.

## 🚀 Quick Setup

### Option 1: Cloudinary (Recommended - Free 25GB)

1. **Create Cloudinary Account**
   - Go to [https://cloudinary.com](https://cloudinary.com)
   - Sign up for free account
   - Verify your email

2. **Get API Credentials**
   - Go to Dashboard → Account → API Keys
   - Copy your Cloud Name, API Key, and API Secret

3. **Configure Environment Variables**
   ```bash
   # Copy .env.example to .env
   cp .env.example .env

   # Edit .env and add your Cloudinary credentials
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   USE_CLOUDINARY=true
   ```

4. **Install Dependencies**
   ```bash
   cd Back
   pip install -r requirements.txt
   ```

5. **Test Upload**
   ```bash
   python run.py
   ```
   Then visit `http://localhost:5000/api/images/upload` to test

### Seed Database with Test Images

The database seeding script now automatically uploads test images to Cloudinary:

```bash
cd Back
source venv/bin/activate
python seed_database.py
```

**What happens during seeding:**
- ✅ Creates sample images programmatically with product names
- ✅ Uploads images to Cloudinary automatically  
- ✅ Stores real Cloudinary URLs in the database
- ✅ No more placeholder filenames like "headphones1.jpg"

**Benefits:**
- Real image URLs for testing frontend components
- Consistent image dimensions and quality
- Automatic optimization via Cloudinary
- No need to manually add test images

### Option 2: Local Storage (No Setup Required)

If you don't want to use Cloudinary, images will be stored locally:

```bash
# In your .env file
USE_CLOUDINARY=false
```

Images will be saved to `Back/uploads/` folder.

## 📋 Features

### ✅ What's Included

- **Automatic Image Optimization**: Images are compressed and resized
- **Multiple Format Support**: JPG, PNG, GIF, WebP
- **Cloud Storage**: 25GB free with Cloudinary
- **Admin Interface**: Easy image management in admin panel
- **Drag & Drop Upload**: User-friendly upload component
- **Image Preview**: See uploaded images before saving
- **Batch Upload**: Upload multiple images at once

### 🔧 API Endpoints

```
POST /api/images/upload          # Single image upload
POST /api/images/upload-multiple # Multiple images upload
DELETE /api/images/delete        # Delete image
GET /api/images/info            # Get image information
```

### 🎨 Frontend Components

- `ImageUpload`: Basic upload component
- `ProductImageManager`: Full admin interface for product images

## 🛠️ Usage Examples

### Basic Upload Component

```tsx
import { ImageUpload } from '@/components/ui/ImageUpload';

function MyComponent() {
  const handleImageUploaded = (url: string) => {
    console.log('Image uploaded:', url);
  };

  return (
    <ImageUpload
      onImageUploaded={handleImageUploaded}
      multiple={true}
      folder="products"
      maxSize={10}
    />
  );
}
```

### Product Image Management

```tsx
import { ProductImageManager } from '@/components/admin/ProductImageManager';

function AdminProductEdit({ productId, currentImages }) {
  const handleImagesUpdated = (images: string[]) => {
    // Update product with new images
    updateProduct(productId, { images });
  };

  return (
    <ProductImageManager
      productId={productId}
      currentImages={currentImages}
      onImagesUpdated={handleImagesUpdated}
    />
  );
}
```

## 📊 Storage Limits

### Cloudinary Free Tier
- **Storage**: 25GB
- **Monthly Bandwidth**: 25GB
- **Monthly Transformations**: 25,000
- **Image Optimizations**: Unlimited

### Local Storage
- **Storage**: Limited by your server disk space
- **No bandwidth limits**
- **No external dependencies**

## 🔒 Security

- Images are validated for type and size
- Automatic optimization prevents large files
- Secure URLs for cloud storage
- File type restrictions prevent malicious uploads

## 🚨 Troubleshooting

### Upload Fails
1. Check your Cloudinary credentials in `.env`
2. Verify `USE_CLOUDINARY=true` if using cloud storage
3. Check file size (max 10MB for products)
4. Check file type (JPG, PNG, GIF, WebP only)

### Images Not Showing
1. Check browser console for errors
2. Verify image URLs are correct
3. Check Cloudinary dashboard for uploaded images
4. Ensure CORS is configured for your domain

### Performance Issues
1. Images are automatically optimized
2. Use appropriate image sizes
3. Consider lazy loading for image galleries

## 📚 Advanced Configuration

### Custom Image Processing

```python
# In image_upload.py
def process_image(image_file, max_size=(1920, 1080), quality=90):
    # Your custom processing logic
    pass
```

### Custom Storage Backend

```python
# Add support for other cloud providers
def upload_to_custom_provider(image_file, folder):
    # Your custom upload logic
    pass
```

## 🎯 Next Steps

1. **Set up Cloudinary** (recommended for production)
2. **Test image uploads** in your admin panel
3. **Update product creation** to use image URLs
4. **Add image galleries** to product pages
5. **Implement lazy loading** for better performance

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your environment variables
3. Test with local storage first (`USE_CLOUDINARY=false`)
4. Check Cloudinary dashboard for upload status

---

**Happy uploading! 📸**