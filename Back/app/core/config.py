"""
Application Configuration
Environment-based configuration classes
"""

import os
from datetime import timedelta

class Config:
    """Base configuration class"""
    
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://ourstore_user:ourstore123@localhost/ourstore_db'
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
    }
    
    # Security Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here-change-in-production'
    
    # JWT Configuration (for admin authentication)
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-string'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
    # File Upload Configuration
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    
    # Cloudinary Configuration (Free tier: 25GB storage, 25GB monthly bandwidth)
    CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME')
    CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY')
    CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET')
    
    # Image Storage Settings
    USE_CLOUDINARY = os.environ.get('USE_CLOUDINARY', 'true').lower() in ['true', 'on', '1']
    IMAGE_QUALITY = 90  # Image compression quality (1-100)
    MAX_IMAGE_SIZE = (1920, 1080)  # Max dimensions for uploaded images
    
    # Email Configuration (for notifications)
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 587)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    
    # Pagination
    PRODUCTS_PER_PAGE = 20
    ORDERS_PER_PAGE = 20
    CUSTOMERS_PER_PAGE = 20
    
    # Business Settings
    DEFAULT_CURRENCY = 'TND'
    DEFAULT_TAX_RATE = 0.08  # 8%
    DEFAULT_SHIPPING_COST = 9.99
    FREE_SHIPPING_THRESHOLD = 50.00
    
    # Redis Configuration (for caching, optional)
    REDIS_URL = os.environ.get('REDIS_URL') or 'redis://localhost:6379/0'
    
    # CORS Configuration
    CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:3001']

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://ourstore_user:ourstore123@localhost/ourstore_db'

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    # Use environment variables for sensitive data in production
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://ourstore_user:ourstore123@localhost/ourstore_test'
    WTF_CSRF_ENABLED = False

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

def get_config(config_name=None):
    """Get configuration class based on environment name"""
    if config_name is None:
        config_name = 'default'
    return config.get(config_name, DevelopmentConfig)