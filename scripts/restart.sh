#!/bin/bash

# Restart Script for OurStore - Stops and restarts both frontend and backend

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

# Function to kill background processes on exit
cleanup() {
    log "Shutting down servers..."
    if [[ -n "$BACKEND_PID" ]]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [[ -n "$FRONTEND_PID" ]]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Check if we're in the right directory
if [[ ! -d "Back" ]] || [[ ! -d "frontend" ]]; then
    error "Please run this script from the project root directory"
fi

log "🔄 Restarting OurStore application..."

# Step 1: Stop existing processes
log "Step 1: Stopping existing processes..."

# Stop backend processes
log "Stopping backend servers..."
pkill -f "python.*run.py" 2>/dev/null || true
pkill -f "python.*app.py" 2>/dev/null || true
pkill -f "python.*start.py" 2>/dev/null || true

# Stop frontend processes
log "Stopping frontend servers..."
pkill -f "next" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
pkill -f "node.*next" 2>/dev/null || true

# Wait for processes to stop
sleep 3

# Step 2: Check for any remaining processes on our ports
log "Step 2: Checking for processes on ports 3000 and 5000..."

# Check port 5000 (backend)
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    warning "Port 5000 is still in use. Trying to free it..."
    lsof -ti:5000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Check port 3000 (frontend)
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    warning "Port 3000 is still in use. Trying to free it..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

log "✅ All processes stopped successfully"

# Step 3: Start backend server
log "Step 3: Starting backend server..."
cd Back

# Check virtual environment
if [[ ! -d "venv" ]]; then
    error "Virtual environment not found. Please run setup.sh first."
fi

source venv/bin/activate

# Quick health check of the application
log "Performing quick application health check..."
python -c "
try:
    from app.factory import create_app
    from app.core.database import db
    from app.models.product import Product
    
    app = create_app()
    with app.app_context():
        # Test database connection
        product_count = Product.query.count()
        print(f'✅ Database connection OK - {product_count} products')
except Exception as e:
    print(f'❌ Application health check failed: {e}')
    exit(1)
"

if [[ $? -ne 0 ]]; then
    error "Application health check failed. Please check your setup."
fi

log "Starting backend on http://localhost:5000..."
python run.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 4

# Verify backend is running
if curl -s http://localhost:5000/api/health > /dev/null; then
    log "✅ Backend server started successfully"
else
    error "❌ Backend server failed to start"
fi

# Step 4: Start frontend server
log "Step 4: Starting frontend server..."
cd frontend

# Check if node_modules exists
if [[ ! -d "node_modules" ]]; then
    warning "node_modules not found. Installing dependencies..."
    npm install
fi

log "Starting frontend on http://localhost:3000..."
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 5

# Verify frontend is running
if curl -s http://localhost:3000 > /dev/null; then
    log "✅ Frontend server started successfully"
else
    warning "Frontend server might still be starting..."
fi

# Step 5: Display status and URLs
log "✅ OurStore application restarted successfully!"
echo ""
info "🌐 Application URLs:"
info "   Frontend: http://localhost:3000"
info "   Backend API: http://localhost:5000"
info "   API Health: http://localhost:5000/api/health"
info "   Products API: http://localhost:5000/api/products"
info "   Admin Dashboard: http://localhost:5000/api/admin/dashboard"
echo ""
info "📊 Quick Status Check:"

# Backend status
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo -e "   Backend: ${GREEN}✅ Running${NC}"
else
    echo -e "   Backend: ${RED}❌ Not responding${NC}"
fi

# Frontend status (basic check)
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "   Frontend: ${GREEN}✅ Running${NC}"
else
    echo -e "   Frontend: ${YELLOW}⏳ Starting...${NC}"
fi

echo ""
log "🎯 Both servers are running in the background"
log "📝 Logs will appear in this terminal"
log "🛑 Press Ctrl+C to stop both servers"

# Keep the script running and show logs
wait