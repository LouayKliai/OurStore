-- Database Schema Export
-- Generated on: 2025-09-29 20:46:34.643224+01:00

CREATE TABLE admin_users (last_login timestamp without time zone, id integer NOT NULL, username character varying(80) NOT NULL, last_name character varying(100), created_at timestamp without time zone, email character varying(255) NOT NULL, first_name character varying(100), is_active boolean, updated_at timestamp without time zone, password_hash character varying(255) NOT NULL, role character varying(50));

CREATE TABLE alembic_version (version_num character varying(32) NOT NULL);

CREATE TABLE categories (name_code character varying(100) NOT NULL, created_at timestamp without time zone, id integer NOT NULL, description text, updated_at timestamp without time zone, description_code character varying(100) NOT NULL, name character varying(50) NOT NULL);

CREATE TABLE coupons (description text, discount_value numeric NOT NULL, discount_type character varying(20), updated_at timestamp without time zone, valid_from timestamp without time zone, name character varying(255) NOT NULL, usage_limit integer, created_at timestamp without time zone, is_active boolean, valid_until timestamp without time zone, code character varying(50) NOT NULL, minimum_order_amount numeric, id integer NOT NULL, used_count integer);

CREATE TABLE customers (date_of_birth date, postal_code character varying(20), address text, city character varying(100), created_at timestamp without time zone, is_active boolean, updated_at timestamp without time zone, name character varying(255) NOT NULL, id integer NOT NULL, email character varying(255), phone character varying(20), country character varying(100));

CREATE TABLE inventory_logs (created_at timestamp without time zone, change_type character varying(20) NOT NULL, created_by character varying(100), new_stock integer NOT NULL, id integer NOT NULL, previous_stock integer NOT NULL, reference_id integer, reason text, quantity_change integer NOT NULL, updated_at timestamp without time zone, product_id integer NOT NULL);

CREATE TABLE newsletter_subscriptions (name character varying(255), email character varying(255) NOT NULL, preferences json, updated_at timestamp without time zone, id integer NOT NULL, is_active boolean, created_at timestamp without time zone);

CREATE TABLE order_items (id integer NOT NULL, product_id integer NOT NULL, size character varying(50), total numeric NOT NULL, updated_at timestamp without time zone, quantity integer NOT NULL, order_id integer NOT NULL, price numeric NOT NULL, created_at timestamp without time zone, color character varying(50));

CREATE TABLE orders (order_number character varying(50) NOT NULL, shipping_address json, id integer NOT NULL, payment_status character varying(20), currency character varying(3), notes text, subtotal numeric NOT NULL, updated_at timestamp without time zone, status character varying(20), tax_amount numeric, customer_id integer, payment_method character varying(50), total_amount numeric NOT NULL, shipping_cost numeric, billing_address json, created_at timestamp without time zone);

CREATE TABLE product_reviews (updated_at timestamp without time zone, is_approved boolean, review_title character varying(255), created_at timestamp without time zone, is_verified_purchase boolean, customer_id integer, id integer NOT NULL, product_id integer NOT NULL, rating integer NOT NULL, review_text text);

CREATE TABLE products (updated_at timestamp without time zone, images ARRAY, category_id integer, size_options ARRAY, name character varying(255) NOT NULL, stock integer NOT NULL, is_active boolean, id integer NOT NULL, created_at timestamp without time zone, sku character varying(100), image_url character varying(500), description text, is_bestseller boolean, dimensions json, weight numeric, original_price numeric, color_options ARRAY, price numeric NOT NULL);

CREATE TABLE site_settings (created_at timestamp without time zone, setting_type character varying(50), key character varying(100) NOT NULL, updated_at timestamp without time zone, id integer NOT NULL, value text, description text);

