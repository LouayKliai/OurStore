import { CartItem, LocalOrder } from './types';

// Cart management in localStorage
export const cartStorage = {
  getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },

  setCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  addItem(item: CartItem): void {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(
      cartItem => cartItem.id === item.id && cartItem.color === item.color
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    this.setCart(cart);
  },

  removeItem(id: number, color?: string): void {
    const cart = this.getCart();
    const updatedCart = cart.filter(
      item => !(item.id === id && item.color === color)
    );
    this.setCart(updatedCart);
  },

  updateQuantity(id: number, quantity: number, color?: string): void {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(
      item => item.id === id && item.color === color
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeItem(id, color);
      } else {
        cart[itemIndex].quantity = quantity;
        this.setCart(cart);
      }
    }
  },

  clearCart(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('cart');
  },

  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
  },

  getCartItemsCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
};

// Order history management
export const orderStorage = {
  getOrders(): LocalOrder[] {
    if (typeof window === 'undefined') return [];
    const orders = localStorage.getItem('userOrders');
    return orders ? JSON.parse(orders) : [];
  },

  addOrder(order: LocalOrder): void {
    if (typeof window === 'undefined') return;
    const orders = this.getOrders();
    orders.unshift(order); // Add to beginning
    localStorage.setItem('userOrders', JSON.stringify(orders));
  },

  updateOrderStatus(orderId: string, status: LocalOrder['status']): void {
    if (typeof window === 'undefined') return;
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex > -1) {
      orders[orderIndex].status = status;
      localStorage.setItem('userOrders', JSON.stringify(orders));
    }
  },

  clearOrders(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('userOrders');
  }
};

// Generic localStorage utility
export function useLocalStorage<T>(key: string, initialValue: T) {
  const getValue = (): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const setValue = (value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [getValue, setValue] as const;
}