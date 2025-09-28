"""
Product model
"""

from app.core.database import db
from app.models.base import BaseModel

class Product(BaseModel):
    """Product model"""
    
    __tablename__ = "products"
    
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    original_price = db.Column(db.Numeric(10, 2))
    stock = db.Column(db.Integer, nullable=False, default=0)
    color_options = db.Column(db.ARRAY(db.String), nullable=True)
    size_options = db.Column(db.ARRAY(db.String), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    is_bestseller = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    image_url = db.Column(db.String(500))
    images = db.Column(db.ARRAY(db.String), nullable=True)
    sku = db.Column(db.String(100), unique=True)
    weight = db.Column(db.Numeric(8, 2))
    dimensions = db.Column(db.JSON)  # Store as JSON: {"length": 10, "width": 5, "height": 2}
    
    # Relationships
    order_items = db.relationship('OrderItem', backref='product', lazy=True)
    reviews = db.relationship('ProductReview', backref='product', lazy=True)
    inventory_logs = db.relationship('InventoryLog', backref='product', lazy=True)
    
    @property
    def average_rating(self):
        """Calculate average rating from reviews"""
        if not self.reviews:
            return 0
        return sum(review.rating for review in self.reviews) / len(self.reviews)
    
    @property
    def review_count(self):
        """Get total number of reviews"""
        return len(self.reviews)
    
    def is_in_stock(self):
        """Check if product is in stock"""
        return self.stock > 0
    
    def update_stock(self, quantity_change, reason=None):
        """Update product stock and log the change"""
        from app.models.inventory import InventoryLog
        
        previous_stock = self.stock
        self.stock += quantity_change
        
        # Create inventory log
        log = InventoryLog(
            product_id=self.id,
            change_type='adjustment',
            quantity_change=quantity_change,
            previous_stock=previous_stock,
            new_stock=self.stock,
            reason=reason or 'Stock adjustment'
        )
        log.save()
        
        return self.save()
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': str(self.price),
            'original_price': str(self.original_price) if self.original_price else None,
            'stock': self.stock,
            'color_options': self.color_options or [],
            'size_options': self.size_options or [],
            'category': self.category.name if self.category else None,
            'is_bestseller': self.is_bestseller,
            'is_active': self.is_active,
            'image_url': self.image_url,
            'images': self.images or [],
            'sku': self.sku,
            'weight': str(self.weight) if self.weight else None,
            'dimensions': self.dimensions,
            'average_rating': self.average_rating,
            'review_count': self.review_count,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Product {self.name}>'