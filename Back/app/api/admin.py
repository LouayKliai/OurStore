from flask import Blueprint, request, jsonify
from app.models.admin import AdminUser
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order
from app.models.coupon import Coupon
from app.models.settings import SiteSetting
from app.core.database import db
from sqlalchemy import func, desc
from datetime import datetime, timedelta

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/dashboard', methods=['GET'])
def get_dashboard():
    """Get admin dashboard statistics"""
    try:
        # Basic stats
        total_products = Product.query.count()
        total_customers = Customer.query.count()
        total_orders = Order.query.count()
        
        # Revenue stats
        total_revenue = db.session.query(func.sum(Order.total_amount)).scalar() or 0
        
        # This month stats
        this_month = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        orders_this_month = Order.query.filter(Order.created_at >= this_month).count()
        revenue_this_month = db.session.query(func.sum(Order.total_amount))\
                                      .filter(Order.created_at >= this_month).scalar() or 0
        
        # Order status breakdown
        order_statuses = db.session.query(
            Order.status,
            func.count(Order.id).label('count')
        ).group_by(Order.status).all()
        
        # Low stock products
        low_stock_products = Product.query.filter(Product.stock <= 10)\
                                         .order_by(Product.stock.asc()).limit(5).all()
        
        # Recent orders
        recent_orders = Order.query.order_by(Order.created_at.desc()).limit(5).all()
        
        # Top selling products (by quantity sold)
        from app.models.order import OrderItem
        top_products = db.session.query(
            Product,
            func.sum(OrderItem.quantity).label('total_sold')
        ).join(OrderItem, Product.id == OrderItem.product_id)\
         .group_by(Product.id)\
         .order_by(desc('total_sold'))\
         .limit(5).all()
        
        return jsonify({
            'stats': {
                'total_products': total_products,
                'total_customers': total_customers,
                'total_orders': total_orders,
                'total_revenue': float(total_revenue),
                'orders_this_month': orders_this_month,
                'revenue_this_month': float(revenue_this_month)
            },
            'order_statuses': [
                {'status': status, 'count': count}
                for status, count in order_statuses
            ],
            'low_stock_products': [product.to_dict() for product in low_stock_products],
            'recent_orders': [order.to_dict() for order in recent_orders],
            'top_products': [
                {
                    'product': product.to_dict(),
                    'total_sold': total_sold
                }
                for product, total_sold in top_products
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users', methods=['GET'])
def get_admin_users():
    """Get all admin users"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        users = AdminUser.query.order_by(AdminUser.created_at.desc())\
                              .paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'users': [user.to_dict() for user in users.items],
            'total': users.total,
            'pages': users.pages,
            'current_page': page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users', methods=['POST'])
def create_admin_user():
    """Create a new admin user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'role']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if username or email already exists
        existing_user = AdminUser.query.filter(
            db.or_(
                AdminUser.username == data['username'],
                AdminUser.email == data['email']
            )
        ).first()
        
        if existing_user:
            return jsonify({'error': 'Username or email already exists'}), 400
        
        user = AdminUser(
            username=data['username'],
            email=data['email'],
            role=data['role'],
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            is_active=data.get('is_active', True)
        )
        user.set_password(data['password'])
        user.save()
        
        return jsonify(user.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_admin_user(user_id):
    """Update admin user"""
    try:
        user = AdminUser.query.get_or_404(user_id)
        data = request.get_json()
        
        # Check if username or email is being changed and if it already exists
        if 'username' in data and data['username'] != user.username:
            existing_user = AdminUser.query.filter_by(username=data['username']).first()
            if existing_user:
                return jsonify({'error': 'Username already exists'}), 400
        
        if 'email' in data and data['email'] != user.email:
            existing_user = AdminUser.query.filter_by(email=data['email']).first()
            if existing_user:
                return jsonify({'error': 'Email already exists'}), 400
        
        # Update allowed fields
        allowed_fields = ['username', 'email', 'role', 'first_name', 'last_name', 'is_active']
        for field in allowed_fields:
            if field in data:
                setattr(user, field, data[field])
        
        # Update password if provided
        if 'password' in data and data['password']:
            user.set_password(data['password'])
        
        user.save()
        return jsonify(user.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_admin_user(user_id):
    """Delete admin user"""
    try:
        user = AdminUser.query.get_or_404(user_id)
        user.delete()
        return jsonify({'message': 'Admin user deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/coupons', methods=['GET'])
def get_coupons():
    """Get all coupons"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        coupons = Coupon.query.order_by(Coupon.created_at.desc())\
                             .paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'coupons': [coupon.to_dict() for coupon in coupons.items],
            'total': coupons.total,
            'pages': coupons.pages,
            'current_page': page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/coupons', methods=['POST'])
def create_coupon():
    """Create a new coupon"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['code', 'discount_type', 'discount_value']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if coupon code already exists
        existing_coupon = Coupon.query.filter_by(code=data['code']).first()
        if existing_coupon:
            return jsonify({'error': 'Coupon code already exists'}), 400
        
        coupon = Coupon(
            code=data['code'],
            discount_type=data['discount_type'],
            discount_value=data['discount_value'],
            minimum_amount=data.get('minimum_amount'),
            usage_limit=data.get('usage_limit'),
            expiry_date=datetime.fromisoformat(data['expiry_date']) if data.get('expiry_date') else None,
            is_active=data.get('is_active', True)
        )
        
        coupon.save()
        return jsonify(coupon.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/coupons/<int:coupon_id>', methods=['PUT'])
def update_coupon(coupon_id):
    """Update coupon"""
    try:
        coupon = Coupon.query.get_or_404(coupon_id)
        data = request.get_json()
        
        # Update allowed fields
        allowed_fields = ['code', 'discount_type', 'discount_value', 'minimum_amount', 
                         'usage_limit', 'expiry_date', 'is_active']
        
        for field in allowed_fields:
            if field in data:
                if field == 'expiry_date' and data[field]:
                    setattr(coupon, field, datetime.fromisoformat(data[field]))
                else:
                    setattr(coupon, field, data[field])
        
        coupon.save()
        return jsonify(coupon.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/settings', methods=['GET'])
def get_settings():
    """Get site settings"""
    try:
        settings = SiteSetting.get_settings()
        return jsonify(settings)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/settings', methods=['PUT'])
def update_settings():
    """Update site settings"""
    try:
        data = request.get_json()
        SiteSetting.update_settings(data)
        return jsonify({'message': 'Settings updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/analytics', methods=['GET'])
def get_analytics():
    """Get detailed analytics"""
    try:
        # Date range
        days = request.args.get('days', 30, type=int)
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Revenue over time
        daily_revenue = db.session.query(
            func.date(Order.created_at).label('date'),
            func.sum(Order.total_amount).label('revenue')
        ).filter(Order.created_at >= start_date)\
         .group_by(func.date(Order.created_at))\
         .order_by('date').all()
        
        # Orders over time
        daily_orders = db.session.query(
            func.date(Order.created_at).label('date'),
            func.count(Order.id).label('orders')
        ).filter(Order.created_at >= start_date)\
         .group_by(func.date(Order.created_at))\
         .order_by('date').all()
        
        # Customer acquisition
        daily_customers = db.session.query(
            func.date(Customer.created_at).label('date'),
            func.count(Customer.id).label('customers')
        ).filter(Customer.created_at >= start_date)\
         .group_by(func.date(Customer.created_at))\
         .order_by('date').all()
        
        return jsonify({
            'daily_revenue': [
                {'date': str(date), 'revenue': float(revenue)}
                for date, revenue in daily_revenue
            ],
            'daily_orders': [
                {'date': str(date), 'orders': orders}
                for date, orders in daily_orders
            ],
            'daily_customers': [
                {'date': str(date), 'customers': customers}
                for date, customers in daily_customers
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500