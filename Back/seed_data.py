"""
Seed Data for OurStore E-commerce Platform
This file contains realistic sample data for development and testing
"""

from datetime import datetime, timedelta
from decimal import Decimal
import random

# Sample Categories
CATEGORIES = [
    {
        'name': 'Electronics',
        'description': 'Latest electronic devices and gadgets',
        'is_active': True
    },
    {
        'name': 'Clothing',
        'description': 'Fashion and apparel for all ages',
        'is_active': True
    },
    {
        'name': 'Home & Garden',
        'description': 'Everything for your home and garden',
        'is_active': True
    },
    {
        'name': 'Books',
        'description': 'Books, e-books, and audiobooks',
        'is_active': True
    },
    {
        'name': 'Sports & Outdoors',
        'description': 'Sports equipment and outdoor gear',
        'is_active': True
    },
    {
        'name': 'Beauty & Health',
        'description': 'Beauty products and health supplements',
        'is_active': True
    }
]

# Sample Products
PRODUCTS = [
    # Electronics
    {
        'name': 'Wireless Bluetooth Headphones',
        'description': 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
        'price': Decimal('89.99'),
        'category': 'Electronics',
        'sku': 'WBH001',
        'stock_quantity': 50,
        'images': ['headphones1.jpg', 'headphones2.jpg'],
        'specifications': {'Battery Life': '30 hours', 'Connectivity': 'Bluetooth 5.0', 'Weight': '250g'},
        'is_bestseller': True,
        'tags': ['wireless', 'bluetooth', 'audio', 'premium']
    },
    {
        'name': 'Smart Watch Series X',
        'description': 'Advanced fitness tracking, heart rate monitoring, and smartphone connectivity.',
        'price': Decimal('299.99'),
        'category': 'Electronics',
        'sku': 'SWX001',
        'stock_quantity': 25,
        'images': ['smartwatch1.jpg', 'smartwatch2.jpg'],
        'specifications': {'Display': '1.4 inch OLED', 'Battery': '7 days', 'Water Resistance': 'IP68'},
        'is_bestseller': True,
        'tags': ['smartwatch', 'fitness', 'health', 'tech']
    },
    {
        'name': 'USB-C Fast Charging Cable',
        'description': 'Durable 6ft USB-C cable with fast charging support up to 100W.',
        'price': Decimal('19.99'),
        'category': 'Electronics',
        'sku': 'USBC001',
        'stock_quantity': 100,
        'images': ['cable1.jpg'],
        'specifications': {'Length': '6 feet', 'Power': '100W', 'Material': 'Braided nylon'},
        'is_bestseller': False,
        'tags': ['cable', 'usbc', 'charging', 'durable']
    },
    
    # Clothing
    {
        'name': 'Classic Cotton T-Shirt',
        'description': 'Comfortable 100% cotton t-shirt available in multiple colors and sizes.',
        'price': Decimal('24.99'),
        'category': 'Clothing',
        'sku': 'CCT001',
        'stock_quantity': 150,
        'images': ['tshirt1.jpg', 'tshirt2.jpg', 'tshirt3.jpg'],
        'specifications': {'Material': '100% Cotton', 'Fit': 'Regular', 'Care': 'Machine washable'},
        'is_bestseller': True,
        'tags': ['cotton', 'casual', 'comfortable', 'basic']
    },
    {
        'name': 'Denim Jeans - Slim Fit',
        'description': 'Premium denim jeans with slim fit design and stretch comfort.',
        'price': Decimal('79.99'),
        'category': 'Clothing',
        'sku': 'DJ001',
        'stock_quantity': 75,
        'images': ['jeans1.jpg', 'jeans2.jpg'],
        'specifications': {'Material': '98% Cotton, 2% Elastane', 'Fit': 'Slim', 'Wash': 'Dark blue'},
        'is_bestseller': False,
        'tags': ['denim', 'jeans', 'slim fit', 'premium']
    },
    
    # Home & Garden
    {
        'name': 'Ceramic Coffee Mug Set',
        'description': 'Set of 4 elegant ceramic coffee mugs perfect for daily use.',
        'price': Decimal('34.99'),
        'category': 'Home & Garden',
        'sku': 'CCM001',
        'stock_quantity': 60,
        'images': ['mugs1.jpg', 'mugs2.jpg'],
        'specifications': {'Material': 'Ceramic', 'Capacity': '12 oz', 'Microwave Safe': 'Yes'},
        'is_bestseller': False,
        'tags': ['ceramic', 'coffee', 'mugs', 'kitchen']
    },
    {
        'name': 'Indoor Plant - Snake Plant',
        'description': 'Low-maintenance snake plant perfect for indoor air purification.',
        'price': Decimal('29.99'),
        'category': 'Home & Garden',
        'sku': 'SP001',
        'stock_quantity': 40,
        'images': ['plant1.jpg', 'plant2.jpg'],
        'specifications': {'Type': 'Sansevieria', 'Light': 'Low to bright indirect', 'Water': 'Every 2-3 weeks'},
        'is_bestseller': True,
        'tags': ['plant', 'indoor', 'air purifier', 'low maintenance']
    },
    
    # Books
    {
        'name': 'The Complete Guide to Web Development',
        'description': 'Comprehensive guide covering HTML, CSS, JavaScript, and modern frameworks.',
        'price': Decimal('49.99'),
        'category': 'Books',
        'sku': 'WD001',
        'stock_quantity': 30,
        'images': ['book1.jpg'],
        'specifications': {'Pages': '450', 'Publisher': 'Tech Books Inc.', 'Edition': '2nd Edition'},
        'is_bestseller': True,
        'tags': ['programming', 'web development', 'education', 'technical']
    },
    
    # Sports & Outdoors
    {
        'name': 'Yoga Mat - Premium Quality',
        'description': 'Non-slip yoga mat with extra cushioning for comfortable practice.',
        'price': Decimal('39.99'),
        'category': 'Sports & Outdoors',
        'sku': 'YM001',
        'stock_quantity': 45,
        'images': ['yogamat1.jpg', 'yogamat2.jpg'],
        'specifications': {'Thickness': '6mm', 'Material': 'TPE', 'Dimensions': '72" x 24"'},
        'is_bestseller': True,
        'tags': ['yoga', 'fitness', 'exercise', 'mat']
    },
    
    # Beauty & Health
    {
        'name': 'Organic Face Moisturizer',
        'description': 'Natural organic moisturizer with SPF 30 protection for daily use.',
        'price': Decimal('24.99'),
        'category': 'Beauty & Health',
        'sku': 'OFM001',
        'stock_quantity': 80,
        'images': ['moisturizer1.jpg'],
        'specifications': {'SPF': '30', 'Size': '50ml', 'Type': 'Organic'},
        'is_bestseller': False,
        'tags': ['organic', 'skincare', 'moisturizer', 'spf']
    }
]

