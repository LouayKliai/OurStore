#!/bin/bash

# OurStore Scripts Overview
# Shows available scripts and their usage

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🏪 OurStore Development Scripts${NC}"
echo "=================================="
echo ""

echo -e "${GREEN}📋 Available Scripts:${NC}"
echo ""

echo -e "${BLUE}1. 🚀 Full Setup (Linux/macOS):${NC}"
echo -e "   ${YELLOW}./scripts/setup.sh${NC}"
echo "   • Installs system dependencies (PostgreSQL, Python, Node.js)"
echo "   • Sets up Python virtual environment"
echo "   • Installs all dependencies"
echo "   • Configures database"
echo "   • Seeds with sample data"
echo ""

echo -e "${BLUE}2. 🖥️ Windows Setup:${NC}"
echo -e "   ${YELLOW}scripts\\setup_windows.bat${NC}"
echo "   • Windows equivalent of setup.sh"
echo ""

echo -e "${BLUE}3. 🔄 Restart Application:${NC}"
echo -e "   ${YELLOW}./scripts/restart.sh${NC}"
echo "   • Stops all running servers"
echo "   • Restarts both backend and frontend"
echo "   • Shows status and URLs"
echo ""

echo -e "${BLUE}4. 🗃️ Recreate Database:${NC}"
echo -e "   ${YELLOW}./scripts/recreate_db.sh${NC}"
echo "   • Drops and recreates database"
echo "   • Seeds with fresh sample data"
echo "   • Includes safety confirmation"
echo ""

echo -e "${BLUE}5. 🧪 Run Tests:${NC}"
echo -e "   ${YELLOW}./scripts/test.sh${NC}"
echo "   • Comprehensive test suite"
echo "   • Tests backend, database, and frontend"
echo "   • Validates all functionality"
echo "   • Windows-specific setup script"
echo "   • Requires manual PostgreSQL installation"
echo ""

echo -e "${BLUE}3. 🔧 Backend Only Setup:${NC}"
echo -e "   ${YELLOW}./scripts/setup_backend.sh${NC}"
echo "   • Sets up only the Python/Flask backend"
echo "   • Good for backend-focused development"
echo ""

echo -e "${BLUE}4. ▶️ Start Both Servers:${NC}"
echo -e "   ${YELLOW}./scripts/start.sh${NC}"
echo "   • Starts both frontend and backend servers"
echo "   • Runs in foreground with cleanup on Ctrl+C"
echo "   • Backend: http://localhost:5000"
echo "   • Frontend: http://localhost:3000 or :3001"
echo ""

echo -e "${BLUE}5. 🐍 Backend Development:${NC}"
echo -e "   ${YELLOW}cd Back && ./start_dev.sh${NC}"
echo "   • Quick start for backend development"
echo "   • Only starts the Flask API server"
echo ""

echo -e "${BLUE}6. 🌱 Database Seeding:${NC}"
echo -e "   ${YELLOW}cd Back && source venv/bin/activate && python seed_database.py${NC}"
echo "   • Populates database with realistic sample data"
echo "   • Creates 10 products, 4 customers, 15 orders, reviews"
echo "   • Admin login: admin/admin123"
echo ""

echo -e "${BLUE}7. ✅ Validate Scripts:${NC}"
echo -e "   ${YELLOW}./scripts/validate.sh${NC}"
echo "   • Checks all scripts for correctness"
echo "   • Validates file references and dependencies"
echo ""

echo -e "${GREEN}🎯 Quick Start Workflow:${NC}"
echo "1. Run setup: ${YELLOW}./scripts/setup.sh${NC}"
echo "2. Start servers: ${YELLOW}./scripts/start.sh${NC}"
echo "3. Visit: ${YELLOW}http://localhost:3000${NC} (frontend) and ${YELLOW}http://localhost:5000/api/health${NC} (backend)"
echo ""

echo -e "${GREEN}📊 API Endpoints:${NC}"
echo "• Health Check: ${YELLOW}http://localhost:5000/api/health${NC}"
echo "• Products: ${YELLOW}http://localhost:5000/api/products${NC}"
echo "• Admin Dashboard: ${YELLOW}http://localhost:5000/api/admin/dashboard${NC}"
echo "• Orders: ${YELLOW}http://localhost:5000/api/orders${NC}"
echo ""

echo -e "${GREEN}🔧 Development Commands:${NC}"
echo "• Reset database: ${YELLOW}cd Back && python seed_database.py${NC}"
echo "• Backend only: ${YELLOW}cd Back && python app.py${NC}"
echo "• Frontend only: ${YELLOW}cd frontend && npm run dev${NC}"
echo ""

echo -e "${CYAN}All scripts are ready and validated! 🎉${NC}"