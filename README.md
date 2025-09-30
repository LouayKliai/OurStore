# 🛍️ OurStore - E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js frontend and Flask backend, featuring a comprehensive product catalog, shopping cart, order management, and admin dashboard.

## 🌟 Features

### 🛒 Customer Features
- **Product Catalog**: Browse products by categories (Tech, Clothes, Beauty)
- **Multi-language Support**: English, French, and Arabic
- **Shopping Cart**: Add/remove items with color and size options
- **Product Search**: Find products by name or description
- **Bestsellers Section**: Highlighted popular products
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Order Tracking**: Complete order history and status tracking
- **Customer Profiles**: Manage personal information and preferences
- **Newsletter Subscription**: Stay updated with latest products

### �️ Image Storage
- **Cloudinary Integration**: Free 25GB cloud storage for product images
- **Automatic Optimization**: Images are compressed and resized automatically
- **Multiple Upload**: Support for single and batch image uploads
- **Admin Interface**: Easy image management in the admin panel
- **Fallback Storage**: Local storage option if cloud storage is unavailable

## 🏗️ Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API for cart and language
- **TypeScript**: Full type safety throughout the application
- **Internationalization**: Multi-language support with custom i18n
- **Components**: Modular, reusable React components

### Backend (Flask + PostgreSQL)
- **API**: RESTful Flask API with modular route structure
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Architecture**: Clean separation of concerns with blueprints
- **Data Models**: Comprehensive models for e-commerce operations
- **Inventory Tracking**: Detailed logging of all stock changes
- **Order Processing**: Complete order lifecycle management

## 📁 Project Structure

```
OurStore/
├── frontend/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/                # App router pages
│   │   ├── components/         # React components
│   │   │   ├── admin/         # Admin dashboard components
│   │   │   ├── cart/          # Shopping cart components
│   │   │   ├── layout/        # Layout components
│   │   │   ├── product/       # Product display components
│   │   │   └── ui/            # Reusable UI components
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities and API functions
│   │   ├── locales/           # Translation files
│   │   └── types/             # TypeScript type definitions
│   └── public/                # Static assets
│
├── Back/                       # Flask Backend
│   ├── routes/                # API route modules
│   │   ├── products.py        # Product management
│   │   ├── orders.py          # Order processing
│   │   ├── admin.py           # Admin operations
│   │   └── customers.py       # Customer management
│   ├── models_enhanced.py     # Database models
│   ├── app_enhanced.py        # Main Flask application
│   ├── config_enhanced.py     # Configuration settings
│   ├── init_db.py             # Database initialization
│   └── database_schema.sql    # Complete SQL schema
│
├── BACKEND_README.md          # Backend documentation
├── FRONTEND_SETUP.md          # Frontend setup guide
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+
- PostgreSQL 12+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/LouayKliai/OurStore.git
cd OurStore
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`

### 3. Backend Setup
```bash
cd Back

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Initialize database
python init_db.py

# Run the API server
python app_enhanced.py
```
The API will be available at `http://localhost:5000`

### 4. Image Storage Setup (Optional)
```bash
# Quick Cloudinary setup (free 25GB storage)
./setup_cloudinary.sh

# Or configure manually in Back/.env:
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
# USE_CLOUDINARY=true

# Test image upload
python test_images.py
```

## 🗄️ Database Schema

### Core Tables
- **Products**: Product catalog with variants and pricing
- **Categories**: Product categorization system
- **Orders & Order Items**: Complete order management
- **Customers**: Customer profiles and contact information
- **Inventory Logs**: Detailed stock change tracking
- **Admin Users**: Administrative access control
- **Product Reviews**: Customer feedback system
- **Coupons**: Discount and promotion management

### Key Features
- Multi-variant products (colors, sizes)
- Comprehensive order lifecycle tracking
- Detailed inventory management with change logs
- Customer order history and profiles
- Admin dashboard with real-time analytics

## 🔌 API Endpoints

