# OurStore Backend API

A comprehensive Flask-based REST API for the OurStore e-commerce platform with PostgreSQL database.

## 🏗️ Database Architecture

### Core Tables
- **Products**: Product catalog with variations (colors, sizes), pricing, inventory
- **Categories**: Product categorization (tech, clothes, beauty)
- **Customers**: Customer profiles and contact information
- **Orders**: Order management with status tracking
- **Order Items**: Individual items within orders
- **Inventory Logs**: Complete inventory change tracking
- **Product Reviews**: Customer reviews and ratings
- **Admin Users**: Administrative user management
- **Coupons**: Discount codes and promotions
- **Newsletter Subscriptions**: Email marketing list
- **Site Settings**: Configurable application settings

### Key Features
- **Multi-variant Products**: Support for color and size options
- **Comprehensive Order Management**: Full order lifecycle tracking
- **Inventory Tracking**: Detailed logs of all stock changes
- **Customer Management**: Customer profiles and order history
- **Admin Dashboard**: Complete administrative interface
- **Flexible Pricing**: Support for original and sale prices
- **Review System**: Customer feedback and ratings

## 🚀 Backend Structure

```
Back/
├── app_enhanced.py          # Main Flask application
├── config_enhanced.py       # Configuration settings
├── models_enhanced.py       # SQLAlchemy models
├── init_db.py              # Database initialization script
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── database_schema.sql    # Complete SQL schema
└── routes/
    ├── products.py        # Product management endpoints
    ├── orders.py          # Order processing endpoints
    ├── admin.py           # Admin dashboard endpoints
    └── customers.py       # Customer management endpoints
```

## 📋 API Endpoints

### Products API (`/api/products`)
- `GET /` - List products with filtering and pagination
- `GET /<id>` - Get single product details
- `POST /` - Create new product (Admin)
- `PUT /<id>` - Update product (Admin)
- `DELETE /<id>` - Soft delete product (Admin)
- `GET /categories` - List all categories
- `GET /bestsellers` - Get bestselling products

### Orders API (`/api/orders`)
- `POST /` - Create new order
- `GET /` - List orders with filtering (Admin)
- `GET /<id>` - Get order details
- `PUT /<id>/status` - Update order status (Admin)
- `GET /customer/<id>` - Get customer's orders
- `GET /stats` - Order statistics (Admin)

### Admin API (`/api/admin`)
- `GET /dashboard` - Dashboard statistics
- `GET /customers` - Customer management
- `GET /customers/<id>` - Customer details
- `GET /inventory/logs` - Inventory change logs
- `POST /inventory/adjust` - Manual inventory adjustment
- `GET /reports/sales` - Sales reports

### Customers API (`/api/customers`)
- `POST /` - Create customer account
- `GET /<id>` - Get customer profile
- `PUT /<id>` - Update customer profile
- `GET /by-email/<email>` - Find customer by email
- `POST /newsletter/subscribe` - Newsletter subscription
- `POST /newsletter/unsubscribe` - Newsletter unsubscription

## 🔧 Setup Instructions

### 1. Prerequisites
- Python 3.8+
- PostgreSQL 12+
- Redis (optional, for caching)

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb ourstore_db

# Create user (optional)
psql -c "CREATE USER ourstore_user WITH PASSWORD 'your_password';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE ourstore_db TO ourstore_user;"
```

### 3. Backend Setup
```bash
# Clone and navigate to backend directory
cd Back

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials and settings

# Initialize database with sample data
python init_db.py

# Run the application
python app_enhanced.py
```

### 4. Environment Variables (.env)
```bash
DATABASE_URL=postgresql://username:password@localhost/ourstore_db
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=jwt-secret-string
```

## 🗃️ Database Migration

If you prefer to use Flask-Migrate for database management:

```bash
# Initialize migrations
flask db init

# Create migration
flask db migrate -m "Initial migration"

# Apply migration
flask db upgrade
```

## 📊 Key Features Implementation

### 1. Product Management
- Multi-variant support (colors, sizes)
- Inventory tracking with detailed logs
- Category-based organization
- Bestseller flagging
- Soft delete capability

### 2. Order Processing
- Cart-to-order conversion
- Automatic inventory deduction
- Order status management
- Customer association
- Tax and shipping calculation

### 3. Admin Dashboard
- Real-time statistics
- Sales reporting
- Customer management
- Inventory monitoring
- Low stock alerts

### 4. Customer Experience
- Profile management
- Order history
- Newsletter subscription
- Email-based customer lookup

## 🔒 Security Features

- Password hashing for admin users
- Input validation and sanitization
- SQL injection prevention via SQLAlchemy ORM
- CORS configuration
- Environment-based configuration

## 📈 Performance Considerations

- Database indexing on frequently queried fields
- Pagination for large data sets
- Connection pooling
- Optional Redis caching support
- Query optimization with eager loading

## 🧪 Testing

The structure supports easy testing with:
- Separate test configuration
- Factory pattern for test data
- Isolated test database

## 🚀 Production Deployment

For production deployment:

1. **Environment**: Set `FLASK_ENV=production`
2. **Database**: Use production PostgreSQL instance
3. **Security**: Change all default passwords and secrets
4. **SSL**: Enable HTTPS
5. **Monitoring**: Add logging and monitoring
6. **Backup**: Implement database backup strategy

## 📝 API Usage Examples

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"product_id": 1, "quantity": 2, "color": "Black"},
      {"product_id": 3, "quantity": 1}
    ],
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "address": "123 Main St, City, State"
    },
    "shipping_cost": 9.99,
    "tax_amount": 5.60
  }'
```

### Get Products with Filtering
```bash
curl "http://localhost:5000/api/products?category=tech&is_bestseller=true&page=1&per_page=10"
```

### Admin Dashboard Stats
```bash
curl "http://localhost:5000/api/admin/dashboard"
```

This backend structure provides a solid foundation for your e-commerce platform with room for future enhancements like payment processing, advanced analytics, and mobile API support.