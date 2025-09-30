#!/usr/bin/env python3
"""
Post-deployment setup script for Render
Run this after deploying to Render to set up the database
"""

import os
import sys

def main():
    try:
        from app.factory import create_app
        from app.core.database import db

        # Create app
        env = os.getenv('FLASK_ENV', 'production')
        app = create_app(env)

        with app.app_context():
            print("Creating database tables...")
            db.create_all()
            print("✅ Database tables created successfully!")

            # Optional: Run seed data
            if os.getenv('RUN_SEED_DATA', 'false').lower() == 'true':
                print("Seeding database with initial data...")
                try:
                    from seed_database import seed_database
                    seed_database()
                    print("✅ Database seeded successfully!")
                except Exception as e:
                    print(f"⚠️  Seeding failed (this is optional): {e}")

    except Exception as e:
        print(f"❌ Setup failed: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()