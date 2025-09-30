"""
Image upload API endpoints
"""

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from app.utils.image_upload import upload_image, delete_image, allowed_file, init_cloudinary
from app.core.database import db
from flask import current_app
import os

images_bp = Blueprint('images', __name__, url_prefix='/api/images')

@images_bp.route('/upload', methods=['POST'])
def upload_product_image():
    """Upload product image"""
    try:
        # Check if file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        file = request.files['image']
        folder = request.form.get('folder', 'products')

        # Check if file is empty
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400

        # Check file extension
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed. Use: png, jpg, jpeg, gif, webp'}), 400

        # Upload image
        image_url = upload_image(file, folder)

        if not image_url:
            return jsonify({'error': 'Failed to upload image'}), 500

        return jsonify({
            'success': True,
            'image_url': image_url,
            'message': 'Image uploaded successfully'
        })

    except Exception as e:
        current_app.logger.error(f'Image upload error: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500

@images_bp.route('/upload-multiple', methods=['POST'])
def upload_multiple_images():
    """Upload multiple product images"""
    try:
        if 'images' not in request.files:
            return jsonify({'error': 'No images provided'}), 400

        files = request.files.getlist('images')
        folder = request.form.get('folder', 'products')
        uploaded_urls = []

        for file in files:
            if file.filename == '':
                continue

            if not allowed_file(file.filename):
                continue

            image_url = upload_image(file, folder)
            if image_url:
                uploaded_urls.append(image_url)

        if not uploaded_urls:
            return jsonify({'error': 'No images were uploaded successfully'}), 400

        return jsonify({
            'success': True,
            'image_urls': uploaded_urls,
            'count': len(uploaded_urls),
            'message': f'Successfully uploaded {len(uploaded_urls)} image(s)'
        })

    except Exception as e:
        current_app.logger.error(f'Multiple image upload error: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500

@images_bp.route('/delete', methods=['DELETE'])
def delete_product_image():
    """Delete product image"""
    try:
        data = request.get_json()
        image_url = data.get('image_url')

        if not image_url:
            return jsonify({'error': 'No image URL provided'}), 400

        success = delete_image(image_url)

        if success:
            return jsonify({
                'success': True,
                'message': 'Image deleted successfully'
            })
        else:
            return jsonify({'error': 'Failed to delete image'}), 500

    except Exception as e:
        current_app.logger.error(f'Image deletion error: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500

@images_bp.route('/info', methods=['GET'])
def get_image_info():
    """Get image information"""
    try:
        image_url = request.args.get('url')

        if not image_url:
            return jsonify({'error': 'No image URL provided'}), 400

        from app.utils.image_upload import get_image_info as get_info
        info = get_info(image_url)

        if info:
            return jsonify({
                'success': True,
                'info': info
            })
        else:
            return jsonify({'error': 'Image not found or inaccessible'}), 404

    except Exception as e:
        current_app.logger.error(f'Image info error: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500