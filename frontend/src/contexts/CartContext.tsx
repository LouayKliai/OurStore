'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/lib/types';
import { cartStorage } from '@/lib/localStorage';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, color?: string) => void;
  updateQuantity: (id: number, quantity: number, color?: string) => void;
  clearCart: () => void;
  total: number;
  itemsCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const cartItems = cartStorage.getCart();
    console.log('CartContext: Loading cart from localStorage:', cartItems);
    setItems(cartItems);
    setIsLoading(false);
  }, []);

  // Update localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      cartStorage.setCart(items);
    }
  }, [items, isLoading]);

  const addItem = (item: CartItem) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        cartItem => cartItem.id === item.id && cartItem.color === item.color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        return [...currentItems, item];
      }
    });
  };

  const removeItem = (id: number, color?: string) => {
    setItems(currentItems =>
      currentItems.filter(item => !(item.id === id && item.color === color))
    );
  };

  const updateQuantity = (id: number, quantity: number, color?: string) => {
    if (quantity <= 0) {
      removeItem(id, color);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    cartStorage.clearCart();
  };

  const total = items.reduce((sum, item) => {
    return sum + (parseFloat(item.price) * item.quantity);
  }, 0);

  const itemsCount = items.reduce((count, item) => count + item.quantity, 0);
  
  // Debug logging
  useEffect(() => {
    console.log('CartContext: Items changed:', items);
    console.log('CartContext: Items count:', itemsCount);
  }, [items, itemsCount]);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemsCount,
    isLoading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}