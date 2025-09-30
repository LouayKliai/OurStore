#!/usr/bin/env python3
"""
Script to create database tables
"""

from app.factory import create_app
from app.core.database import db

def main():
    app = create_app()
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        print("✅ Database tables created successfully!")

if __name__ == '__main__':
    main()