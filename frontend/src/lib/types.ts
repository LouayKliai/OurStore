// Product type based on your backend model
export interface Product {
  id: number;
  name: string;
  price: string;
  original_price?: string | null;
  stock: number;
  color_options: string[];
  size_options?: string[];
  category: string; // Changed from union type to string to match backend
  is_bestseller?: boolean;
  image?: string;
  image_url?: string;
  images?: string[];
  description?: string;
  sku?: string;
  weight?: string | null;
  dimensions?: { length?: number; width?: number; height?: number } | null;
  average_rating?: number;
  review_count?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Category type
export interface Category {
  id: number;
  name: string;
  description: string;
  name_code: string; // Translation key for name
  description_code: string; // Translation key for description
  created_at?: string;
}

// Categories with featured products response
export interface CategoriesWithFeatured {
  categories: Category[];
  categoryPreviews: { [key: string]: Product[] };
}

// Bestsellers response
export interface BestsellersResponse {
  bestsellers: Product[];
}

// Cart item type (extends Product with cart-specific fields)
export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  color?: string;
  stock: number;
}

// Order item type
export interface OrderItem {
  id: number;
  product?: Product;
  quantity: number;
  color?: string;
  size?: string;
  price: string;
  total: string;
}

// Order type for submission to backend
export interface OrderSubmission {
  customer_id: number;
  items: {
    product_id: number;
    quantity: number;
    color?: string | null;
    size?: string | null;
  }[];
  shipping_address: string;
  billing_address?: string;
}

// Complete order type (for display)
export interface Order {
  id: number;
  customer_id: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: string;
  shipping_address: string;
  billing_address?: string;
  tracking_number?: string;
  created_at: string;
  updated_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  items?: OrderItem[];
  customer?: Customer;
}

// Customer information type
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  created_at?: string;
  updated_at?: string;
  total_orders?: number;
  total_spent?: string;
  average_order_value?: string;
  last_order_date?: string;
}

// Local storage order type (for user's order history)
export interface LocalOrder {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  total: number;
  created_at: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Customer info for local storage
export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
}

// Admin user type
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Coupon type
export interface Coupon {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_amount?: number;
  usage_limit?: number;
  expiry_date?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Site settings type
export interface SiteSettings {
  site_name?: string;
  site_description?: string;
  contact_email?: string;
  contact_phone?: string;
  currency?: string;
  tax_rate?: number;
  shipping_fee?: number;
  free_shipping_threshold?: number;
  maintenance_mode?: boolean;
  allow_guest_orders?: boolean;
}

// Dashboard statistics type
export interface DashboardStats {
  stats: {
    total_products: number;
    total_customers: number;
    total_orders: number;
    total_revenue: number;
    orders_this_month: number;
    revenue_this_month: number;
  };
  order_statuses: {
    status: string;
    count: number;
  }[];
  low_stock_products: Product[];
  recent_orders: Order[];
  top_products: {
    product: Product;
    total_sold: number;
  }[];
}

// Analytics data type
export interface AnalyticsData {
  daily_revenue: {
    date: string;
    revenue: number;
  }[];
  daily_orders: {
    date: string;
    orders: number;
  }[];
  daily_customers: {
    date: string;
    customers: number;
  }[];
}

// Order statistics type
export interface OrderStats {
  total_orders: number;
  pending_orders: number;
  shipped_orders: number;
  delivered_orders: number;
  total_revenue: number;
}

// Customer statistics type
export interface CustomerStats {
  total_customers: number;
  customers_with_orders: number;
  new_customers_this_month: number;
  top_customers: {
    customer: Customer;
    total_spent: number;
  }[];
}

// Pagination response type
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pages: number;
  current_page: number;
  has_next?: boolean;
  has_prev?: boolean;
  per_page?: number;
}

// Backend products API response type
export interface BackendProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    total: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// Stock update type
export interface StockUpdate {
  quantity_change: number;
  reason: string;
}