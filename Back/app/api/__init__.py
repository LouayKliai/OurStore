"""
API package initialization
Register all API blueprints
"""

def register_blueprints(app):
    """Register all API blueprints with the Flask app"""
    
    from app.api.products import products_bp
    from app.api.orders import orders_bp
    from app.api.admin import admin_bp
    from app.api.customers import customers_bp
    from app.api.images import images_bp
    from app.api.contact import contact_bp
    
    # Register blueprints
    app.register_blueprint(products_bp)
    app.register_blueprint(orders_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(customers_bp)
    app.register_blueprint(images_bp)
    app.register_blueprint(contact_bp)