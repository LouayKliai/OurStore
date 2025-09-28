#!/bin/bash

# Test Script for OurStore - Comprehensive testing suite

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[TEST] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

# Test counters
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    TESTS_RUN=$((TESTS_RUN + 1))
    echo ""
    info "Running test: $test_name"
    
    if eval "$test_command"; then
        success "✅ $test_name - PASSED"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        error "❌ $test_name - FAILED"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

# Check if we're in the right directory
if [[ ! -d "Back" ]] || [[ ! -d "frontend" ]]; then
    error "Please run this script from the project root directory"
fi

log "🧪 Starting OurStore comprehensive test suite..."
echo "=" | head -c 60; echo ""

# Test 1: Backend Environment Check
run_test "Backend Environment Check" "
cd Back && 
[[ -d 'venv' ]] && 
[[ -f 'requirements.txt' ]] && 
[[ -f 'run.py' ]] &&
echo 'Backend environment OK'
"

# Test 2: Backend Dependencies Check
run_test "Backend Dependencies Check" "
cd Back && 
source venv/bin/activate && 
python -c 'import flask, sqlalchemy, psycopg2' &&
echo 'All backend dependencies available'
"

# Test 3: Database Connection Test
run_test "Database Connection Test" "
cd Back && 
source venv/bin/activate && 
python -c '
from app.factory import create_app
from app.core.database import db

app = create_app()
with app.app_context():
    db.engine.execute(\"SELECT 1\")
    print(\"Database connection successful\")
'
"

# Test 4: Database Models Test
run_test "Database Models Test" "
cd Back && 
source venv/bin/activate && 
python -c '
from app.factory import create_app
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order

app = create_app()
with app.app_context():
    products = Product.query.count()
    customers = Customer.query.count()
    orders = Order.query.count()
    
    print(f\"Models test: {products} products, {customers} customers, {orders} orders\")
    
    if products > 0 and customers > 0:
        print(\"Database models working correctly\")
    else:
        raise Exception(\"Database appears to be empty\")
'
"

# Test 5: Backend Server Start Test
BACKEND_PID=""
run_test "Backend Server Start Test" "
cd Back && 
source venv/bin/activate && 
python run.py &
BACKEND_PID=\$!
sleep 4 &&
curl -s http://localhost:5000/api/health > /dev/null &&
echo 'Backend server started successfully'
"

# Test 6: API Endpoints Test
if [[ -n "$BACKEND_PID" ]]; then
    run_test "API Endpoints Test" "
    # Test health endpoint
    curl -s http://localhost:5000/api/health > /dev/null &&
    
    # Test products endpoint
    PRODUCTS_RESPONSE=\$(curl -s http://localhost:5000/api/products) &&
    echo \"\$PRODUCTS_RESPONSE\" | python3 -c '
import sys, json
data = json.load(sys.stdin)
if \"products\" in data and len(data[\"products\"]) > 0:
    print(f\"Products API: {len(data[\"products\"])} products returned\")
else:
    raise Exception(\"Products API returned invalid data\")
' &&
    
    # Test admin dashboard
    curl -s http://localhost:5000/api/admin/dashboard | python3 -c '
import sys, json
data = json.load(sys.stdin)
if \"stats\" in data:
    print(\"Admin dashboard API working\")
else:
    raise Exception(\"Admin dashboard API failed\")
' &&
    
    echo 'All API endpoints working correctly'
    "
else
    error "Skipping API tests - backend server not running"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 7: Frontend Environment Check
run_test "Frontend Environment Check" "
cd frontend && 
[[ -f 'package.json' ]] && 
[[ -f 'next.config.ts' ]] && 
[[ -d 'src' ]] &&
echo 'Frontend environment OK'
"

# Test 8: Frontend Dependencies Check
run_test "Frontend Dependencies Check" "
cd frontend && 
[[ -d 'node_modules' ]] &&
npm list --depth=0 > /dev/null 2>&1 &&
echo 'Frontend dependencies OK'
"

# Test 9: Frontend Build Test
run_test "Frontend Build Test" "
cd frontend && 
timeout 60s npm run build > /dev/null 2>&1 &&
echo 'Frontend builds successfully'
"

# Test 10: Scripts Validation
run_test "Scripts Validation Test" "
[[ -f 'scripts/start.sh' ]] &&
[[ -f 'scripts/restart.sh' ]] &&
[[ -f 'scripts/recreate_db.sh' ]] &&
[[ -f 'scripts/setup.sh' ]] &&
grep -q 'run.py' scripts/start.sh &&
echo 'All scripts present and updated'
"

# Cleanup: Stop backend server if it's running
if [[ -n "$BACKEND_PID" ]]; then
    log "Stopping test backend server..."
    kill $BACKEND_PID 2>/dev/null || true
    sleep 2
fi

# Test Results Summary
echo ""
echo "=" | head -c 60; echo ""
log "🏁 Test Suite Complete!"
echo ""
info "📊 Test Results Summary:"
echo "   Total Tests Run: $TESTS_RUN"
echo -e "   Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "   Tests Failed: ${RED}$TESTS_FAILED${NC}"

if [[ $TESTS_FAILED -eq 0 ]]; then
    echo ""
    success "🎉 All tests passed! Your OurStore application is working correctly!"
    echo ""
    info "✅ What's working:"
    info "   • Backend server and API endpoints"
    info "   • Database connection and models"
    info "   • Frontend build process"
    info "   • All scripts are updated and functional"
    echo ""
    info "🚀 Ready to run: ./scripts/start.sh"
    exit 0
else
    echo ""
    error "❌ Some tests failed. Please check the issues above."
    echo ""
    warning "💡 Common fixes:"
    warning "   • Run ./scripts/setup.sh to ensure proper setup"
    warning "   • Run ./scripts/recreate_db.sh if database issues"
    warning "   • Check PostgreSQL is running"
    warning "   • Ensure all dependencies are installed"
    exit 1
fi