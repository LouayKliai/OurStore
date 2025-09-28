#!/usr/bin/env python3
"""
OurStore Backend Application Entry Point
Supports both old and new application structures
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
        app = create_app()
        print("✅ Starting with new modular structure")
    except ImportError:
        try:
            # Fallback to old structure
            from app import app
            print("✅ Starting with legacy structure")
        except ImportError as e:
            print(f"❌ Failed to import application: {e}")
            sys.exit(1)
    
    # Get configuration from environment
    host = os.getenv('FLASK_HOST', '127.0.0.1')
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    print(f"🚀 Starting OurStore Backend on http://{host}:{port}")
    print(f"🔧 Debug mode: {debug}")
    
    # Run the application
    app.run(
        host=host,
        port=port,
        debug=debug,
        use_reloader=debug
    )

if __name__ == '__main__':
    main()