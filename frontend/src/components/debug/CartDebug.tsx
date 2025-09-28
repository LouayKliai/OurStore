'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';

export function CartDebug() {
  const { items, itemsCount, total, clearCart } = useCart();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border-2 border-red-200 max-w-sm z-50">
      <h3 className="font-bold text-red-600 mb-2">Cart Debug Info</h3>
      <div className="space-y-1 text-sm">
        <p><strong>Items Count:</strong> {itemsCount}</p>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        <p><strong>Items in Cart:</strong></p>
        <div className="max-h-32 overflow-y-auto bg-gray-50 p-2 rounded">
          {items.length === 0 ? (
            <p className="text-gray-500">No items</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="text-xs">
                {item.name} ({item.color}) - Qty: {item.quantity} - ${item.price}
              </div>
            ))
          )}
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full mt-2 text-red-600 border-red-300 hover:bg-red-50"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
}