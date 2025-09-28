"""
Product review model
"""

from app.core.database import db
from app.models.base import BaseModel

class ProductReview(BaseModel):
    """Product review model"""
    
    __tablename__ = "product_reviews"
    
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=True)
    rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
    review_title = db.Column(db.String(255))
    review_text = db.Column(db.Text)
    is_verified_purchase = db.Column(db.Boolean, default=False)
    is_approved = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'product_id': self.product_id,
            'customer': self.customer.to_dict() if self.customer else None,
            'rating': self.rating,
            'review_title': self.review_title,
            'review_text': self.review_text,
            'is_verified_purchase': self.is_verified_purchase,
            'is_approved': self.is_approved,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<ProductReview {self.id}: {self.rating} stars>'