#!/bin/bash

# Database Recreation Script for OurStore
# Drops and recreates the database with fresh seed data

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

# Check if we're in the right directory
if [[ ! -d "Back" ]]; then
    error "Please run this script from the project root directory"
fi

log "🗃️  Starting database recreation process..."

# Configuration
DB_NAME="ourstore_db"
DB_USER="postgres"

warning "This will completely drop and recreate the database!"
warning "All existing data will be lost!"
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log "Database recreation cancelled."
    exit 0
fi

log "Step 1: Stopping any running backend servers..."
pkill -f "python.*run.py" 2>/dev/null || true
pkill -f "python.*app.py" 2>/dev/null || true
sleep 2

log "Step 2: Dropping existing database..."
sudo -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;" || {
    error "Failed to drop database. Make sure PostgreSQL is running and you have permissions."
}

log "Step 3: Creating fresh database..."
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;" || {
    error "Failed to create database."
}

log "Step 4: Setting up database permissions..."
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" || {
    warning "Could not grant database privileges (this might be okay if user has superuser rights)"
}

# Grant schema permissions
sudo -u postgres psql -d $DB_NAME -c "GRANT ALL ON SCHEMA public TO $DB_USER;" || {
    warning "Could not grant schema privileges"
}
sudo -u postgres psql -d $DB_NAME -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;" || {
    warning "Could not grant table privileges"
}
sudo -u postgres psql -d $DB_NAME -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;" || {
    warning "Could not grant sequence privileges"
}
sudo -u postgres psql -d $DB_NAME -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;" || {
    warning "Could not set default privileges"
}

log "Step 5: Activating Python environment..."
cd Back
if [[ ! -d "venv" ]]; then
    error "Virtual environment not found. Please run setup.sh first."
fi

source venv/bin/activate

log "Step 6: Creating database tables..."
python -c "
from app.factory import create_app
from app.core.database import db

app = create_app()
with app.app_context():
    db.create_all()
    print('✅ Database tables created successfully')
" || {
    error "Failed to create database tables"
}

log "Step 7: Seeding database with sample data..."
python seed_database.py || {
    error "Failed to seed database"
}

log "Step 8: Verifying database setup..."
python -c "
from app.factory import create_app
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order

app = create_app()
with app.app_context():
    products = Product.query.count()
    customers = Customer.query.count()
    orders = Order.query.count()
    
    print(f'✅ Database verification:')
    print(f'   📦 Products: {products}')
    print(f'   👥 Customers: {customers}')
    print(f'   🛒 Orders: {orders}')
    
    if products > 0 and customers > 0:
        print('✅ Database recreation completed successfully!')
    else:
        print('❌ Database seems empty - something went wrong')
        exit(1)
" || {
    error "Database verification failed"
}

cd ..

log "✅ Database recreation completed successfully!"
log "🚀 You can now start the application with: ./scripts/start.sh"

# Optional: Start the backend to test
read -p "Would you like to start the backend server now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log "Starting backend server..."
    cd Back
    source venv/bin/activate
    python run.py &
    BACKEND_PID=$!
    cd ..
    
    sleep 3
    
    if curl -s http://localhost:5000/api/health > /dev/null; then
        log "✅ Backend server started successfully!"
        log "🌐 API available at: http://localhost:5000"
        log "📊 Admin dashboard: http://localhost:5000/api/admin/dashboard"
        log "🛍️  Products API: http://localhost:5000/api/products"
        log ""
        log "Press Ctrl+C to stop the server"
        wait $BACKEND_PID
    else
        error "Backend server failed to start"
    fi
fi