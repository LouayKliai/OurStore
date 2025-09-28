"""
Customer model
"""

from app.core.database import db
from app.models.base import BaseModel

class Customer(BaseModel):
    """Customer model"""
    
    __tablename__ = "customers"
    
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True)
    phone = db.Column(db.String(20))
    address = db.Column(db.Text)
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    postal_code = db.Column(db.String(20))
    date_of_birth = db.Column(db.Date)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    orders = db.relationship('Order', backref='customer', lazy=True)
    reviews = db.relationship('ProductReview', backref='customer', lazy=True)
    
    @property
    def full_address(self):
        """Get formatted full address"""
        parts = [self.address, self.city, self.country, self.postal_code]
        return ', '.join(filter(None, parts))
    
    @property
    def total_orders(self):
        """Get total number of orders"""
        return len(self.orders)
    
    @property
    def total_spent(self):
        """Calculate total amount spent by customer"""
        return sum(order.total_amount for order in self.orders if order.payment_status == 'completed')
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'address': self.address,
            'city': self.city,
            'country': self.country,
            'postal_code': self.postal_code,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'is_active': self.is_active,
            'full_address': self.full_address,
            'total_orders': self.total_orders,
            'total_spent': str(self.total_spent),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Customer {self.name}>'