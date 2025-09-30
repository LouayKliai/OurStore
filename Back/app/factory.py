"""
Flask Application Factory
Creates and configures the Flask application instance
"""

from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app(config_name=None):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    from app.core.config import get_config
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    config = get_config(config_name)
    app.config.from_object(config)
    
    # Initialize extensions
    from app.core.database import db
    db.init_app(app)
    
    # CORS configuration
    cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://localhost:3001')
    origins_list = [origin.strip() for origin in cors_origins.split(',') if origin.strip()]
    CORS(app, origins=origins_list)
    
    # Flask-Migrate
    migrate = Migrate(app, db)
    
    # Register blueprints
    from app.api import register_blueprints
    register_blueprints(app)
    
    # Initialize Cloudinary for image uploads
    from app.utils.image_upload import init_cloudinary
    with app.app_context():
        init_cloudinary()
    
    # Register error handlers
    register_error_handlers(app)
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'message': 'OurStore API is running',
            'version': '1.0.0'
        })
    
    return app

def register_error_handlers(app):
    """Register application error handlers"""
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        from app.core.database import db
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500
    
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({'error': 'Bad request'}), 400
    
    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({'error': 'Unauthorized'}), 401
    
    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({'error': 'Forbidden'}), 403