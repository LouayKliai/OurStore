import {
  Product,
  Order,
  OrderSubmission,
  Customer,
  Category,
  CategoriesWithFeatured,
  BestsellersResponse,
  AdminUser,
  Coupon,
  SiteSettings,
  DashboardStats,
  AnalyticsData,
  OrderStats,
  CustomerStats,
  PaginatedResponse,
  BackendProductsResponse,
  StockUpdate
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ourstore-3si3.onrender.com';

// Helper function to build query string
function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error [${options.method || 'GET'} ${endpoint}]:`, error);
    throw error;
  }
}

// =============================================================================
// PRODUCTS API
// =============================================================================

export async function getProducts(params: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  is_bestseller?: boolean;
  sort_by?: 'name' | 'price' | 'created_at';
  sort_order?: 'asc' | 'desc';
} = {}): Promise<BackendProductsResponse> {
  const query = buildQueryString(params);
  return apiRequest(`/api/products${query}`);
}

export async function getProductById(id: number): Promise<{ product: Product }> {
  return apiRequest(`/api/products/${id}`);
}

export async function createProduct(productData: Partial<Product>): Promise<{ product: Product }> {
  return apiRequest('/api/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
}

export async function updateProduct(id: number, productData: Partial<Product>): Promise<{ product: Product }> {
  return apiRequest(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
}

export async function deleteProduct(id: number): Promise<{ message: string }> {
  return apiRequest(`/api/products/${id}`, {
    method: 'DELETE',
  });
}

export async function getCategories(): Promise<{ categories: Category[] }> {
  return apiRequest('/api/products/categories');
}

export async function getCategoriesWithFeatured(limit: number = 3): Promise<CategoriesWithFeatured> {
  const query = buildQueryString({ limit });
  return apiRequest(`/api/products/categories/featured${query}`);
}

export async function getBestsellers(): Promise<BestsellersResponse> {
  return apiRequest('/api/products/bestsellers');
}

export async function updateProductStock(id: number, stockData: StockUpdate): Promise<{ product: Product }> {
  return apiRequest(`/api/products/${id}/stock`, {
    method: 'PUT',
    body: JSON.stringify(stockData),
  });
}

// =============================================================================
// ORDERS API
// =============================================================================

export async function getOrders(params: {
  page?: number;
  per_page?: number;
  status?: string;
  customer_id?: number;
} = {}): Promise<PaginatedResponse<Order>> {
  const query = buildQueryString(params);
  return apiRequest(`/api/orders${query}`);
}

export async function getOrderById(id: number): Promise<Order> {
  return apiRequest(`/api/orders/${id}`);
}

export async function createOrder(orderData: OrderSubmission): Promise<Order> {
  return apiRequest('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function updateOrder(id: number, orderData: Partial<Order>): Promise<Order> {
  return apiRequest(`/api/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(orderData),
  });
}

export async function cancelOrder(id: number): Promise<{ message: string }> {
  return apiRequest(`/api/orders/${id}`, {
    method: 'DELETE',
  });
}

export async function getOrderStats(): Promise<OrderStats> {
  return apiRequest('/api/orders/stats');
}

// =============================================================================
// CUSTOMERS API
// =============================================================================

export async function getCustomers(params: {
  page?: number;
  per_page?: number;
  search?: string;
} = {}): Promise<PaginatedResponse<Customer>> {
  const query = buildQueryString(params);
  return apiRequest(`/api/customers${query}`);
}

export async function getCustomerById(id: number): Promise<Customer> {
  return apiRequest(`/api/customers/${id}`);
}

export async function createCustomer(customerData: Partial<Customer>): Promise<Customer> {
  return apiRequest('/api/customers', {
    method: 'POST',
    body: JSON.stringify(customerData),
  });
}

export async function updateCustomer(id: number, customerData: Partial<Customer>): Promise<Customer> {
  return apiRequest(`/api/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(customerData),
  });
}

export async function deleteCustomer(id: number): Promise<{ message: string }> {
  return apiRequest(`/api/customers/${id}`, {
    method: 'DELETE',
  });
}

export async function getCustomerOrders(id: number, params: {
  page?: number;
  per_page?: number;
} = {}): Promise<{ customer: Customer; orders: Order[]; total: number; pages: number; current_page: number }> {
  const query = buildQueryString(params);
  return apiRequest(`/api/customers/${id}/orders${query}`);
}

export async function getCustomerStats(id: number): Promise<{ customer: Customer; total_orders: number; total_spent: string; average_order_value: string; last_order_date: string | null }> {
  return apiRequest(`/api/customers/${id}/stats`);
}

export async function getCustomersStats(): Promise<CustomerStats> {
  return apiRequest('/api/customers/stats');
}

// =============================================================================
// ADMIN API
// =============================================================================

export async function getAdminDashboard(): Promise<DashboardStats> {
  return apiRequest('/api/admin/dashboard');
}

export async function getAdminUsers(params: {
  page?: number;
  per_page?: number;
} = {}): Promise<PaginatedResponse<AdminUser>> {
  const query = buildQueryString(params);
  return apiRequest(`/api/admin/users${query}`);
}

export async function createAdminUser(userData: {
  username: string;
  email: string;
  password: string;
  role: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}): Promise<AdminUser> {
  return apiRequest('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function updateAdminUser(id: number, userData: Partial<AdminUser>): Promise<AdminUser> {
  return apiRequest(`/api/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

export async function deleteAdminUser(id: number): Promise<{ message: string }> {
  return apiRequest(`/api/admin/users/${id}`, {
    method: 'DELETE',
  });
}

export async function getCoupons(params: {
  page?: number;
  per_page?: number;
} = {}): Promise<PaginatedResponse<Coupon>> {
  const query = buildQueryString(params);
  return apiRequest(`/api/admin/coupons${query}`);
}

export async function createCoupon(couponData: {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_amount?: number;
  usage_limit?: number;
  expiry_date?: string;
  is_active?: boolean;
}): Promise<Coupon> {
  return apiRequest('/api/admin/coupons', {
    method: 'POST',
    body: JSON.stringify(couponData),
  });
}

export async function updateCoupon(id: number, couponData: Partial<Coupon>): Promise<Coupon> {
  return apiRequest(`/api/admin/coupons/${id}`, {
    method: 'PUT',
    body: JSON.stringify(couponData),
  });
}

export async function getSettings(): Promise<SiteSettings> {
  return apiRequest('/api/admin/settings');
}

export async function updateSettings(settingsData: Partial<SiteSettings>): Promise<{ message: string }> {
  return apiRequest('/api/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(settingsData),
  });
}

export async function getAnalytics(days: number = 30): Promise<AnalyticsData> {
  const query = buildQueryString({ days });
  return apiRequest(`/api/admin/analytics${query}`);
}