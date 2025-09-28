#!/bin/bash

# OurStore Project - Complete Setup Script
# This script sets up the entire OurStore e-commerce platform on Ubuntu/Debian systems

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
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

# Check if running on supported OS
check_os() {
    log "Checking operating system..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v apt-get &> /dev/null; then
            log "Ubuntu/Debian detected ✓"
        else
            error "This script is designed for Ubuntu/Debian systems with apt-get"
        fi
    else
        error "This script is designed for Linux systems"
    fi
}

# Check if script is run from correct directory
check_directory() {
    log "Checking project directory..."
    if [[ ! -f "package.json" ]] && [[ ! -d "frontend" ]] && [[ ! -d "Back" ]]; then
        error "Please run this script from the OurStore project root directory"
    fi
    log "Project directory verified ✓"
}

# Update system packages
update_system() {
    log "Updating system packages..."
    sudo apt-get update -y
    log "System packages updated ✓"
}

# Install Node.js and npm
install_nodejs() {
    log "Installing Node.js and npm..."
    
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log "Node.js already installed: $NODE_VERSION"
        if [[ "${NODE_VERSION#v}" < "18" ]]; then
            warning "Node.js version is less than 18. Updating..."
        else
            log "Node.js version is adequate ✓"
            return
        fi
    fi
    
    # Install Node.js 20.x
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # Verify installation
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    log "Node.js installed: $NODE_VERSION ✓"
    log "npm installed: $NPM_VERSION ✓"
}

# Install Python and pip
install_python() {
    log "Installing Python and pip..."
    
    sudo apt-get install -y python3 python3-pip python3-venv python3-dev
    
    # Verify installation
    PYTHON_VERSION=$(python3 --version)
    log "Python installed: $PYTHON_VERSION ✓"
}

# Install PostgreSQL
install_postgresql() {
    log "Installing PostgreSQL..."
    
    if command -v psql &> /dev/null; then
        log "PostgreSQL already installed"
    else
        sudo apt-get install -y postgresql postgresql-contrib
    fi
    
    # Start PostgreSQL service
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
    # Verify installation
    PG_VERSION=$(sudo -u postgres psql -c "SELECT version();" | head -n 3 | tail -n 1)
    log "PostgreSQL installed and running ✓"
}

# Setup PostgreSQL database and user
setup_database() {
    log "Setting up PostgreSQL database..."
    
    # Create database and user
    sudo -u postgres psql -c "DROP DATABASE IF EXISTS ourstore_db;"
    sudo -u postgres psql -c "DROP USER IF EXISTS ourstore_user;"
    
    sudo -u postgres psql -c "CREATE DATABASE ourstore_db;"
    sudo -u postgres psql -c "CREATE USER ourstore_user WITH PASSWORD 'ourstore123';"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ourstore_db TO ourstore_user;"
    sudo -u postgres psql -c "ALTER USER ourstore_user CREATEDB;"
    sudo -u postgres psql -c "ALTER DATABASE ourstore_db OWNER TO ourstore_user;"
    sudo -u postgres psql -d ourstore_db -c "GRANT ALL ON SCHEMA public TO ourstore_user;"
    
    log "Database setup completed ✓"
}

# Setup backend environment
setup_backend() {
    log "Setting up backend environment..."
    
    cd Back
    
    # Create virtual environment
    python3 -m venv venv
    
    # Activate virtual environment and install dependencies
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
    
    # Create .env file if it doesn't exist
    if [[ ! -f .env ]]; then
        cp .env.example .env
        log "Created .env file from template"
    fi
    
    # Update database URL in .env
    sed -i 's|DATABASE_URL=.*|DATABASE_URL=postgresql://ourstore_user:ourstore123@localhost/ourstore_db|' .env
    
    log "Backend environment setup completed ✓"
    cd ..
}

# Setup frontend environment
setup_frontend() {
    log "Setting up frontend environment..."
    
    cd frontend
    
    # Install dependencies
    npm install
    
    # Build the project to verify everything works
    npm run build
    
    log "Frontend environment setup completed ✓"
    cd ..
}

# Initialize database with sample data
initialize_database() {
    log "Initializing database with sample data..."
    
    cd Back
    source venv/bin/activate
    
    # Try to initialize database
    if python init_db.py; then
        log "Database initialized with sample data ✓"
    else
        warning "Database initialization failed, but setup can continue"
        log "You can manually run 'python init_db.py' later"
    fi
    
    cd ..
}

# Create startup scripts
create_startup_scripts() {
    log "Creating startup scripts..."
    
    # Create backend startup script
    cat > start_backend.sh << 'EOF'
#!/bin/bash
cd Back
source venv/bin/activate
python app_simple.py
EOF
    chmod +x start_backend.sh
    
    # Create frontend startup script  
    cat > start_frontend.sh << 'EOF'
#!/bin/bash
cd frontend
npm run dev
EOF
    chmod +x start_frontend.sh
    
    # Create combined startup script
    cat > start_project.sh << 'EOF'
#!/bin/bash

# Start OurStore Project
echo "Starting OurStore E-commerce Platform..."

# Function to start backend
start_backend() {
    echo "Starting backend server..."
    cd Back
    source venv/bin/activate
    python app_simple.py &
    BACKEND_PID=$!
    echo "Backend started with PID: $BACKEND_PID"
    cd ..
}

# Function to start frontend  
start_frontend() {
    echo "Starting frontend server..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    echo "Frontend started with PID: $FRONTEND_PID"
    cd ..
}

# Start both servers
start_backend
sleep 3
start_frontend

echo ""
echo "🎉 OurStore is now running!"
echo "📊 Backend API: http://localhost:5000"
echo "🎨 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap 'echo "Stopping servers..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' INT
wait
EOF
    chmod +x start_project.sh
    
    log "Startup scripts created ✓"
}

# Verify installation
verify_installation() {
    log "Verifying installation..."
    
    # Check backend
    cd Back
    source venv/bin/activate
    if python -c "import flask, flask_sqlalchemy, flask_cors, psycopg2; print('Backend dependencies OK')"; then
        log "Backend dependencies verified ✓"
    else
        error "Backend dependencies verification failed"
    fi
    cd ..
    
    # Check frontend
    cd frontend
    if [[ -d node_modules ]] && [[ -f package-lock.json ]]; then
        log "Frontend dependencies verified ✓"
    else
        error "Frontend dependencies verification failed"
    fi
    cd ..
    
    # Test database connection
    if PGPASSWORD=ourstore123 psql -h localhost -U ourstore_user -d ourstore_db -c "SELECT 1;" &> /dev/null; then
        log "Database connection verified ✓"
    else
        error "Database connection verification failed"
    fi
}

# Main setup function
main() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                   OurStore Setup Script                     ║"
    echo "║              E-commerce Platform Installer                  ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    log "Starting OurStore project setup..."
    
    check_os
    check_directory
    update_system
    install_nodejs
    install_python
    install_postgresql
    setup_database
    setup_backend
    setup_frontend
    initialize_database
    create_startup_scripts
    verify_installation
    
    echo -e "${GREEN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    Setup Complete! 🎉                       ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    echo ""
    log "🎯 Next steps:"
    echo "1. Start the project: ./start_project.sh"
    echo "2. Or start servers individually:"
    echo "   - Backend: ./start_backend.sh"
    echo "   - Frontend: ./start_frontend.sh"
    echo ""
    echo "📊 Backend API will be available at: http://localhost:5000"
    echo "🎨 Frontend will be available at: http://localhost:3000"
    echo ""
    log "Setup completed successfully! ✅"
}

# Run main function
main "$@"