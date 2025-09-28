// Product type based on your backend model
export interface Product {
  id: number;
  name: string;
  price: string;
  original_price?: string; // For showing crossed-out price
  stock: number;
  color_options: string[];
  size_options?: string[]; // Available sizes
  category: 'clothes' | 'tech' | 'beauty'; // Product category
  is_bestseller?: boolean; // Flag for bestselling items
  image?: string; // Product image URL
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

// Order type for submission to backend
export interface OrderSubmission {
  product_id: number;
  quantity: number;
  color?: string;
}

// Customer information type
export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
}

// Complete order type (for display)
export interface Order {
  id: number;
  product: string;
  quantity: number;
  color?: string;
  created_at: string;
  customer?: CustomerInfo;
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