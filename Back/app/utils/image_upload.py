"""
Image upload utilities
Supports both Cloudinary (free cloud storage) and local file storage
"""

import os
import uuid
from typing import Optional, Tuple, List
from werkzeug.utils import secure_filename
from flask import current_app
import cloudinary
import cloudinary.uploader
import cloudinary.api
from PIL import Image
import io

def init_cloudinary():
    """Initialize Cloudinary with app config"""
    if current_app.config.get('USE_CLOUDINARY'):
        cloudinary.config(
            cloud_name=current_app.config['CLOUDINARY_CLOUD_NAME'],
            api_key=current_app.config['CLOUDINARY_API_KEY'],
            api_secret=current_app.config['CLOUDINARY_API_SECRET']
        )

def allowed_file(filename: str) -> bool:
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

def process_image(image_file, max_size: Tuple[int, int] = None, quality: int = 90) -> io.BytesIO:
    """Process image: resize and compress"""
    if max_size is None:
        max_size = current_app.config.get('MAX_IMAGE_SIZE', (1920, 1080))

    # Open image
    image = Image.open(image_file)

    # Convert to RGB if necessary (for PNG with transparency)
    if image.mode in ('RGBA', 'LA', 'P'):
        # Create white background
        background = Image.new('RGB', image.size, (255, 255, 255))
        if image.mode == 'P':
            image = image.convert('RGBA')
        background.paste(image, mask=image.split()[-1] if image.mode == 'RGBA' else None)
        image = background
    elif image.mode != 'RGB':
        image = image.convert('RGB')

    # Resize if larger than max_size
    if image.size[0] > max_size[0] or image.size[1] > max_size[1]:
        image.thumbnail(max_size, Image.Resampling.LANCZOS)

    # Save to BytesIO with compression
    output = io.BytesIO()
    if image.format == 'JPEG' or image.format is None:
        image.save(output, format='JPEG', quality=quality, optimize=True)
    else:
        image.save(output, format='JPEG', quality=quality, optimize=True)

    output.seek(0)
    return output

def upload_to_cloudinary(image_file, folder: str = 'ourstore/products') -> Optional[str]:
    """Upload image to Cloudinary"""
    try:
        if not current_app.config.get('USE_CLOUDINARY'):
            return None

        # Process image
        processed_image = process_image(image_file)

        # Generate unique filename
        filename = f"{uuid.uuid4().hex}.jpg"

        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            processed_image,
            folder=folder,
            public_id=filename,
            resource_type='image',
            quality=current_app.config.get('IMAGE_QUALITY', 90),
            format='jpg'
        )

        return result['secure_url']

    except Exception as e:
        current_app.logger.error(f'Cloudinary upload failed: {str(e)}')
        return None

def save_locally(image_file, folder: str = 'products') -> Optional[str]:
    """Save image locally"""
    try:
        # Create upload directory if it doesn't exist
        upload_folder = os.path.join(current_app.config['UPLOAD_FOLDER'], folder)
        os.makedirs(upload_folder, exist_ok=True)

        # Generate unique filename
        filename = secure_filename(f"{uuid.uuid4().hex}.jpg")
        filepath = os.path.join(upload_folder, filename)

        # Process and save image
        processed_image = process_image(image_file)
        with open(filepath, 'wb') as f:
            f.write(processed_image.getvalue())

        # Return relative URL path
        return f'/uploads/{folder}/{filename}'

    except Exception as e:
        current_app.logger.error(f'Local upload failed: {str(e)}')
        return None

def upload_image(image_file, folder: str = 'products') -> Optional[str]:
    """Upload image using preferred storage method"""
    # Try Cloudinary first if configured
    if current_app.config.get('USE_CLOUDINARY'):
        url = upload_to_cloudinary(image_file, folder)
        if url:
            return url

    # Fallback to local storage
    return save_locally(image_file, folder)

def delete_image(image_url: str) -> bool:
    """Delete image from storage"""
    try:
        if image_url.startswith('http'):
            # Cloudinary URL
            if current_app.config.get('USE_CLOUDINARY'):
                # Extract public_id from URL
                # Cloudinary URLs typically look like: https://res.cloudinary.com/{cloud_name}/image/upload/v123456789/{folder}/{filename}.jpg
                parts = image_url.split('/')
                if len(parts) >= 8 and 'cloudinary' in image_url:
                    public_id = '/'.join(parts[-2:])  # folder/filename
                    public_id = public_id.rsplit('.', 1)[0]  # remove extension
                    cloudinary.uploader.destroy(public_id)
                    return True
        else:
            # Local file
            filepath = os.path.join(current_app.root_path, '..', image_url.lstrip('/'))
            if os.path.exists(filepath):
                os.remove(filepath)
                return True

        return False

    except Exception as e:
        current_app.logger.error(f'Image deletion failed: {str(e)}')
        return False

def get_image_info(image_url: str) -> Optional[dict]:
    """Get image information"""
    try:
        if image_url.startswith('http') and 'cloudinary' in image_url:
            # Cloudinary image
            parts = image_url.split('/')
            if len(parts) >= 8:
                public_id = '/'.join(parts[-2:])
                public_id = public_id.rsplit('.', 1)[0]
                result = cloudinary.api.resource(public_id)
                return {
                    'width': result.get('width'),
                    'height': result.get('height'),
                    'size': result.get('bytes'),
                    'format': result.get('format'),
                    'url': result.get('secure_url')
                }
        else:
            # Local image - basic info
            filepath = os.path.join(current_app.root_path, '..', image_url.lstrip('/'))
            if os.path.exists(filepath):
                stat = os.stat(filepath)
                with Image.open(filepath) as img:
                    return {
                        'width': img.width,
                        'height': img.height,
                        'size': stat.st_size,
                        'format': img.format,
                        'url': image_url
                    }

        return None

    except Exception as e:
        current_app.logger.error(f'Failed to get image info: {str(e)}')
        return None