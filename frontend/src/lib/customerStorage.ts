import { CustomerInfo } from './types';

const CUSTOMER_INFO_KEY = 'ourstore_customer_info';

export const customerStorage = {
  // Save customer info to localStorage
  saveCustomerInfo: (customerInfo: CustomerInfo): void => {
    try {
      localStorage.setItem(CUSTOMER_INFO_KEY, JSON.stringify(customerInfo));
    } catch (error) {
      console.error('Failed to save customer info:', error);
    }
  },

  // Get saved customer info from localStorage
  getCustomerInfo: (): CustomerInfo | null => {
    try {
      const stored = localStorage.getItem(CUSTOMER_INFO_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Failed to load customer info:', error);
      return null;
    }
  },

  // Clear saved customer info
  clearCustomerInfo: (): void => {
    try {
      localStorage.removeItem(CUSTOMER_INFO_KEY);
    } catch (error) {
      console.error('Failed to clear customer info:', error);
    }
  },

  // Check if customer info exists
  hasCustomerInfo: (): boolean => {
    try {
      const stored = localStorage.getItem(CUSTOMER_INFO_KEY);
      return stored !== null && stored !== '';
    } catch (error) {
      console.error('Failed to check customer info:', error);
      return false;
    }
  }
};