@echo off
REM Setup script for OurStore project on Windows

echo Setting up OurStore project...

REM Check if we're in the right directory
if not exist "Back" (
    echo ERROR: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Install Python dependencies for backend
echo.
echo Setting up Python backend...
cd Back

REM Create virtual environment
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
) else (
    echo Virtual environment already exists
)

REM Activate virtual environment and install dependencies
echo Activating virtual environment and installing dependencies...
call venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    (
        echo # Database Configuration
        echo DATABASE_URL=postgresql://ourstore_user:ourstore123@localhost/ourstore_db
        echo.
        echo # Flask Configuration
        echo FLASK_ENV=development
        echo SECRET_KEY=your-secret-key-here-change-in-production
        echo JWT_SECRET_KEY=jwt-secret-string-change-in-production
        echo.
        echo # Application Settings
        echo PORT=5000
        echo DEBUG=True
    ) > .env
    echo .env file created
)

cd ..

REM Install Node.js dependencies for frontend
echo.
echo Setting up Node.js frontend...
cd frontend

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Install dependencies
echo Installing Node.js dependencies...
npm install

cd ..

echo.
echo Setup completed successfully!
echo.
echo To start the project:
echo 1. Backend: cd Back && venv\Scripts\activate.bat && python app.py
echo 2. Frontend: cd frontend && npm run dev
echo.
pause