-- Data export for admin_users
-- 2 rows

INSERT INTO admin_users (id, username, email, password_hash, first_name, last_name, role, is_active, last_login, created_at, updated_at) VALUES (11, 'admin', 'admin@ourstore.com', 'scrypt:32768:8:1$0RNxthsInbEGmFQy$e11e226bb02fceffa617dab205e1fb823c7d9cf1461a15b41274d7403c6ae82e2ab7db11ddc04a401d25656ff5534e0dee2a17643167b95f2193031bed1eaf32', 'Store', 'Administrator', 'super_admin', true, NULL, 2025-09-28 19:02:12.309155, 2025-09-28 18:02:12.310739);
INSERT INTO admin_users (id, username, email, password_hash, first_name, last_name, role, is_active, last_login, created_at, updated_at) VALUES (12, 'manager', 'manager@ourstore.com', 'scrypt:32768:8:1$VzNEyQLq5yoMlPml$e8909c94f1076a2c20564e6dfabef068945263ff73b20da285c0fd8152acc0907bea725b7764a42709d7d8819e3f0d62ea9867f2a6653380b4d84e70487884f2', 'Store', 'Manager', 'manager', true, NULL, 2025-09-28 19:02:12.426026, 2025-09-28 18:02:12.426464);