### Products API
```
GET    /api/products              # List products with filtering
GET    /api/products/{id}         # Get product details
POST   /api/products              # Create product (Admin)
PUT    /api/products/{id}         # Update product (Admin)
DELETE /api/products/{id}         # Delete product (Admin)
GET    /api/products/bestsellers  # Get bestselling products
```

### Orders API
```
POST   /api/orders                # Create new order
GET    /api/orders                # List orders (Admin)
GET    /api/orders/{id}           # Get order details
PUT    /api/orders/{id}/status    # Update order status (Admin)
GET    /api/orders/stats          # Order statistics (Admin)
```

### Admin API
```
GET    /api/admin/dashboard       # Dashboard statistics
GET    /api/admin/customers       # Customer management
GET    /api/admin/inventory/logs  # Inventory change logs
POST   /api/admin/inventory/adjust # Manual inventory adjustment
GET    /api/admin/reports/sales   # Sales reports
```

## 🎨 Frontend Components

### Layout Components
- **Header**: Navigation with cart, language switcher
- **Footer**: Company information and links
- **LayoutWrapper**: Main layout container

### Product Components
- **ProductCard**: Individual product display
- **ProductGrid**: Product listing layout
- **BestSellersSection**: Featured products showcase

### Cart Components
- **CartItem**: Individual cart item management
- **CartSummary**: Order totals and checkout

### Admin Components
- **AdminDashboard**: Main admin interface
- **ProductManagement**: Product CRUD operations
- **OrderManagement**: Order processing interface
- **Analytics**: Sales and performance metrics

## 🌍 Internationalization

Support for multiple languages:
- **English** (en)
- **French** (fr)
- **Arabic** (ar)

Translation files located in:
- `frontend/src/locales/`
- `frontend/src/i18n/`

## 🔧 Configuration

### Frontend Configuration
- **Next.js Config**: `next.config.ts`
- **Tailwind Config**: `tailwind.config.js`
- **TypeScript Config**: `tsconfig.json`

### Backend Configuration
- **Flask Config**: `config_enhanced.py`
- **Database**: PostgreSQL with SQLAlchemy
- **Environment Variables**: `.env` file

## 📊 Admin Dashboard Features

- **Real-time Statistics**: Sales, orders, customers, revenue
- **Product Management**: Full CRUD operations
- **Order Processing**: Status updates and tracking
- **Customer Insights**: Customer profiles and order history
- **Inventory Control**: Stock monitoring and adjustments
- **Sales Analytics**: Revenue reports and trends
- **Low Stock Alerts**: Inventory management notifications

## 🔒 Security Features

- **Input Validation**: Comprehensive data validation
- **SQL Injection Prevention**: SQLAlchemy ORM protection
- **Password Security**: Hashed admin passwords
- **CORS Configuration**: Cross-origin request handling
- **Environment-based Secrets**: Secure configuration management

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy to your preferred platform
```

### Backend Deployment (Heroku/DigitalOcean)
```bash
cd Back
# Set environment variables
# Deploy to your preferred platform
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
npm run test:coverage
```

### Backend Testing
```bash
cd Back
pytest
pytest --coverage
```

## 📈 Performance Optimizations

- **Frontend**: Next.js optimizations, image optimization, lazy loading
- **Backend**: Database indexing, pagination, connection pooling
- **Caching**: Redis support for frequently accessed data
- **Database**: Optimized queries with eager loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Backend Developer**: Mohamed (Database architecture, API development)
- **Frontend Developer**: Friend (UI/UX, React components)

## 📞 Support

For support, email support@ourstore.com or join our Slack channel.

## 🔮 Future Enhancements

- [ ] Payment Gateway Integration (Stripe, PayPal)
- [ ] Email Notifications System
- [ ] Advanced Search with Elasticsearch
- [ ] Mobile App (React Native)
- [ ] Social Media Authentication
- [ ] Product Recommendations Engine
- [ ] Advanced Analytics Dashboard
- [ ] Multi-vendor Support
- [ ] Inventory Management Mobile App
- [ ] API Rate Limiting and Throttling

---

**Happy Shopping! 🛍️**