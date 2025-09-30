--
-- PostgreSQL database dump
--

\restrict X4HrFX5PAuWtJk9CCvioeh6Xdm4J8hkPRvxdZUUKnSUdHtz8MrZQZt9cbDvuIfG

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.admin_users VALUES ('admin', 'admin@ourstore.com', 'scrypt:32768:8:1$uq5HcYAqU2ZzSlgg$62ac5d5d33418b789d35996278866395b49240c1b0951cbcd88493e78618e09a4e5a1a641d5aab8e7fc20f8675dc252cf95b7de06c680ee4ee2465eb0cadb89c', 'Store', 'Administrator', 'super_admin', true, NULL, 7, '2025-09-30 15:00:10.231861', '2025-09-30 14:00:10.233133');
INSERT INTO public.admin_users VALUES ('manager', 'manager@ourstore.com', 'scrypt:32768:8:1$4fTL5E9BbdKHgkSo$619a1bc61a9c8fd0f0638d978cacef5a0beae4482913a776d6295d573c0aaa784d1a8e112a0a958a93accda3e1c0b548ce519e6a6b261fb17e593d7a4a1242e3', 'Store', 'Manager', 'manager', true, NULL, 8, '2025-09-30 15:00:10.340375', '2025-09-30 14:00:10.340682');


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.categories VALUES ('Electronics', 'Latest electronic devices and gadgets', 'electronics', 'electronics_description', 19, '2025-09-30 14:59:24.435956', '2025-09-30 13:59:24.441707');
INSERT INTO public.categories VALUES ('Clothing', 'Fashion and apparel for all ages', 'clothing', 'clothing_description', 20, '2025-09-30 14:59:24.436473', '2025-09-30 13:59:24.441713');
INSERT INTO public.categories VALUES ('Home & Garden', 'Everything for your home and garden', 'home_garden', 'home_garden_description', 21, '2025-09-30 14:59:24.436616', '2025-09-30 13:59:24.441716');
INSERT INTO public.categories VALUES ('Books', 'Books, e-books, and audiobooks', 'books', 'books_description', 22, '2025-09-30 14:59:24.436688', '2025-09-30 13:59:24.441719');
INSERT INTO public.categories VALUES ('Sports & Outdoors', 'Sports equipment and outdoor gear', 'sports_outdoors', 'sports_outdoors_description', 23, '2025-09-30 14:59:24.436753', '2025-09-30 13:59:24.441723');
INSERT INTO public.categories VALUES ('Beauty & Health', 'Beauty products and health supplements', 'beauty_health', 'beauty_health_description', 24, '2025-09-30 14:59:24.436819', '2025-09-30 13:59:24.441727');


--
-- Data for Name: contact_messages; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.contact_messages VALUES (1, 'Test User', 'test@example.com', 'product', 'This is a test message from the contact form', true, '2025-09-30 14:36:07.590065', '2025-09-30 14:36:22.841394');
INSERT INTO public.contact_messages VALUES (2, 'John Smith', 'john@example.com', 'order', 'I need help with my recent order #12345. It has not arrived yet.', false, '2025-09-30 14:37:25.02369', '2025-09-30 14:37:25.023707');
INSERT INTO public.contact_messages VALUES (3, 'Sarah Johnson', 'sarah@example.com', 'technical', 'I am having trouble logging into my account. Can you help me reset my password?', true, '2025-09-30 14:37:32.959698', '2025-09-30 14:37:53.800908');
INSERT INTO public.contact_messages VALUES (4, 'mohamed', 'med@gmail.com', 'order', 'hi there', false, '2025-09-30 14:38:38.946049', '2025-09-30 14:38:38.946065');


