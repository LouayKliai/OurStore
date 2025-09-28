"""
Newsletter subscription model
"""

from app.core.database import db
from app.models.base import BaseModel

class NewsletterSubscription(BaseModel):
    """Newsletter subscription model"""
    
    __tablename__ = "newsletter_subscriptions"
    
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255))
    is_active = db.Column(db.Boolean, default=True)
    preferences = db.Column(db.JSON)  # Store subscription preferences
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'is_active': self.is_active,
            'preferences': self.preferences,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<NewsletterSubscription {self.email}>'