# Sample Customers
CUSTOMERS = [
    {
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john.doe@example.com',
        'phone': '+1234567890',
        'date_of_birth': datetime(1990, 5, 15),
        'addresses': [
            {
                'type': 'billing',
                'street': '123 Main St',
                'city': 'New York',
                'state': 'NY',
                'postal_code': '10001',
                'country': 'USA',
                'is_default': True
            }
        ]
    },
    {
        'first_name': 'Jane',
        'last_name': 'Smith',
        'email': 'jane.smith@example.com',
        'phone': '+1234567891',
        'date_of_birth': datetime(1985, 8, 22),
        'addresses': [
            {
                'type': 'billing',
                'street': '456 Oak Ave',
                'city': 'Los Angeles',
                'state': 'CA',
                'postal_code': '90210',
                'country': 'USA',
                'is_default': True
            }
        ]
    },
    {
        'first_name': 'Ahmed',
        'last_name': 'Hassan',
        'email': 'ahmed.hassan@example.com',
        'phone': '+1234567892',
        'date_of_birth': datetime(1988, 12, 10),
        'addresses': [
            {
                'type': 'billing',
                'street': '789 Pine St',
                'city': 'Chicago',
                'state': 'IL',
                'postal_code': '60601',
                'country': 'USA',
                'is_default': True
            }
        ]
    },
    {
        'first_name': 'Maria',
        'last_name': 'Garcia',
        'email': 'maria.garcia@example.com',
        'phone': '+1234567893',
        'date_of_birth': datetime(1992, 3, 8),
        'addresses': [
            {
                'type': 'billing',
                'street': '321 Elm St',
                'city': 'Miami',
                'state': 'FL',
                'postal_code': '33101',
                'country': 'USA',
                'is_default': True
            }
        ]
    }
]

# Sample Admin Users
ADMIN_USERS = [
    {
        'username': 'admin',
        'email': 'admin@ourstore.com',
        'password': 'admin123',  # Will be hashed
        'first_name': 'Store',
        'last_name': 'Administrator',
        'role': 'super_admin',
        'is_active': True
    },
    {
        'username': 'manager',
        'email': 'manager@ourstore.com',
        'password': 'manager123',  # Will be hashed
        'first_name': 'Store',
        'last_name': 'Manager',
        'role': 'manager',
        'is_active': True
    }
]

