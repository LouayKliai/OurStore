"""
Coupon model
"""

from datetime import datetime
from app.core.database import db
from app.models.base import BaseModel

class Coupon(BaseModel):
    """Coupon model for discounts"""
    
    __tablename__ = "coupons"
    
    code = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    discount_type = db.Column(db.String(20))  # percentage, fixed_amount
    discount_value = db.Column(db.Numeric(10, 2), nullable=False)
    minimum_order_amount = db.Column(db.Numeric(10, 2), default=0)
    usage_limit = db.Column(db.Integer)
    used_count = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    valid_from = db.Column(db.DateTime)
    valid_until = db.Column(db.DateTime)
    
    def is_valid(self):
        """Check if coupon is valid for use"""
        now = datetime.utcnow()
        if not self.is_active:
            return False
        if self.valid_from and now < self.valid_from:
            return False
        if self.valid_until and now > self.valid_until:
            return False
        if self.usage_limit and self.used_count >= self.usage_limit:
            return False
        return True
    
    def calculate_discount(self, order_amount):
        """Calculate discount amount for given order amount"""
        if not self.is_valid() or order_amount < self.minimum_order_amount:
            return 0
        
        if self.discount_type == 'percentage':
            return (order_amount * self.discount_value) / 100
        else:  # fixed_amount
            return min(self.discount_value, order_amount)
    
    def use_coupon(self):
        """Increment usage count"""
        self.used_count += 1
        return self.save()
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'code': self.code,
            'name': self.name,
            'description': self.description,
            'discount_type': self.discount_type,
            'discount_value': str(self.discount_value),
            'minimum_order_amount': str(self.minimum_order_amount),
            'usage_limit': self.usage_limit,
            'used_count': self.used_count,
            'is_active': self.is_active,
            'is_valid': self.is_valid(),
            'valid_from': self.valid_from.isoformat() if self.valid_from else None,
            'valid_until': self.valid_until.isoformat() if self.valid_until else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Coupon {self.code}>'