#!/usr/bin/env python3
"""
Database Seeder for OurStore
Populates the database with realistic sample data for development and testing
"""

import os
import sys
import random
import io
from datetime import datetime
from werkzeug.security import generate_password_hash
from PIL import Image, ImageDraw, ImageFont

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.factory import create_app
from app.core.database import db
from app.models.category import Category
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order, OrderItem
from app.models.admin import AdminUser
from app.models.coupon import Coupon
from app.models.review import ProductReview
from app.models.inventory import InventoryLog
from app.utils.image_upload import upload_image
from seed_data import (
    CATEGORIES, PRODUCTS, CUSTOMERS, ADMIN_USERS, 
    COUPONS, SAMPLE_ORDERS, SAMPLE_REVIEWS
)

def create_sample_image(width=800, height=600, color=(100, 150, 200), text="Sample Product"):
    """Create a simple sample image with gradient background (no text)"""
    # Create image with gradient background
    img = Image.new('RGB', (width, height), color)
    
    # Create a simple gradient effect
    for y in range(height):
        for x in range(width):
            # Create a subtle gradient
            r = min(255, color[0] + (x * 10) // width)
            g = min(255, color[1] + (y * 10) // height)
            b = min(255, color[2] + ((x + y) * 5) // (width + height))
            img.putpixel((x, y), (r, g, b))
    
    # Convert to BytesIO for upload
    img_buffer = io.BytesIO()
    img.save(img_buffer, format='JPEG', quality=90)
    img_buffer.seek(0)
    
    return img_buffer

def upload_sample_images(product_name, num_images=2):
    """Upload sample images for a product and return URLs"""
    # Different color schemes for different products
    color_schemes = [
        (100, 150, 200),    # Blue
        (150, 100, 200),    # Purple
        (200, 150, 100),    # Orange
        (100, 200, 150),    # Green
        (200, 100, 150),    # Pink
        (150, 200, 100),    # Lime
        (100, 150, 250),    # Light Blue
        (250, 150, 100),    # Coral
        (150, 250, 100),    # Light Green
        (250, 100, 150),    # Hot Pink
    ]
    
    uploaded_urls = []
    
    for i in range(num_images):
        # Use different colors for variety
        color = color_schemes[(hash(product_name) + i) % len(color_schemes)]
        img_buffer = create_sample_image(color=color)
        
        # Upload to Cloudinary
        url = upload_image(img_buffer, folder='ourstore/products')
        if url:
            uploaded_urls.append(url)
            print(f"📸 Uploaded image for {product_name}: {url}")
        else:
            print(f"❌ Failed to upload image for {product_name}")
    
    return uploaded_urls

def clear_database():
    """Clear all data from database tables"""
    print("🗑️  Clearing existing data...")
    
    # Clear tables in proper order to avoid foreign key constraints
    db.session.query(InventoryLog).delete()
    db.session.query(ProductReview).delete()
    db.session.query(OrderItem).delete()
    db.session.query(Order).delete()
    db.session.query(Coupon).delete()
    db.session.query(Product).delete()
    db.session.query(Category).delete()
    db.session.query(Customer).delete()
    db.session.query(AdminUser).delete()
    
    db.session.commit()
    print("✅ Database cleared successfully")

def seed_categories():
    """Seed categories"""
    print("📁 Seeding categories...")
    
    category_objects = {}
    for cat_data in CATEGORIES:
        category = Category(
            name=cat_data['name'],
            description=cat_data['description'],
            name_code=cat_data['name_code'],
            description_code=cat_data['description_code'],
            created_at=datetime.now()
        )
        db.session.add(category)
        category_objects[cat_data['name']] = category
    
    db.session.commit()
    print(f"✅ Added {len(CATEGORIES)} categories")
    return category_objects

def seed_products(categories):
    """Seed products"""
    print("📦 Seeding products...")
    
    product_objects = {}
    for prod_data in PRODUCTS:
        category = categories[prod_data['category']]
        
        # Upload sample images for the product
        num_images = len(prod_data.get('images', []))
        if num_images == 0:
            num_images = 1  # At least one image per product
        
        uploaded_image_urls = upload_sample_images(prod_data['name'], num_images)
        
        product = Product(
            name=prod_data['name'],
            description=prod_data['description'],
            price=prod_data['price'],
            original_price=prod_data.get('original_price'),
            category_id=category.id,
            sku=prod_data['sku'],
            stock=prod_data['stock_quantity'],
            color_options=prod_data.get('color_options', []),
            size_options=prod_data.get('size_options', []),
            images=uploaded_image_urls,  # Use uploaded URLs instead of placeholder filenames
            is_bestseller=prod_data.get('is_bestseller', False),
            is_active=True,
            created_at=datetime.now()
        )
        db.session.add(product)
        product_objects[prod_data['name']] = product
    
    db.session.commit()
    print(f"✅ Added {len(PRODUCTS)} products with uploaded images")
    return product_objects

def seed_customers():
    """Seed customers"""
    print("👥 Seeding customers...")
    
    customer_objects = {}
    for cust_data in CUSTOMERS:
        address_info = cust_data['addresses'][0]  # Use first address
        customer = Customer(
            name=f"{cust_data['first_name']} {cust_data['last_name']}",
            email=cust_data['email'],
            phone=cust_data['phone'],
            date_of_birth=cust_data['date_of_birth'],
            address=address_info['street'],
            city=address_info['city'],
            country=address_info['country'],
            postal_code=address_info['postal_code'],
            is_active=True,
            created_at=datetime.now()
        )
        db.session.add(customer)
        customer_objects[cust_data['email']] = customer
    
    db.session.commit()
    print(f"✅ Added {len(CUSTOMERS)} customers")
    return customer_objects

def seed_admin_users():
    """Seed admin users"""
    print("👨‍💼 Seeding admin users...")
    
    for admin_data in ADMIN_USERS:
        # Check if admin already exists
        existing_admin = AdminUser.query.filter_by(email=admin_data['email']).first()
        if existing_admin:
            continue
            
        admin = AdminUser(
            username=admin_data['username'],
            email=admin_data['email'],
            password_hash=generate_password_hash(admin_data['password']),
            first_name=admin_data['first_name'],
            last_name=admin_data['last_name'],
            role=admin_data['role'],
            is_active=admin_data['is_active'],
            created_at=datetime.now()
        )
        db.session.add(admin)
    
    db.session.commit()
    print(f"✅ Added {len(ADMIN_USERS)} admin users")

def seed_coupons():
    """Seed coupons"""
    print("🎫 Seeding coupons...")
    
    for coupon_data in COUPONS:
        coupon = Coupon(
            code=coupon_data['code'],
            name=coupon_data['description'],  # Use description as name
            description=coupon_data['description'],
            discount_type=coupon_data['discount_type'],
            discount_value=coupon_data['discount_value'],
            minimum_order_amount=coupon_data.get('minimum_order_amount'),
            usage_limit=coupon_data.get('max_uses'),
            used_count=coupon_data.get('uses_count', 0),
            valid_from=coupon_data['valid_from'],
            valid_until=coupon_data['valid_until'],
            is_active=coupon_data['is_active'],
            created_at=datetime.now()
        )
        db.session.add(coupon)
    
    db.session.commit()
    print(f"✅ Added {len(COUPONS)} coupons")

def seed_orders(customers, products):
    """Seed orders"""
    print("🛒 Seeding orders...")
    
    for order_data in SAMPLE_ORDERS:
        customer = customers[order_data['customer_email']]
        
        subtotal = order_data['total_amount'] - order_data['shipping_cost'] - order_data['tax_amount']
        order = Order(
            customer_id=customer.id,
            order_number=f"ORD-{datetime.now().strftime('%Y%m%d')}-{random.randint(1000, 9999)}",
            subtotal=subtotal,
            total_amount=order_data['total_amount'],
            shipping_cost=order_data['shipping_cost'],
            tax_amount=order_data['tax_amount'],
            status=order_data['status'],
            payment_status=order_data['payment_status'],
            shipping_address=order_data['shipping_address'],
            billing_address=order_data['billing_address'],
            created_at=order_data['created_at']
        )
        db.session.add(order)
        db.session.flush()  # Get the order ID
        
        # Add order items
        for item_data in order_data['items']:
            # Find the product by name
            product = products[item_data['product_name']]
            
            order_item = OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item_data['quantity'],
                price=item_data['price'],
                total=item_data['subtotal']
            )
            db.session.add(order_item)
    
    db.session.commit()
    print(f"✅ Added {len(SAMPLE_ORDERS)} orders")

def seed_reviews(customers, products):
    """Seed reviews"""
    print("⭐ Seeding reviews...")
    
    for review_data in SAMPLE_REVIEWS:
        try:
            customer = customers[review_data['customer_email']]
            product = products[review_data['product_name']]
            
            review = ProductReview(
                product_id=product.id,
                customer_id=customer.id,
                rating=review_data['rating'],
                review_text=review_data['comment'],
                is_verified_purchase=review_data['is_verified'],
                is_approved=True,  # Auto-approve seed reviews
                created_at=review_data['created_at']
            )
            db.session.add(review)
        except KeyError:
            # Skip if customer or product not found
            continue
    
    db.session.commit()
    print(f"✅ Added reviews")

def seed_inventory_logs(products):
    """Seed some sample inventory logs"""
    print("📊 Seeding inventory logs...")
    
    import random
    from datetime import timedelta
    
    log_count = 0
    for product_name, product in products.items():
        # Create some random inventory movements
        for _ in range(random.randint(1, 3)):
            quantity_change = random.randint(-10, 50)
            log = InventoryLog(
                product_id=product.id,
                change_type=random.choice(['stock_in', 'stock_out', 'adjustment']),
                quantity_change=quantity_change,
                previous_stock=product.stock,
                new_stock=max(0, product.stock + quantity_change),
                reason=f"Sample inventory movement for {product.name}",
                created_by="system",
                created_at=datetime.now() - timedelta(days=random.randint(0, 30))
            )
            db.session.add(log)
            log_count += 1
    
    db.session.commit()
    print(f"✅ Added {log_count} inventory logs")

def main():
    """Main seeder function"""
    print("🌱 Starting database seeding...")
    print("=" * 50)
    
    # Create app context
    app = create_app()
    
    with app.app_context():
        try:
            # Create tables if they don't exist
            db.create_all()
            
            # Clear existing data
            clear_database()
            
            # Seed data in proper order
            categories = seed_categories()
            products = seed_products(categories)
            customers = seed_customers()
            seed_admin_users()
            seed_coupons()
            seed_orders(customers, products)
            seed_reviews(customers, products)
            seed_inventory_logs(products)
            
            print("=" * 50)
            print("🎉 Database seeding completed successfully!")
            print("\n📊 Summary:")
            print(f"   • {len(CATEGORIES)} Categories")
            print(f"   • {len(PRODUCTS)} Products")
            print(f"   • {len(CUSTOMERS)} Customers")
            print(f"   • {len(ADMIN_USERS)} Admin Users")
            print(f"   • {len(COUPONS)} Coupons")
            print(f"   • {len(SAMPLE_ORDERS)} Orders")
            print(f"   • ~{len(SAMPLE_REVIEWS)} Reviews")
            print("\n🔐 Admin Login:")
            print("   Username: admin")
            print("   Password: admin123")
            print("\n🌐 Test the API:")
            print("   Health: http://localhost:5000/api/health")
            print("   Products: http://localhost:5000/api/products")
            print("   Dashboard: http://localhost:5000/api/admin/dashboard")
            
        except Exception as e:
            print(f"❌ Error during seeding: {str(e)}")
            db.session.rollback()
            raise
        finally:
            db.session.close()

if __name__ == '__main__':
    main()