# Sample Coupons
COUPONS = [
    {
        'code': 'WELCOME10',
        'description': 'Welcome discount for new customers',
        'discount_type': 'percentage',
        'discount_value': Decimal('10.00'),
        'minimum_order_amount': Decimal('50.00'),
        'max_uses': 100,
        'uses_count': 0,
        'valid_from': datetime.now(),
        'valid_until': datetime.now() + timedelta(days=30),
        'is_active': True
    },
    {
        'code': 'SUMMER20',
        'description': 'Summer sale - 20% off everything',
        'discount_type': 'percentage',
        'discount_value': Decimal('20.00'),
        'minimum_order_amount': Decimal('100.00'),
        'max_uses': 50,
        'uses_count': 15,
        'valid_from': datetime.now() - timedelta(days=10),
        'valid_until': datetime.now() + timedelta(days=20),
        'is_active': True
    },
    {
        'code': 'FREESHIP',
        'description': 'Free shipping on orders over $75',
        'discount_type': 'fixed',
        'discount_value': Decimal('9.99'),  # Standard shipping cost
        'minimum_order_amount': Decimal('75.00'),
        'max_uses': None,  # Unlimited
        'uses_count': 45,
        'valid_from': datetime.now() - timedelta(days=5),
        'valid_until': datetime.now() + timedelta(days=60),
        'is_active': True
    }
]

# Function to generate random orders
def generate_sample_orders(customers, products, num_orders=10):
    """Generate sample orders with realistic data"""
    orders = []
    order_statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    payment_statuses = ['pending', 'completed', 'failed', 'refunded']
    
    for i in range(num_orders):
        # Random customer
        customer = random.choice(customers)
        
        # Random order date (last 30 days)
        order_date = datetime.now() - timedelta(days=random.randint(0, 30))
        
        # Random number of items (1-4)
        num_items = random.randint(1, 4)
        order_items = []
        total_amount = Decimal('0.00')
        
        # Select random products
        selected_products = random.sample(products, min(num_items, len(products)))
        
        for product in selected_products:
            quantity = random.randint(1, 3)
            price = product['price']
            subtotal = price * quantity
            total_amount += subtotal
            
            order_items.append({
                'product_name': product['name'],
                'quantity': quantity,
                'price': price,
                'subtotal': subtotal
            })
        
        # Add shipping cost
        shipping_cost = Decimal('0.00') if total_amount >= 50 else Decimal('9.99')
        total_amount += shipping_cost
        
        order = {
            'customer_email': customer['email'],
            'total_amount': total_amount,
            'shipping_cost': shipping_cost,
            'tax_amount': total_amount * Decimal('0.08'),  # 8% tax
            'status': random.choice(order_statuses),
            'payment_status': random.choice(payment_statuses),
            'created_at': order_date,
            'shipping_address': customer['addresses'][0],
            'billing_address': customer['addresses'][0],
            'items': order_items
        }
        
        orders.append(order)
    
    return orders

# Sample Reviews
def generate_sample_reviews(products, customers, num_reviews=20):
    """Generate sample product reviews"""
    reviews = []
    review_texts = [
        "Great product! Exactly as described and fast shipping.",
        "Good quality for the price. Would recommend.",
        "Amazing! Better than expected. Five stars!",
        "Decent product but took a while to arrive.",
        "Not bad, but could be better. Average quality.",
        "Excellent customer service and product quality.",
        "Perfect for my needs. Will buy again!",
        "Good value for money. Happy with purchase.",
        "Could be improved but overall satisfied.",
        "Outstanding quality! Highly recommended!"
    ]
    
    for i in range(num_reviews):
        product = random.choice(products)
        customer = random.choice(customers)
        rating = random.randint(3, 5)  # Mostly positive reviews
        
        review = {
            'product_name': product['name'],
            'customer_email': customer['email'],
            'rating': rating,
            'comment': random.choice(review_texts),
            'created_at': datetime.now() - timedelta(days=random.randint(0, 60)),
            'is_verified': random.choice([True, True, True, False])  # Mostly verified
        }
        
        reviews.append(review)
    
    return reviews

# Generate sample orders and reviews
SAMPLE_ORDERS = generate_sample_orders(CUSTOMERS, PRODUCTS, 15)
SAMPLE_REVIEWS = generate_sample_reviews(PRODUCTS, CUSTOMERS, 25)