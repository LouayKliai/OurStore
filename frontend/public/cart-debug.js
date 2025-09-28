// Utility functions to debug and fix cart issues
// Run these in your browser console

// Check what's in localStorage cart
function debugCart() {
  const cart = localStorage.getItem('cart');
  console.log('Cart data in localStorage:', cart);
  if (cart) {
    const parsedCart = JSON.parse(cart);
    console.log('Parsed cart:', parsedCart);
    console.log('Total items:', parsedCart.reduce((count, item) => count + item.quantity, 0));
  }
}

// Clear the cart completely
function clearCartStorage() {
  localStorage.removeItem('cart');
  console.log('Cart cleared from localStorage');
  // Refresh the page to see changes
  window.location.reload();
}

// Add some test items to see if cart is working
function addTestItem() {
  const testItem = {
    id: 999,
    name: "Test Product",
    price: "10.00",
    color: "red",
    quantity: 1,
    image: "/test.jpg"
  };
  
  const cart = localStorage.getItem('cart');
  const currentCart = cart ? JSON.parse(cart) : [];
  currentCart.push(testItem);
  localStorage.setItem('cart', JSON.stringify(currentCart));
  console.log('Test item added');
  window.location.reload();
}

// Export for console use
window.debugCart = debugCart;
window.clearCartStorage = clearCartStorage;
window.addTestItem = addTestItem;

console.log('Cart debug utilities loaded. Available functions:');
console.log('- debugCart() - Check cart contents');
console.log('- clearCartStorage() - Clear cart and reload');
console.log('- addTestItem() - Add a test item');