"""
OurStore Flask Application Entry Point
Run this file to start the development server
"""

import os
from app.factory import create_app
from app.core.database import db

# Create app instance
app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Create tables if they don't exist
        db.create_all()
    
    # Run the application
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    
    print(f"🚀 Starting OurStore API server on port {port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"🌐 Health check: http://localhost:{port}/api/health")
    
    app.run(host='0.0.0.0', port=port, debug=debug)