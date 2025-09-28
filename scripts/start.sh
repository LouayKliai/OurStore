#!/bin/bash

# Start script for OurStore - Runs both backend and frontend

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

log "Starting OurStore application..."

# Start backend server
log "Starting backend server..."
cd Back
if [[ ! -d "venv" ]]; then
    error "Virtual environment not found. Please run setup.sh first."
fi

source venv/bin/activate
log "Backend starting on http://localhost:5000"
python run.py &  # Use the new modular structure
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5000/api/health > /dev/null; then
    log "Backend server started successfully ✅"
else
    error "Backend server failed to start"
fi

# Start frontend server
log "Starting frontend server..."
cd frontend
if [[ ! -d "node_modules" ]]; then
    error "Node modules not found. Please run 'npm install' in the frontend directory first."
fi

npm run dev &
FRONTEND_PID=$!
cd ..

# Wait a moment for frontend to start
sleep 5

log "🚀 OurStore is now running!"
log "📱 Frontend: http://localhost:3000 or http://localhost:3001"
log "🔧 Backend API: http://localhost:5000"
log "📊 Health Check: http://localhost:5000/api/health"
log ""
log "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait