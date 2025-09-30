"""
Category model
"""

from app.core.database import db
from app.models.base import BaseModel

class Category(BaseModel):
    """Product category model"""
    
    __tablename__ = "categories"
    
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.Text)
    name_code = db.Column(db.String(100), nullable=False)  # Translation key for name
    description_code = db.Column(db.String(100))  # Translation key for description
    
    # Relationships
    products = db.relationship('Product', backref='category', lazy=True)
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'name_code': self.name_code,
            'description_code': self.description_code,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Category {self.name}>'