# OurStore Development Setup

This document provides instructions for setting up the OurStore e-commerce platform on your development machine.

## Prerequisites

### Required Software
- **Python 3.8+** - Backend development
- **Node.js 18+** - Frontend development  
- **PostgreSQL 12+** - Database
- **Git** - Version control

### System Requirements
- **Linux/macOS**: Recommended for development
- **Windows**: Supported with batch scripts
- **Memory**: 4GB RAM minimum
- **Storage**: 2GB free space

## Quick Setup

### Automated Setup (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd OurStore
   ```

2. **Run setup script:**
   ```bash
   # Linux/macOS
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   
   # Windows
   scripts\setup_windows.bat
   ```

3. **Start the application:**
   ```bash
   # Linux/macOS
   chmod +x scripts/start.sh
   ./scripts/start.sh
   
   # Windows - Run each in separate terminals:
   # Terminal 1:
   cd Back && venv\Scripts\activate.bat && python run.py
   # Terminal 2:
   cd frontend && npm run dev
   ```

### Manual Setup

#### 1. Database Setup
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE ourstore_db;
CREATE USER ourstore_user WITH PASSWORD 'ourstore123';
GRANT ALL PRIVILEGES ON DATABASE ourstore_db TO ourstore_user;
ALTER USER ourstore_user CREATEDB;
\q
```

#### 2. Backend Setup
```bash
cd Back

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate.bat  # Windows

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create environment file
cp .env.example .env  # Edit with your settings

# Initialize database
python init_db.py
```

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
OurStore/
├── Back/                  # Flask backend
│   ├── routes/           # API endpoints
│   ├── models.py         # Database models
│   ├── app.py            # Main application
│   ├── config.py         # Configuration
│   └── requirements.txt  # Python dependencies
├── frontend/             # Next.js frontend
│   ├── src/
│   │   ├── app/         # App router pages
│   │   ├── components/  # React components
│   │   └── lib/         # Utilities
│   └── package.json     # Node dependencies
└── scripts/             # Setup and utility scripts
```

## Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://ourstore_user:ourstore123@localhost/ourstore_db
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=jwt-secret-string
PORT=5000
DEBUG=True
```

#### Frontend
Configuration is handled through Next.js config files.

## Development Workflow

### Starting Development
1. **Backend**: `cd Back && source venv/bin/activate && python app.py`
2. **Frontend**: `cd frontend && npm run dev`

### API Endpoints
- **Health Check**: `GET /api/health`
- **Products**: `GET /api/products`
- **Orders**: `POST /api/orders`
- **Admin Dashboard**: `GET /api/admin/dashboard`

### Database Management
```bash
# Reset database
cd Back
source venv/bin/activate
python init_db.py

# Connect to database
PGPASSWORD=ourstore123 psql -h localhost -U ourstore_user -d ourstore_db
```

## Deployment

### Production Considerations
1. **Environment Variables**: Update all secret keys
2. **Database**: Use production PostgreSQL instance
3. **Frontend**: Run `npm run build` for optimized build
4. **Backend**: Use WSGI server like Gunicorn

### Docker Support (Optional)
Docker configuration files can be added for containerized deployment.

## Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Verify user permissions
sudo -u postgres psql -c "\du"
```

#### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # Backend
lsof -i :3000  # Frontend

# Kill process
kill -9 <PID>
```

#### Virtual Environment Issues
```bash
# Recreate virtual environment
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Development Tips
- Use `app.py` for full feature set (enhanced Flask app)
- Frontend runs on port 3001 if 3000 is occupied  
- Backend API available at `http://localhost:5000`
- Database GUI tools like pgAdmin recommended

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test
4. Submit pull request

## License

[Add your license information here]