"""
Base model class with common functionality
"""

from datetime import datetime
from app.core.database import db

class BaseModel(db.Model):
    """Base model class with common fields and methods"""
    
    __abstract__ = True
    
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def save(self):
        """Save instance to database"""
        db.session.add(self)
        db.session.commit()
        return self
    
    def delete(self):
        """Delete instance from database"""
        db.session.delete(self)
        db.session.commit()
    
    def update(self, **kwargs):
        """Update instance with given keyword arguments"""
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.updated_at = datetime.utcnow()
        db.session.commit()
        return self