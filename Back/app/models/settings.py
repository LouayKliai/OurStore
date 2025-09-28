"""
Site settings model
"""

from app.core.database import db
from app.models.base import BaseModel

class SiteSetting(BaseModel):
    """Site settings model for configuration"""
    
    __tablename__ = "site_settings"
    
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text)
    description = db.Column(db.Text)
    setting_type = db.Column(db.String(50), default='string')  # string, number, boolean, json
    
    @classmethod
    def get_setting(cls, key, default=None):
        """Get setting value by key"""
        setting = cls.query.filter_by(key=key).first()
        if not setting:
            return default
        
        # Convert value based on type
        if setting.setting_type == 'boolean':
            return setting.value.lower() in ('true', '1', 'yes')
        elif setting.setting_type == 'number':
            try:
                return float(setting.value)
            except (ValueError, TypeError):
                return default
        elif setting.setting_type == 'json':
            try:
                import json
                return json.loads(setting.value)
            except (ValueError, TypeError):
                return default
        else:
            return setting.value
    
    @classmethod
    def set_setting(cls, key, value, description=None, setting_type='string'):
        """Set or update setting"""
        setting = cls.query.filter_by(key=key).first()
        if setting:
            setting.value = str(value)
            if description:
                setting.description = description
            setting.setting_type = setting_type
        else:
            setting = cls(
                key=key,
                value=str(value),
                description=description,
                setting_type=setting_type
            )
        
        return setting.save()
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'key': self.key,
            'value': self.value,
            'description': self.description,
            'setting_type': self.setting_type,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<SiteSetting {self.key}>'