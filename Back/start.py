#!/usr/bin/env python3
"""
Production-ready start script for OurStore Backend
Handles both development and production environments
"""

import os
import sys

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def main():
    """Main application entry point"""
    try:
        # Try new structure first
        from app.factory import create_app
        from app.core.database import db

        # Determine environment
        env = os.getenv('FLASK_ENV', 'development')
        app = create_app(env)

        print("✅ Starting with new modular structure")
    except ImportError:
        try:
            # Fallback to old structure
            from app import app
            print("✅ Starting with legacy structure")
        except ImportError as e:
            print(f"❌ Failed to import application: {e}")
            sys.exit(1)

    # Get configuration from environment (Render provides PORT)
    host = os.getenv('FLASK_HOST', '0.0.0.0')  # Listen on all interfaces for production
    port = int(os.getenv('PORT', os.getenv('FLASK_PORT', 5000)))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

    # Production settings
    if os.getenv('RENDER'):  # Detect Render environment
        debug = False
        host = '0.0.0.0'
        print("🚀 Starting OurStore API server (Render Production)")
    elif os.getenv('FLASK_ENV') == 'production':
        debug = False
        host = '0.0.0.0'
        print("🚀 Starting OurStore API server (Production Mode)")
    else:
        print("🚀 Starting OurStore API server (Development Mode)")

    print(f"🌐 Health check: http://localhost:{port}/api/health")
    print(f"🔧 Debug mode: {debug}")

    # Create database tables if they don't exist (only in development)
    if hasattr(app, 'app_context') and not os.getenv('RENDER'):
        with app.app_context():
            db.create_all()
            print("✅ Database tables verified")

    # Run the application
    app.run(
        host=host,
        port=port,
        debug=debug,
        use_reloader=debug and not os.getenv('RENDER')  # Disable reloader on Render
    )

if __name__ == '__main__':
    main()