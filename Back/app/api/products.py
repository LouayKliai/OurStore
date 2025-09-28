"""
Product API endpoints
"""

from flask import Blueprint, request, jsonify
from sqlalchemy import or_
from app.core.database import db
from app.models import Product, Category, InventoryLog

products_bp = Blueprint('products', __name__, url_prefix='/api/products')

@products_bp.route('', methods=['GET'])
def get_products():
    """Get all products with optional filtering"""
    try:
        # Query parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        category = request.args.get('category')
        search = request.args.get('search')
        is_bestseller = request.args.get('is_bestseller', type=bool)
        sort_by = request.args.get('sort_by', 'created_at')  # name, price, created_at
        sort_order = request.args.get('sort_order', 'desc')  # asc, desc
        
        # Build query
        query = Product.query.filter_by(is_active=True)
        
        # Apply filters
        if category:
            query = query.join(Category).filter(Category.name == category)
        
        if search:
            query = query.filter(or_(
                Product.name.ilike(f'%{search}%'),
                Product.description.ilike(f'%{search}%')
            ))
        
        if is_bestseller is not None:
            query = query.filter_by(is_bestseller=is_bestseller)
        
        # Apply sorting
        if sort_by == 'name':
            query = query.order_by(Product.name.asc() if sort_order == 'asc' else Product.name.desc())
        elif sort_by == 'price':
            query = query.order_by(Product.price.asc() if sort_order == 'asc' else Product.price.desc())
        else:  # created_at
            query = query.order_by(Product.created_at.asc() if sort_order == 'asc' else Product.created_at.desc())
        
        # Paginate
        products = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'products': [product.to_dict() for product in products.items],
            'pagination': {
                'page': products.page,
                'pages': products.pages,
                'per_page': products.per_page,
                'total': products.total,
                'has_next': products.has_next,
                'has_prev': products.has_prev
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get single product by ID"""
    try:
        product = Product.query.filter_by(id=product_id, is_active=True).first()
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        return jsonify({'product': product.to_dict()})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('', methods=['POST'])
def create_product():
    """Create new product"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'price', 'stock']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create product
        product = Product(
            name=data['name'],
            description=data.get('description'),
            price=data['price'],
            original_price=data.get('original_price'),
            stock=data['stock'],
            color_options=data.get('color_options', []),
            size_options=data.get('size_options', []),
            category_id=data.get('category_id'),
            is_bestseller=data.get('is_bestseller', False),
            is_active=data.get('is_active', True),
            image_url=data.get('image_url'),
            images=data.get('images', []),
            sku=data.get('sku'),
            weight=data.get('weight'),
            dimensions=data.get('dimensions')
        )
        
        product.save()
        
        return jsonify({'product': product.to_dict()}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """Update existing product"""
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        # Update fields
        updatable_fields = [
            'name', 'description', 'price', 'original_price', 'stock',
            'color_options', 'size_options', 'category_id', 'is_bestseller',
            'is_active', 'image_url', 'images', 'sku', 'weight', 'dimensions'
        ]
        
        for field in updatable_fields:
            if field in data:
                setattr(product, field, data[field])
        
        product.save()
        
        return jsonify({'product': product.to_dict()})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Soft delete product (set is_active to False)"""
    try:
        product = Product.query.get_or_404(product_id)
        product.is_active = False
        product.save()
        
        return jsonify({'message': 'Product deleted successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all product categories"""
    try:
        categories = Category.query.all()
        return jsonify({
            'categories': [category.to_dict() for category in categories]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/bestsellers', methods=['GET'])
def get_bestsellers():
    """Get bestseller products"""
    try:
        limit = request.args.get('limit', 10, type=int)
        
        bestsellers = Product.query.filter_by(
            is_active=True, 
            is_bestseller=True
        ).limit(limit).all()
        
        return jsonify({
            'bestsellers': [product.to_dict() for product in bestsellers]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<int:product_id>/stock', methods=['PUT'])
def update_stock(product_id):
    """Update product stock"""
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        quantity_change = data.get('quantity_change')
        reason = data.get('reason', 'Manual stock adjustment')
        
        if quantity_change is None:
            return jsonify({'error': 'quantity_change is required'}), 400
        
        product.update_stock(quantity_change, reason)
        
        return jsonify({'product': product.to_dict()})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500