#!/bin/bash

# Backend Setup Script for OurStore
# Sets up Python environment, installs dependencies, and configures database

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
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

# Check if we're in the right directory
if [[ ! -d "Back" ]]; then
    error "Please run this script from the project root directory"
fi

cd Back

log "Setting up Python backend environment..."

# Create virtual environment
if [[ ! -d "venv" ]]; then
    log "Creating Python virtual environment..."
    python3 -m venv venv
else
    log "Virtual environment already exists"
fi

# Activate virtual environment
log "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
log "Upgrading pip..."
pip install --upgrade pip

# Install dependencies
log "Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [[ ! -f .env ]]; then
    log "Creating .env file..."
    cat > .env << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://ourstore_user:ourstore123@localhost/ourstore_db

# Flask Configuration
FLASK_ENV=development
SECRET_KEY=your-secret-key-here-change-in-production
JWT_SECRET_KEY=jwt-secret-string-change-in-production

# Application Settings
PORT=5000
DEBUG=True
EOF
    log ".env file created ✓"
else
    log ".env file already exists"
fi

# Test database connection
log "Testing database connection..."
if PGPASSWORD=ourstore123 psql -h localhost -U ourstore_user -d ourstore_db -c "SELECT 1;" &> /dev/null; then
    log "Database connection successful ✓"
else
    warning "Database connection failed. Make sure PostgreSQL is running and database is set up."
fi

# Initialize database (optional)
read -p "Do you want to initialize the database with sample data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log "Initializing database..."
    if python init_db.py; then
        log "Database initialized successfully ✓"
    else
        warning "Database initialization failed. You can run 'python init_db.py' manually later."
    fi
fi

log "Backend setup completed successfully! ✅"
log "To start the backend server:"
log "  cd Back"
log "  source venv/bin/activate"
log "  python run.py"
log "  # Or use: python start.py (auto-detecting launcher)"

cd ..