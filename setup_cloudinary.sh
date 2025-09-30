#!/bin/bash

# Cloudinary Setup Script for OurStore
# This script helps you set up Cloudinary for free image storage

echo "🚀 OurStore - Cloudinary Setup"
echo "================================"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📋 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
fi

echo "📝 Please provide your Cloudinary credentials:"
echo "   1. Go to https://cloudinary.com"
echo "   2. Create a free account"
echo "   3. Go to Dashboard → Account → API Keys"
echo "   4. Copy your credentials below"
echo ""

# Get Cloudinary credentials
read -p "Enter your Cloud Name: " CLOUD_NAME
read -p "Enter your API Key: " API_KEY
read -s -p "Enter your API Secret: " API_SECRET
echo ""

# Update .env file
echo "🔧 Updating .env file..."

# Use sed to replace or add the Cloudinary variables
if grep -q "CLOUDINARY_CLOUD_NAME=" .env; then
    sed -i "s/CLOUDINARY_CLOUD_NAME=.*/CLOUDINARY_CLOUD_NAME=$CLOUD_NAME/" .env
else
    echo "CLOUDINARY_CLOUD_NAME=$CLOUD_NAME" >> .env
fi

if grep -q "CLOUDINARY_API_KEY=" .env; then
    sed -i "s/CLOUDINARY_API_KEY=.*/CLOUDINARY_API_KEY=$API_KEY/" .env
else
    echo "CLOUDINARY_API_KEY=$API_KEY" >> .env
fi

if grep -q "CLOUDINARY_API_SECRET=" .env; then
    sed -i "s/CLOUDINARY_API_SECRET=.*/CLOUDINARY_API_SECRET=$API_SECRET/" .env
else
    echo "CLOUDINARY_API_SECRET=$API_SECRET" >> .env
fi

if grep -q "USE_CLOUDINARY=" .env; then
    sed -i "s/USE_CLOUDINARY=.*/USE_CLOUDINARY=true/" .env
else
    echo "USE_CLOUDINARY=true" >> .env
fi

echo "✅ Cloudinary configuration updated!"
echo ""

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install cloudinary

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    echo "   Try: pip install -r requirements.txt"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Start your backend: python run.py"
echo "   2. Test upload at: http://localhost:5000/api/images/upload"
echo "   3. Check your images at: https://cloudinary.com/console"
echo ""
echo "📖 For more info, see: IMAGE_STORAGE_README.md"
echo ""
echo "Happy uploading! 📸"