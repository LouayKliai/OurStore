"""
Order and OrderItem models
"""

import uuid
from datetime import datetime
from app.core.database import db
from app.models.base import BaseModel

class Order(BaseModel):
    """Order model"""
    
    __tablename__ = "orders"
    
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=True)
    order_number = db.Column(db.String(50), unique=True, nullable=False)
    status = db.Column(db.String(20), default='pending')
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)
    tax_amount = db.Column(db.Numeric(10, 2), default=0)
    shipping_cost = db.Column(db.Numeric(10, 2), default=0)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='TND')
    payment_status = db.Column(db.String(20), default='pending')
    payment_method = db.Column(db.String(50))
    shipping_address = db.Column(db.JSON)
    billing_address = db.Column(db.JSON)
    notes = db.Column(db.Text)
    
    # Relationships
    order_items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.order_number:
            self.order_number = self.generate_order_number()
    
    def generate_order_number(self):
        """Generate a unique order number"""
        timestamp = datetime.utcnow().strftime('%Y%m%d')
        unique_id = str(uuid.uuid4())[:8].upper()
        return f"ORD-{timestamp}-{unique_id}"
    
    def calculate_total(self):
        """Calculate total amount including items, tax, and shipping"""
        items_total = sum(item.total for item in self.order_items)
        return items_total + (self.tax_amount or 0) + (self.shipping_cost or 0)
    
    def update_totals(self):
        """Update order totals based on items"""
        self.subtotal = sum(item.total for item in self.order_items)
        self.total_amount = self.subtotal + (self.tax_amount or 0) + (self.shipping_cost or 0)
        return self.save()
    
    @property
    def item_count(self):
        """Get total number of items in order"""
        return sum(item.quantity for item in self.order_items)
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'customer': self.customer.to_dict() if self.customer else None,
            'order_number': self.order_number,
            'status': self.status,
            'subtotal': str(self.subtotal),
            'tax_amount': str(self.tax_amount),
            'shipping_cost': str(self.shipping_cost),
            'total_amount': str(self.total_amount),
            'currency': self.currency,
            'payment_status': self.payment_status,
            'payment_method': self.payment_method,
            'shipping_address': self.shipping_address,
            'billing_address': self.billing_address,
            'notes': self.notes,
            'item_count': self.item_count,
            'items': [item.to_dict() for item in self.order_items],
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Order {self.order_number}>'

class OrderItem(BaseModel):
    """Order item model"""
    
    __tablename__ = "order_items"
    
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(50))
    size = db.Column(db.String(50))
    price = db.Column(db.Numeric(10, 2), nullable=False)  # Price at time of order
    total = db.Column(db.Numeric(10, 2), nullable=False)  # quantity * price
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if self.quantity and self.price and not self.total:
            self.total = self.calculate_total()
    
    def calculate_total(self):
        """Calculate total for this line item"""
        return self.quantity * self.price
    
    def update_total(self):
        """Update the total based on quantity and price"""
        self.total = self.calculate_total()
        return self.save()
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'product': self.product.to_dict() if self.product else None,
            'quantity': self.quantity,
            'color': self.color,
            'size': self.size,
            'price': str(self.price),
            'total': str(self.total),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<OrderItem {self.id}: {self.quantity}x Product {self.product_id}>'