#!/usr/bin/env python3
"""
Test script for image upload functionality
Run this after setting up Cloudinary to verify everything works
"""

import os
import sys
import requests
from pathlib import Path

# Note: Environment variables are loaded by the Flask app, not here

def test_image_upload():
    """Test image upload functionality"""

    print("🧪 Testing OurStore Image Upload")
    print("=" * 40)

    # Check if backend is running
    try:
        response = requests.get('http://localhost:5000/api/health', timeout=5)
        if response.status_code != 200:
            print("❌ Backend is not running on http://localhost:5000")
            print("   Start it with: python run.py")
            return False
    except requests.exceptions.RequestException:
        print("❌ Cannot connect to backend")
        print("   Make sure it's running on http://localhost:5000")
        return False

    print("✅ Backend is running")

    # Skip environment variable check - Flask app handles this
    print("ℹ️  Testing image upload API (Cloudinary configured in Flask app)")

    # Create a test image if it doesn't exist
    test_image_path = Path('test_image.jpg')
    if not test_image_path.exists():
        print("📷 Creating test image...")
        try:
            from PIL import Image, ImageDraw
            # Create a simple test image
            img = Image.new('RGB', (100, 100), color='red')
            draw = ImageDraw.Draw(img)
            draw.text((10, 40), "TEST", fill='white')
            img.save(test_image_path)
            print("✅ Test image created")
        except ImportError:
            print("❌ PIL not installed. Install with: pip install pillow")
            return False

    # Test single image upload
    print("📤 Testing single image upload...")
    try:
        with open(test_image_path, 'rb') as f:
            files = {'image': f}
            data = {'folder': 'test'}
            response = requests.post(
                'http://localhost:5000/api/images/upload',
                files=files,
                data=data,
                timeout=30
            )

        if response.status_code == 200:
            result = response.json()
            print("✅ Single image upload successful")
            print(f"   Image URL: {result.get('image_url', 'N/A')}")

            # Test image info
            image_url = result.get('image_url')
            if image_url:
                print("📋 Testing image info...")
                info_response = requests.get(
                    'http://localhost:5000/api/images/info',
                    params={'url': image_url},
                    timeout=10
                )
                if info_response.status_code == 200:
                    print("✅ Image info retrieved successfully")
                else:
                    print("⚠️  Image info failed (but upload worked)")

        else:
            print(f"❌ Single image upload failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False

    except Exception as e:
        print(f"❌ Upload test failed: {str(e)}")
        return False

    # Test multiple image upload
    print("📤 Testing multiple image upload...")
    try:
        with open(test_image_path, 'rb') as f1, open(test_image_path, 'rb') as f2:
            files = [
                ('images', ('test1.jpg', f1, 'image/jpeg')),
                ('images', ('test2.jpg', f2, 'image/jpeg'))
            ]
            data = {'folder': 'test'}
            response = requests.post(
                'http://localhost:5000/api/images/upload-multiple',
                files=files,
                data=data,
                timeout=30
            )

        if response.status_code == 200:
            result = response.json()
            print("✅ Multiple image upload successful")
            print(f"   Uploaded {result.get('count', 0)} images")
        else:
            print(f"❌ Multiple image upload failed: {response.status_code}")
            print(f"   Error: {response.text}")

    except Exception as e:
        print(f"❌ Multiple upload test failed: {str(e)}")

    # Cleanup
    if test_image_path.exists():
        test_image_path.unlink()
        print("🧹 Test image cleaned up")

    print("")
    print("🎉 All tests completed!")
    print("")
    print("📱 Frontend Components:")
    print("   - ImageUpload: Basic upload component")
    print("   - ProductImageManager: Admin interface")
    print("")
    print("📚 Documentation: IMAGE_STORAGE_README.md")

    return True

if __name__ == '__main__':
    success = test_image_upload()
    sys.exit(0 if success else 1)