--
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.coupons VALUES ('WELCOME10', 'Welcome discount for new customers', 'Welcome discount for new customers', 'percentage', 10.00, 50.00, 100, 0, true, '2025-09-30 14:59:24.144931', '2025-10-30 14:59:24.144938', 10, '2025-09-30 15:00:10.3463', '2025-09-30 14:00:10.348464');
INSERT INTO public.coupons VALUES ('SUMMER20', 'Summer sale - 20% off everything', 'Summer sale - 20% off everything', 'percentage', 20.00, 100.00, 50, 15, true, '2025-09-20 14:59:24.144951', '2025-10-20 14:59:24.144954', 11, '2025-09-30 15:00:10.34645', '2025-09-30 14:00:10.348469');
INSERT INTO public.coupons VALUES ('FREESHIP', 'Free shipping on orders over $75', 'Free shipping on orders over $75', 'fixed', 9.99, 75.00, NULL, 45, true, '2025-09-25 14:59:24.144958', '2025-11-29 14:59:24.14496', 12, '2025-09-30 15:00:10.346514', '2025-09-30 14:00:10.348471');


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.customers VALUES ('John Doe', 'john.doe@example.com', '+1234567890', '123 Main St', 'New York', 'USA', '10001', '1990-05-15', true, 21, '2025-09-30 15:00:10.110877', '2025-09-30 14:00:10.114014');
INSERT INTO public.customers VALUES ('Jane Smith', 'jane.smith@example.com', '+1234567891', '456 Oak Ave', 'Los Angeles', 'USA', '90210', '1985-08-22', true, 22, '2025-09-30 15:00:10.111081', '2025-09-30 14:00:10.114022');
INSERT INTO public.customers VALUES ('Ahmed Hassan', 'ahmed.hassan@example.com', '+1234567892', '789 Pine St', 'Chicago', 'USA', '60601', '1988-12-10', true, 23, '2025-09-30 15:00:10.111181', '2025-09-30 14:00:10.114025');
INSERT INTO public.customers VALUES ('Maria Garcia', 'maria.garcia@example.com', '+1234567893', '321 Elm St', 'Miami', 'USA', '33101', '1992-03-08', true, 24, '2025-09-30 15:00:10.111296', '2025-09-30 14:00:10.114028');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.products VALUES ('Wireless Bluetooth Headphones', 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.', 89.99, 119.99, 50, '{Black,White,Blue}', '{}', 19, true, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240766/ourstore/products/29bd1174f5834a1b9d9a1dc16da66952.jpg.jpg,https://res.cloudinary.com/dxjayinho/image/upload/v1759240769/ourstore/products/abbbd8b1cc2743f1a8e7dca72b93287a.jpg.jpg}', 'WBH001', NULL, NULL, 31, '2025-09-30 14:59:30.616601', '2025-09-30 13:59:42.104981');
INSERT INTO public.products VALUES ('Smart Watch Series X', 'Advanced fitness tracking, heart rate monitoring, and smartphone connectivity.', 299.99, NULL, 25, '{Black,Silver,Gold}', '{}', 19, true, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240771/ourstore/products/e32948507fc6409a94282cbc08fab0f5.jpg.jpg,https://res.cloudinary.com/dxjayinho/image/upload/v1759240773/ourstore/products/9de04bcdc5594a4eb80b35657678ce19.jpg.jpg}', 'SWX001', NULL, NULL, 32, '2025-09-30 14:59:34.26194', '2025-09-30 13:59:42.104999');
INSERT INTO public.products VALUES ('USB-C Fast Charging Cable', 'Durable 6ft USB-C cable with fast charging support up to 100W.', 19.99, NULL, 100, '{Black,White}', '{}', 19, false, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240775/ourstore/products/0d576a568c82449c897ba1bb23395d1f.jpg.jpg}', 'USBC001', NULL, NULL, 33, '2025-09-30 14:59:36.306015', '2025-09-30 13:59:42.105004');
INSERT INTO public.products VALUES ('Classic Cotton T-Shirt', 'Comfortable 100% cotton t-shirt available in multiple colors and sizes.', 24.99, 34.99, 150, '{White,Black,Blue,Red,Green}', '{S,M,L,XL,XXL}', 20, true, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240777/ourstore/products/1685d4fafb3946adb1f9d85599390010.jpg.jpg,https://res.cloudinary.com/dxjayinho/image/upload/v1759240779/ourstore/products/e2ae71280b3f4a299c3254b99ea7a245.jpg.jpg,https://res.cloudinary.com/dxjayinho/image/upload/v1759240781/ourstore/products/becc2e35eb6e4faaa276aafcad212785.jpg.jpg}', 'CCT001', NULL, NULL, 34, '2025-09-30 14:59:42.115371', '2025-09-30 13:59:51.983546');
INSERT INTO public.products VALUES ('Denim Jeans - Slim Fit', 'Premium denim jeans with slim fit design and stretch comfort.', 79.99, NULL, 75, '{"Dark Blue","Light Blue",Black}', '{28,30,32,34,36,38}', 20, false, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240783/ourstore/products/4bf98827acea4e0ebdf71b17a89eadc4.jpg.jpg,https://res.cloudinary.com/dxjayinho/image/upload/v1759240785/ourstore/products/5a29717a35fb4229ad6239c5f43c1228.jpg.jpg}', 'DJ001', NULL, NULL, 35, '2025-09-30 14:59:46.466679', '2025-09-30 13:59:51.983562');
INSERT INTO public.products VALUES ('Ceramic Coffee Mug Set', 'Set of 4 elegant ceramic coffee mugs perfect for daily use.', 34.99, NULL, 60, '{}', '{}', 21, false, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240788/ourstore/products/06867513cd384e0b989a0ee6788785d8.jpg.jpg,https://res.cloudinary.com/dxjayinho/image/upload/v1759240790/ourstore/products/438a687431964f329eaff4ab46b9e175.jpg.jpg}', 'CCM001', NULL, NULL, 36, '2025-09-30 14:59:51.991187', '2025-09-30 13:59:59.260506');
INSERT INTO public.products VALUES ('Indoor Plant - Snake Plant', 'Low-maintenance snake plant perfect for indoor air purification.', 29.99, NULL, 40, '{}', '{}', 21, true, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240793/ourstore/products/d43f4723711543b6bda003e5705f35da.jpg.jpg,https://res.cloudinary.com/dxjayinho/image/upload/v1759240796/ourstore/products/3a5b16b148854dd19028f918d7c50a89.jpg.jpg}', 'SP001', NULL, NULL, 37, '2025-09-30 14:59:57.17291', '2025-09-30 13:59:59.26051');
INSERT INTO public.products VALUES ('The Complete Guide to Web Development', 'Comprehensive guide covering HTML, CSS, JavaScript, and modern frameworks.', 49.99, NULL, 30, '{}', '{}', 22, true, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240798/ourstore/products/3e2cd1dd008a4069bb7d85117537497c.jpg.jpg}', 'WD001', NULL, NULL, 38, '2025-09-30 14:59:59.262709', '2025-09-30 14:00:04.754844');
INSERT INTO public.products VALUES ('Yoga Mat - Premium Quality', 'Non-slip yoga mat with extra cushioning for comfortable practice.', 39.99, NULL, 45, '{}', '{}', 23, true, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240800/ourstore/products/ce1e9fb728d24ebfb4b47da84909ea75.jpg.jpg,https://res.cloudinary.com/dxjayinho/image/upload/v1759240802/ourstore/products/2702d671f1294f73908c57f535297712.jpg.jpg}', 'YM001', NULL, NULL, 39, '2025-09-30 15:00:04.757024', '2025-09-30 14:00:10.102596');
INSERT INTO public.products VALUES ('Organic Face Moisturizer', 'Natural organic moisturizer with SPF 30 protection for daily use.', 24.99, NULL, 80, '{}', '{}', 24, false, true, NULL, '{https://res.cloudinary.com/dxjayinho/image/upload/v1759240809/ourstore/products/f5582042d0924e749bd5301a7a2e90d8.jpg.jpg}', 'OFM001', NULL, NULL, 40, '2025-09-30 15:00:10.104204', '2025-09-30 14:00:10.104759');


--
-- Data for Name: inventory_logs; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.inventory_logs VALUES (31, 'stock_in', 4, 50, 54, 'Sample inventory movement for Wireless Bluetooth Headphones', NULL, 'system', 58, '2025-09-18 15:00:10.448646', '2025-09-30 14:00:10.449819');
INSERT INTO public.inventory_logs VALUES (32, 'adjustment', 9, 25, 34, 'Sample inventory movement for Smart Watch Series X', NULL, 'system', 59, '2025-09-03 15:00:10.451702', '2025-09-30 14:00:10.453251');
INSERT INTO public.inventory_logs VALUES (32, 'stock_in', 13, 25, 38, 'Sample inventory movement for Smart Watch Series X', NULL, 'system', 60, '2025-09-21 15:00:10.451822', '2025-09-30 14:00:10.453255');
INSERT INTO public.inventory_logs VALUES (32, 'stock_in', -1, 25, 24, 'Sample inventory movement for Smart Watch Series X', NULL, 'system', 61, '2025-09-06 15:00:10.451892', '2025-09-30 14:00:10.453256');
INSERT INTO public.inventory_logs VALUES (33, 'stock_in', 13, 100, 113, 'Sample inventory movement for USB-C Fast Charging Cable', NULL, 'system', 62, '2025-09-11 15:00:10.455543', '2025-09-30 14:00:10.456234');
INSERT INTO public.inventory_logs VALUES (34, 'adjustment', 34, 150, 184, 'Sample inventory movement for Classic Cotton T-Shirt', NULL, 'system', 63, '2025-09-26 15:00:10.458292', '2025-09-30 14:00:10.458711');
INSERT INTO public.inventory_logs VALUES (35, 'stock_in', -2, 75, 73, 'Sample inventory movement for Denim Jeans - Slim Fit', NULL, 'system', 64, '2025-09-12 15:00:10.460267', '2025-09-30 14:00:10.460946');
INSERT INTO public.inventory_logs VALUES (35, 'adjustment', 38, 75, 113, 'Sample inventory movement for Denim Jeans - Slim Fit', NULL, 'system', 65, '2025-09-19 15:00:10.460411', '2025-09-30 14:00:10.460949');
INSERT INTO public.inventory_logs VALUES (35, 'stock_in', 13, 75, 88, 'Sample inventory movement for Denim Jeans - Slim Fit', NULL, 'system', 66, '2025-09-08 15:00:10.46048', '2025-09-30 14:00:10.46095');
INSERT INTO public.inventory_logs VALUES (36, 'adjustment', -3, 60, 57, 'Sample inventory movement for Ceramic Coffee Mug Set', NULL, 'system', 67, '2025-09-19 15:00:10.462732', '2025-09-30 14:00:10.463458');
INSERT INTO public.inventory_logs VALUES (36, 'stock_in', 6, 60, 66, 'Sample inventory movement for Ceramic Coffee Mug Set', NULL, 'system', 68, '2025-09-01 15:00:10.462848', '2025-09-30 14:00:10.463462');
INSERT INTO public.inventory_logs VALUES (36, 'stock_in', 23, 60, 83, 'Sample inventory movement for Ceramic Coffee Mug Set', NULL, 'system', 69, '2025-09-06 15:00:10.462897', '2025-09-30 14:00:10.463463');
INSERT INTO public.inventory_logs VALUES (37, 'stock_out', 50, 40, 90, 'Sample inventory movement for Indoor Plant - Snake Plant', NULL, 'system', 70, '2025-09-12 15:00:10.465311', '2025-09-30 14:00:10.465824');
INSERT INTO public.inventory_logs VALUES (37, 'stock_out', 40, 40, 80, 'Sample inventory movement for Indoor Plant - Snake Plant', NULL, 'system', 71, '2025-09-24 15:00:10.465401', '2025-09-30 14:00:10.465827');
INSERT INTO public.inventory_logs VALUES (38, 'stock_out', 35, 30, 65, 'Sample inventory movement for The Complete Guide to Web Development', NULL, 'system', 72, '2025-09-24 15:00:10.467644', '2025-09-30 14:00:10.468195');
INSERT INTO public.inventory_logs VALUES (39, 'stock_out', 20, 45, 65, 'Sample inventory movement for Yoga Mat - Premium Quality', NULL, 'system', 73, '2025-09-12 15:00:10.469382', '2025-09-30 14:00:10.469789');
INSERT INTO public.inventory_logs VALUES (40, 'adjustment', 26, 80, 106, 'Sample inventory movement for Organic Face Moisturizer', NULL, 'system', 74, '2025-09-01 15:00:10.470868', '2025-09-30 14:00:10.471322');
INSERT INTO public.inventory_logs VALUES (40, 'stock_out', 26, 80, 106, 'Sample inventory movement for Organic Face Moisturizer', NULL, 'system', 75, '2025-09-09 15:00:10.470954', '2025-09-30 14:00:10.471324');
INSERT INTO public.inventory_logs VALUES (40, 'stock_out', 26, 80, 106, 'Sample inventory movement for Organic Face Moisturizer', NULL, 'system', 76, '2025-09-15 15:00:10.470994', '2025-09-30 14:00:10.471326');


--
-- Data for Name: newsletter_subscriptions; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--



--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.orders VALUES (23, 'ORD-20250930-9882', 'confirmed', 137.97, 12.00, 0.00, 149.97, 'TND', 'pending', NULL, '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', NULL, 49, '2025-09-20 14:59:24.144976', '2025-09-30 14:00:10.355529');
INSERT INTO public.orders VALUES (23, 'ORD-20250930-1876', 'confirmed', 96.56, 8.40, 0.00, 104.96, 'TND', 'refunded', NULL, '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', NULL, 50, '2025-09-05 14:59:24.145025', '2025-09-30 14:00:10.36069');
INSERT INTO public.orders VALUES (23, 'ORD-20250930-6398', 'cancelled', 243.76, 21.20, 0.00, 264.96, 'TND', 'refunded', NULL, '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', NULL, 51, '2025-09-09 14:59:24.14505', '2025-09-30 14:00:10.367209');
INSERT INTO public.orders VALUES (24, 'ORD-20250930-2926', 'shipped', 768.11, 66.79, 0.00, 834.90, 'TND', 'failed', NULL, '{"type": "billing", "street": "321 Elm St", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "USA", "is_default": true}', '{"type": "billing", "street": "321 Elm St", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "USA", "is_default": true}', NULL, 52, '2025-09-19 14:59:24.145073', '2025-09-30 14:00:10.373764');
INSERT INTO public.orders VALUES (24, 'ORD-20250930-5617', 'delivered', 220.77, 19.20, 0.00, 239.97, 'TND', 'pending', NULL, '{"type": "billing", "street": "321 Elm St", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "USA", "is_default": true}', '{"type": "billing", "street": "321 Elm St", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "USA", "is_default": true}', NULL, 53, '2025-09-25 14:59:24.145099', '2025-09-30 14:00:10.379187');
INSERT INTO public.orders VALUES (24, 'ORD-20250930-3158', 'shipped', 533.52, 46.39, 0.00, 579.91, 'TND', 'refunded', NULL, '{"type": "billing", "street": "321 Elm St", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "USA", "is_default": true}', '{"type": "billing", "street": "321 Elm St", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "USA", "is_default": true}', NULL, 54, '2025-09-19 14:59:24.145118', '2025-09-30 14:00:10.380947');
INSERT INTO public.orders VALUES (22, 'ORD-20250930-6502', 'delivered', 680.74, 59.19, 0.00, 739.93, 'TND', 'completed', NULL, '{"type": "billing", "street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "country": "USA", "is_default": true}', '{"type": "billing", "street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "country": "USA", "is_default": true}', NULL, 55, '2025-09-11 14:59:24.145145', '2025-09-30 14:00:10.386832');
INSERT INTO public.orders VALUES (22, 'ORD-20250930-7172', 'cancelled', 321.97, 28.00, 0.00, 349.97, 'TND', 'completed', NULL, '{"type": "billing", "street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "country": "USA", "is_default": true}', '{"type": "billing", "street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "country": "USA", "is_default": true}', NULL, 56, '2025-09-09 14:59:24.145168', '2025-09-30 14:00:10.38792');
INSERT INTO public.orders VALUES (23, 'ORD-20250930-2553', 'delivered', 133.36, 11.60, 0.00, 144.96, 'TND', 'completed', NULL, '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', NULL, 57, '2025-09-14 14:59:24.145188', '2025-09-30 14:00:10.390684');
INSERT INTO public.orders VALUES (21, 'ORD-20250930-8446', 'pending', 17.59, 2.40, 9.99, 29.98, 'TND', 'completed', NULL, '{"type": "billing", "street": "123 Main St", "city": "New York", "state": "NY", "postal_code": "10001", "country": "USA", "is_default": true}', '{"type": "billing", "street": "123 Main St", "city": "New York", "state": "NY", "postal_code": "10001", "country": "USA", "is_default": true}', NULL, 58, '2025-09-09 14:59:24.145207', '2025-09-30 14:00:10.396391');
INSERT INTO public.orders VALUES (21, 'ORD-20250930-6409', 'delivered', 110.37, 9.60, 0.00, 119.97, 'TND', 'failed', NULL, '{"type": "billing", "street": "123 Main St", "city": "New York", "state": "NY", "postal_code": "10001", "country": "USA", "is_default": true}', '{"type": "billing", "street": "123 Main St", "city": "New York", "state": "NY", "postal_code": "10001", "country": "USA", "is_default": true}', NULL, 59, '2025-09-20 14:59:24.145229', '2025-09-30 14:00:10.39788');
INSERT INTO public.orders VALUES (23, 'ORD-20250930-3944', 'cancelled', 423.14, 36.80, 0.00, 459.94, 'TND', 'failed', NULL, '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', NULL, 60, '2025-09-24 14:59:24.145252', '2025-09-30 14:00:10.399853');
INSERT INTO public.orders VALUES (24, 'ORD-20250930-4932', 'confirmed', 1025.72, 89.19, 0.00, 1114.91, 'TND', 'pending', NULL, '{"type": "billing", "street": "321 Elm St", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "USA", "is_default": true}', '{"type": "billing", "street": "321 Elm St", "city": "Miami", "state": "FL", "postal_code": "33101", "country": "USA", "is_default": true}', NULL, 61, '2025-09-28 14:59:24.145276', '2025-09-30 14:00:10.402405');
INSERT INTO public.orders VALUES (22, 'ORD-20250930-9723', 'confirmed', 312.74, 27.19, 0.00, 339.93, 'TND', 'completed', NULL, '{"type": "billing", "street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "country": "USA", "is_default": true}', '{"type": "billing", "street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "postal_code": "90210", "country": "USA", "is_default": true}', NULL, 62, '2025-09-13 14:59:24.1453', '2025-09-30 14:00:10.40504');
INSERT INTO public.orders VALUES (23, 'ORD-20250930-6261', 'shipped', 73.58, 6.40, 0.00, 79.98, 'TND', 'failed', NULL, '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', '{"type": "billing", "street": "789 Pine St", "city": "Chicago", "state": "IL", "postal_code": "60601", "country": "USA", "is_default": true}', NULL, 63, '2025-08-31 14:59:24.145321', '2025-09-30 14:00:10.410086');


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.order_items VALUES (49, 38, 3, NULL, NULL, 49.99, 149.97, 122, '2025-09-30 14:00:10.362419', '2025-09-30 14:00:10.362423');
INSERT INTO public.order_items VALUES (50, 37, 1, NULL, NULL, 29.99, 29.99, 123, '2025-09-30 14:00:10.364718', '2025-09-30 14:00:10.364721');
INSERT INTO public.order_items VALUES (50, 40, 3, NULL, NULL, 24.99, 74.97, 124, '2025-09-30 14:00:10.367974', '2025-09-30 14:00:10.36798');
INSERT INTO public.order_items VALUES (51, 34, 1, NULL, NULL, 24.99, 24.99, 125, '2025-09-30 14:00:10.36979', '2025-09-30 14:00:10.369794');
INSERT INTO public.order_items VALUES (51, 35, 3, NULL, NULL, 79.99, 239.97, 126, '2025-09-30 14:00:10.371708', '2025-09-30 14:00:10.371714');
INSERT INTO public.order_items VALUES (52, 38, 2, NULL, NULL, 49.99, 99.98, 127, '2025-09-30 14:00:10.374815', '2025-09-30 14:00:10.374819');
INSERT INTO public.order_items VALUES (52, 33, 3, NULL, NULL, 19.99, 59.97, 128, '2025-09-30 14:00:10.377093', '2025-09-30 14:00:10.377097');
INSERT INTO public.order_items VALUES (52, 34, 3, NULL, NULL, 24.99, 74.97, 129, '2025-09-30 14:00:10.377098', '2025-09-30 14:00:10.377099');
INSERT INTO public.order_items VALUES (52, 32, 2, NULL, NULL, 299.99, 599.98, 130, '2025-09-30 14:00:10.379913', '2025-09-30 14:00:10.379916');
INSERT INTO public.order_items VALUES (53, 35, 3, NULL, NULL, 79.99, 239.97, 131, '2025-09-30 14:00:10.381789', '2025-09-30 14:00:10.381792');
INSERT INTO public.order_items VALUES (54, 37, 2, NULL, NULL, 29.99, 59.98, 132, '2025-09-30 14:00:10.382834', '2025-09-30 14:00:10.382837');
INSERT INTO public.order_items VALUES (54, 38, 2, NULL, NULL, 49.99, 99.98, 133, '2025-09-30 14:00:10.382839', '2025-09-30 14:00:10.38284');
INSERT INTO public.order_items VALUES (54, 31, 2, NULL, NULL, 89.99, 179.98, 134, '2025-09-30 14:00:10.384887', '2025-09-30 14:00:10.384891');
INSERT INTO public.order_items VALUES (54, 35, 3, NULL, NULL, 79.99, 239.97, 135, '2025-09-30 14:00:10.384892', '2025-09-30 14:00:10.384893');
INSERT INTO public.order_items VALUES (55, 40, 2, NULL, NULL, 24.99, 49.98, 136, '2025-09-30 14:00:10.388854', '2025-09-30 14:00:10.388859');
INSERT INTO public.order_items VALUES (55, 32, 2, NULL, NULL, 299.99, 599.98, 137, '2025-09-30 14:00:10.388861', '2025-09-30 14:00:10.388863');
INSERT INTO public.order_items VALUES (55, 37, 3, NULL, NULL, 29.99, 89.97, 138, '2025-09-30 14:00:10.388865', '2025-09-30 14:00:10.388866');
INSERT INTO public.order_items VALUES (56, 32, 1, NULL, NULL, 299.99, 299.99, 139, '2025-09-30 14:00:10.3915', '2025-09-30 14:00:10.391504');
INSERT INTO public.order_items VALUES (56, 33, 1, NULL, NULL, 19.99, 19.99, 140, '2025-09-30 14:00:10.391505', '2025-09-30 14:00:10.391506');
INSERT INTO public.order_items VALUES (56, 37, 1, NULL, NULL, 29.99, 29.99, 141, '2025-09-30 14:00:10.391507', '2025-09-30 14:00:10.391508');
INSERT INTO public.order_items VALUES (57, 39, 3, NULL, NULL, 39.99, 119.97, 142, '2025-09-30 14:00:10.394428', '2025-09-30 14:00:10.394432');
INSERT INTO public.order_items VALUES (57, 40, 1, NULL, NULL, 24.99, 24.99, 143, '2025-09-30 14:00:10.394433', '2025-09-30 14:00:10.394434');
INSERT INTO public.order_items VALUES (58, 33, 1, NULL, NULL, 19.99, 19.99, 144, '2025-09-30 14:00:10.398755', '2025-09-30 14:00:10.398758');
INSERT INTO public.order_items VALUES (59, 35, 1, NULL, NULL, 79.99, 79.99, 145, '2025-09-30 14:00:10.400596', '2025-09-30 14:00:10.400598');
INSERT INTO public.order_items VALUES (59, 33, 2, NULL, NULL, 19.99, 39.98, 146, '2025-09-30 14:00:10.4006', '2025-09-30 14:00:10.400601');
INSERT INTO public.order_items VALUES (60, 33, 2, NULL, NULL, 19.99, 39.98, 147, '2025-09-30 14:00:10.403493', '2025-09-30 14:00:10.403497');
INSERT INTO public.order_items VALUES (60, 39, 3, NULL, NULL, 39.99, 119.97, 148, '2025-09-30 14:00:10.403498', '2025-09-30 14:00:10.403499');
INSERT INTO public.order_items VALUES (60, 32, 1, NULL, NULL, 299.99, 299.99, 149, '2025-09-30 14:00:10.4035', '2025-09-30 14:00:10.403501');
INSERT INTO public.order_items VALUES (61, 37, 3, NULL, NULL, 29.99, 89.97, 150, '2025-09-30 14:00:10.40593', '2025-09-30 14:00:10.405934');
INSERT INTO public.order_items VALUES (61, 34, 1, NULL, NULL, 24.99, 24.99, 151, '2025-09-30 14:00:10.405935', '2025-09-30 14:00:10.405936');
INSERT INTO public.order_items VALUES (61, 38, 2, NULL, NULL, 49.99, 99.98, 152, '2025-09-30 14:00:10.405937', '2025-09-30 14:00:10.405938');
INSERT INTO public.order_items VALUES (61, 32, 3, NULL, NULL, 299.99, 899.97, 153, '2025-09-30 14:00:10.40594', '2025-09-30 14:00:10.40594');
INSERT INTO public.order_items VALUES (62, 37, 3, NULL, NULL, 29.99, 89.97, 154, '2025-09-30 14:00:10.407988', '2025-09-30 14:00:10.407992');
INSERT INTO public.order_items VALUES (62, 31, 2, NULL, NULL, 89.99, 179.98, 155, '2025-09-30 14:00:10.407993', '2025-09-30 14:00:10.407994');
INSERT INTO public.order_items VALUES (62, 36, 2, NULL, NULL, 34.99, 69.98, 156, '2025-09-30 14:00:10.410724', '2025-09-30 14:00:10.410727');
INSERT INTO public.order_items VALUES (63, 39, 2, NULL, NULL, 39.99, 79.98, 157, '2025-09-30 14:00:10.411502', '2025-09-30 14:00:10.411505');


--
-- Data for Name: product_reviews; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--

INSERT INTO public.product_reviews VALUES (39, 22, 3, NULL, 'Great product! Exactly as described and fast shipping.', true, true, 76, '2025-09-03 14:59:24.145341', '2025-09-30 14:00:10.417193');
INSERT INTO public.product_reviews VALUES (33, 23, 4, NULL, 'Good value for money. Happy with purchase.', true, true, 77, '2025-08-22 14:59:24.145355', '2025-09-30 14:00:10.420806');
INSERT INTO public.product_reviews VALUES (33, 21, 3, NULL, 'Decent product but took a while to arrive.', true, true, 78, '2025-08-13 14:59:24.145367', '2025-09-30 14:00:10.423287');
INSERT INTO public.product_reviews VALUES (40, 21, 3, NULL, 'Could be improved but overall satisfied.', true, true, 79, '2025-09-29 14:59:24.145375', '2025-09-30 14:00:10.425648');
INSERT INTO public.product_reviews VALUES (35, 22, 5, NULL, 'Could be improved but overall satisfied.', false, true, 80, '2025-08-01 14:59:24.14538', '2025-09-30 14:00:10.427625');
INSERT INTO public.product_reviews VALUES (38, 23, 5, NULL, 'Outstanding quality! Highly recommended!', false, true, 81, '2025-08-28 14:59:24.145385', '2025-09-30 14:00:10.429361');
INSERT INTO public.product_reviews VALUES (31, 23, 5, NULL, 'Amazing! Better than expected. Five stars!', false, true, 82, '2025-09-01 14:59:24.145391', '2025-09-30 14:00:10.431716');
INSERT INTO public.product_reviews VALUES (32, 23, 4, NULL, 'Decent product but took a while to arrive.', true, true, 83, '2025-09-25 14:59:24.145402', '2025-09-30 14:00:10.433669');
INSERT INTO public.product_reviews VALUES (35, 24, 4, NULL, 'Amazing! Better than expected. Five stars!', true, true, 84, '2025-09-25 14:59:24.145407', '2025-09-30 14:00:10.435923');
INSERT INTO public.product_reviews VALUES (31, 23, 4, NULL, 'Good value for money. Happy with purchase.', false, true, 85, '2025-08-23 14:59:24.145412', '2025-09-30 14:00:10.435927');
INSERT INTO public.product_reviews VALUES (32, 21, 3, NULL, 'Good quality for the price. Would recommend.', true, true, 86, '2025-08-26 14:59:24.145418', '2025-09-30 14:00:10.435928');
INSERT INTO public.product_reviews VALUES (37, 23, 4, NULL, 'Perfect for my needs. Will buy again!', true, true, 87, '2025-08-16 14:59:24.145423', '2025-09-30 14:00:10.438573');
INSERT INTO public.product_reviews VALUES (37, 23, 3, NULL, 'Not bad, but could be better. Average quality.', true, true, 88, '2025-09-16 14:59:24.145428', '2025-09-30 14:00:10.438579');
INSERT INTO public.product_reviews VALUES (34, 23, 5, NULL, 'Perfect for my needs. Will buy again!', false, true, 89, '2025-08-22 14:59:24.145433', '2025-09-30 14:00:10.441119');
INSERT INTO public.product_reviews VALUES (32, 24, 4, NULL, 'Excellent customer service and product quality.', false, true, 90, '2025-09-01 14:59:24.145438', '2025-09-30 14:00:10.441122');
INSERT INTO public.product_reviews VALUES (36, 23, 5, NULL, 'Perfect for my needs. Will buy again!', true, true, 91, '2025-08-18 14:59:24.145442', '2025-09-30 14:00:10.44428');
INSERT INTO public.product_reviews VALUES (39, 21, 5, NULL, 'Great product! Exactly as described and fast shipping.', true, true, 92, '2025-08-28 14:59:24.145447', '2025-09-30 14:00:10.444284');
INSERT INTO public.product_reviews VALUES (38, 21, 5, NULL, 'Amazing! Better than expected. Five stars!', true, true, 93, '2025-08-09 14:59:24.145453', '2025-09-30 14:00:10.444286');
INSERT INTO public.product_reviews VALUES (36, 24, 5, NULL, 'Good quality for the price. Would recommend.', true, true, 94, '2025-08-14 14:59:24.145459', '2025-09-30 14:00:10.444289');
INSERT INTO public.product_reviews VALUES (40, 24, 4, NULL, 'Could be improved but overall satisfied.', true, true, 95, '2025-09-23 14:59:24.145464', '2025-09-30 14:00:10.444291');
INSERT INTO public.product_reviews VALUES (39, 22, 5, NULL, 'Outstanding quality! Highly recommended!', true, true, 96, '2025-09-28 14:59:24.145469', '2025-09-30 14:00:10.444293');
INSERT INTO public.product_reviews VALUES (32, 23, 3, NULL, 'Great product! Exactly as described and fast shipping.', true, true, 97, '2025-09-05 14:59:24.145476', '2025-09-30 14:00:10.444296');
INSERT INTO public.product_reviews VALUES (32, 24, 5, NULL, 'Perfect for my needs. Will buy again!', true, true, 98, '2025-08-29 14:59:24.145482', '2025-09-30 14:00:10.444298');
INSERT INTO public.product_reviews VALUES (39, 24, 3, NULL, 'Good value for money. Happy with purchase.', true, true, 99, '2025-08-04 14:59:24.145487', '2025-09-30 14:00:10.4443');
INSERT INTO public.product_reviews VALUES (35, 21, 3, NULL, 'Good quality for the price. Would recommend.', true, true, 100, '2025-08-02 14:59:24.145492', '2025-09-30 14:00:10.444302');


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: ourstore_user
--



--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 8, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.categories_id_seq', 24, true);


--
-- Name: contact_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.contact_messages_id_seq', 4, true);


--
-- Name: coupons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.coupons_id_seq', 12, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.customers_id_seq', 24, true);


--
-- Name: inventory_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.inventory_logs_id_seq', 76, true);


--
-- Name: newsletter_subscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.newsletter_subscriptions_id_seq', 1, false);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.order_items_id_seq', 157, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.orders_id_seq', 63, true);


--
-- Name: product_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.product_reviews_id_seq', 100, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.products_id_seq', 40, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ourstore_user
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

\unrestrict X4HrFX5PAuWtJk9CCvioeh6Xdm4J8hkPRvxdZUUKnSUdHtz8MrZQZt9cbDvuIfG

