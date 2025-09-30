from flask import Blueprint, request, jsonify
from app.models.order import Order, OrderItem
from app.models.customer import Customer
from app.models.product import Product
from app.core.database import db
from datetime import datetime
import uuid

orders_bp = Blueprint('orders', __name__, url_prefix='/api/orders')

@orders_bp.route('', methods=['GET'])
def get_orders():
    """Get all orders with optional filtering"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        status = request.args.get('status')
        customer_id = request.args.get('customer_id', type=int)
        
        query = Order.query
        
        if status:
            query = query.filter(Order.status == status)
        if customer_id:
            query = query.filter(Order.customer_id == customer_id)
            
        orders = query.order_by(Order.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'orders': [order.to_dict() for order in orders.items],
            'total': orders.total,
            'pages': orders.pages,
            'current_page': page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Get order by ID"""
    try:
        order = Order.query.get_or_404(order_id)
        return jsonify(order.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('', methods=['POST'])
def create_order():
    """Create a new order"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['customer_id', 'items', 'shipping_address']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Verify customer exists
        customer = Customer.query.get(data['customer_id'])
        if not customer:
            return jsonify({'error': 'Customer not found'}), 404
        
        # Create order
        order = Order(
            customer_id=data['customer_id'],
            status='pending',
            shipping_address=data['shipping_address'],
            billing_address=data.get('billing_address', data['shipping_address']),
            payment_status='pending'
        )
        
        # Add order items
        total_amount = 0
        for item_data in data['items']:
            product = Product.query.get(item_data['product_id'])
            if not product:
                return jsonify({'error': f'Product {item_data["product_id"]} not found'}), 404
            
            if product.stock < item_data['quantity']:
                return jsonify({'error': f'Insufficient stock for {product.name}'}), 400
            
            order_item = OrderItem(
                product_id=item_data['product_id'],
                quantity=item_data['quantity'],
                price=product.price,
                color=item_data.get('color'),
                size=item_data.get('size')
            )
            order.order_items.append(order_item)
            total_amount += product.price * item_data['quantity']
            
            # Update stock
            product.update_stock(-item_data['quantity'], 'sale')
        
        # Set order totals
        order.subtotal = total_amount
        order.total_amount = total_amount  # Add shipping/tax logic later if needed
        order.save()
        
        return jsonify(order.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    """Update order status"""
    try:
        order = Order.query.get_or_404(order_id)
        data = request.get_json()
        
        if 'status' in data:
            old_status = order.status
            order.status = data['status']
            
            # Update timestamps based on status
            if data['status'] == 'shipped' and old_status != 'shipped':
                order.shipped_at = datetime.utcnow()
            elif data['status'] == 'delivered' and old_status != 'delivered':
                order.delivered_at = datetime.utcnow()
        
        if 'tracking_number' in data:
            order.tracking_number = data['tracking_number']
        
        order.save()
        return jsonify(order.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/<int:order_id>', methods=['DELETE'])
def cancel_order(order_id):
    """Cancel an order"""
    try:
        order = Order.query.get_or_404(order_id)
        
        if order.status in ['shipped', 'delivered']:
            return jsonify({'error': 'Cannot cancel shipped or delivered orders'}), 400
        
        # Restore stock
        for item in order.items:
            product = Product.query.get(item.product_id)
            if product:
                product.update_stock(item.quantity, 'order_cancellation')
        
        order.status = 'cancelled'
        order.save()
        
        return jsonify({'message': 'Order cancelled successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/stats', methods=['GET'])
def get_order_stats():
    """Get order statistics"""
    try:
        from sqlalchemy import func
        
        total_orders = Order.query.count()
        pending_orders = Order.query.filter(Order.status == 'pending').count()
        shipped_orders = Order.query.filter(Order.status == 'shipped').count()
        delivered_orders = Order.query.filter(Order.status == 'delivered').count()
        
        total_revenue = db.session.query(func.sum(Order.total_amount)).scalar() or 0
        
        return jsonify({
            'total_orders': total_orders,
            'pending_orders': pending_orders,
            'shipped_orders': shipped_orders,
            'delivered_orders': delivered_orders,
            'total_revenue': float(total_revenue)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500