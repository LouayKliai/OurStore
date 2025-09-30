-- Data export for coupons
-- 3 rows

INSERT INTO coupons (id, code, name, description, discount_type, discount_value, minimum_order_amount, usage_limit, used_count, is_active, valid_from, valid_until, created_at, updated_at) VALUES (13, 'WELCOME10', 'Welcome discount for new customers', 'Welcome discount for new customers', 'percentage', 10.00, 50.00, 100, 0, true, 2025-09-28 19:02:11.999875, 2025-10-28 19:02:11.999881, 2025-09-28 19:02:12.432321, NULL);
INSERT INTO coupons (id, code, name, description, discount_type, discount_value, minimum_order_amount, usage_limit, used_count, is_active, valid_from, valid_until, created_at, updated_at) VALUES (14, 'SUMMER20', 'Summer sale - 20% off everything', 'Summer sale - 20% off everything', 'percentage', 20.00, 100.00, 50, 15, true, 2025-09-18 19:02:11.999888, 2025-10-18 19:02:11.999890, 2025-09-28 19:02:12.432457, NULL);
INSERT INTO coupons (id, code, name, description, discount_type, discount_value, minimum_order_amount, usage_limit, used_count, is_active, valid_from, valid_until, created_at, updated_at) VALUES (15, 'FREESHIP', 'Free shipping on orders over $75', 'Free shipping on orders over $75', 'fixed', 9.99, 75.00, NULL, 45, true, 2025-09-23 19:02:11.999892, 2025-11-27 19:02:11.999893, 2025-09-28 19:02:12.432498, NULL);

