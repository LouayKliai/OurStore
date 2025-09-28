"""
Inventory log model
"""

from app.core.database import db
from app.models.base import BaseModel

class InventoryLog(BaseModel):
    """Inventory log model for tracking stock changes"""
    
    __tablename__ = "inventory_logs"
    
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    change_type = db.Column(db.String(20), nullable=False)  # stock_in, stock_out, adjustment, sale, return
    quantity_change = db.Column(db.Integer, nullable=False)
    previous_stock = db.Column(db.Integer, nullable=False)
    new_stock = db.Column(db.Integer, nullable=False)
    reason = db.Column(db.Text)
    reference_id = db.Column(db.Integer)  # Can link to order_id or other reference
    created_by = db.Column(db.String(100))  # Admin user who made the change
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'product': self.product.to_dict() if self.product else None,
            'change_type': self.change_type,
            'quantity_change': self.quantity_change,
            'previous_stock': self.previous_stock,
            'new_stock': self.new_stock,
            'reason': self.reason,
            'reference_id': self.reference_id,
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<InventoryLog {self.id}: {self.change_type} {self.quantity_change}>'