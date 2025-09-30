from flask import Blueprint, request, jsonify
from app.models.customer import Customer
from app.models.order import Order
from app.core.database import db
from sqlalchemy import func

customers_bp = Blueprint('customers', __name__, url_prefix='/api/customers')

@customers_bp.route('', methods=['GET'])
def get_customers():
    """Get all customers with optional filtering"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        search = request.args.get('search', '')
        
        query = Customer.query
        
        if search:
            query = query.filter(
                db.or_(
                    Customer.name.ilike(f'%{search}%'),
                    Customer.email.ilike(f'%{search}%'),
                    Customer.phone.ilike(f'%{search}%')
                )
            )
        
        customers = query.order_by(Customer.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'customers': [customer.to_dict() for customer in customers.items],
            'total': customers.total,
            'pages': customers.pages,
            'current_page': page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customers_bp.route('/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    """Get customer by ID"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        return jsonify(customer.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customers_bp.route('', methods=['POST'])
def create_customer():
    """Create a new customer"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name']  # Email is now optional for contact form orders
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if email already exists (only if email is provided)
        if 'email' in data and data['email']:
            existing_customer = Customer.query.filter_by(email=data['email']).first()
            if existing_customer:
                return jsonify({'error': 'Email already exists'}), 400
        
        customer = Customer(
            name=data['name'],
            email=data.get('email'),  # Made email optional
            phone=data.get('phone'),
            address=data.get('address'),
            city=data.get('city'),
            country=data.get('country'),
            postal_code=data.get('postal_code')
        )
        
        customer.save()
        return jsonify(customer.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customers_bp.route('/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    """Update customer information"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        data = request.get_json()
        
        # Check if email is being changed and if it already exists
        if 'email' in data and data['email'] != customer.email:
            existing_customer = Customer.query.filter_by(email=data['email']).first()
            if existing_customer:
                return jsonify({'error': 'Email already exists'}), 400
        
        # Update allowed fields
        allowed_fields = ['name', 'email', 'phone', 'address', 'city', 'country', 'postal_code']
        for field in allowed_fields:
            if field in data:
                setattr(customer, field, data[field])
        
        customer.save()
        return jsonify(customer.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customers_bp.route('/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    """Delete a customer"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        
        # Check if customer has orders
        order_count = Order.query.filter_by(customer_id=customer_id).count()
        if order_count > 0:
            return jsonify({'error': 'Cannot delete customer with existing orders'}), 400
        
        customer.delete()
        return jsonify({'message': 'Customer deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customers_bp.route('/<int:customer_id>/orders', methods=['GET'])
def get_customer_orders(customer_id):
    """Get all orders for a specific customer"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        orders = Order.query.filter_by(customer_id=customer_id)\
                           .order_by(Order.created_at.desc())\
                           .paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'customer': customer.to_dict(),
            'orders': [order.to_dict() for order in orders.items],
            'total': orders.total,
            'pages': orders.pages,
            'current_page': page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customers_bp.route('/<int:customer_id>/stats', methods=['GET'])
def get_customer_stats(customer_id):
    """Get customer statistics"""
    try:
        customer = Customer.query.get_or_404(customer_id)
        
        stats = {
            'customer': customer.to_dict(),
            'total_orders': customer.total_orders,
            'total_spent': customer.total_spent,
            'average_order_value': customer.average_order_value,
            'last_order_date': customer.last_order_date.isoformat() if customer.last_order_date else None
        }
        
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@customers_bp.route('/stats', methods=['GET'])
def get_customers_stats():
    """Get overall customer statistics"""
    try:
        total_customers = Customer.query.count()
        
        # Customers with orders
        customers_with_orders = db.session.query(Customer.id)\
                                         .join(Order)\
                                         .distinct().count()
        
        # New customers this month
        from datetime import datetime, timedelta
        this_month = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        new_customers_this_month = Customer.query.filter(Customer.created_at >= this_month).count()
        
        # Top customers by spending
        top_customers = db.session.query(
            Customer,
            func.sum(Order.total_amount).label('total_spent')
        ).join(Order)\
         .group_by(Customer.id)\
         .order_by(func.sum(Order.total_amount).desc())\
         .limit(5).all()
        
        return jsonify({
            'total_customers': total_customers,
            'customers_with_orders': customers_with_orders,
            'new_customers_this_month': new_customers_this_month,
            'top_customers': [
                {
                    'customer': customer.to_dict(),
                    'total_spent': float(total_spent)
                }
                for customer, total_spent in top_customers
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500