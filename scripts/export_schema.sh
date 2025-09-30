# Database Schema Export Script

# Export current database schema to SQL file
sudo -u postgres pg_dump --schema-only --no-owner --no-privileges ourstore_db > Back/database_exports/current_schema.sql
