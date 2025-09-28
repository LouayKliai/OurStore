import { Product } from './types';

// Static product data - will be replaced with API calls later
export const staticProducts: Product[] = [
  // TECH CATEGORY
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: "59.99",
    original_price: "79.99",
    stock: 15,
    color_options: ["Black", "White", "Blue", "Red"],
    size_options: ["Small", "Medium", "Large"],
    category: 'tech',
    is_bestseller: true
  },
  {
    id: 2,
    name: "Smartphone Case - Premium",
    price: "19.99",
    original_price: "24.99",
    stock: 32,
    color_options: ["White", "Black", "Blue", "Pink"],
    size_options: ["iPhone 14", "iPhone 15", "Samsung S24"],
    category: 'tech'
  },
  {
    id: 3,
    name: "USB-C Fast Charger",
    price: "19.99",
    stock: 28,
    color_options: ["White", "Black"],
    category: 'tech',
    is_bestseller: true
  },
  {
    id: 4,
    name: "Portable Power Bank",
    price: "45.99",
    stock: 12,
    color_options: ["Black", "Silver", "Blue"],
    category: 'tech'
  },
  {
    id: 5,
    name: "Wireless Gaming Mouse",
    price: "59.99",
    stock: 8,
    color_options: ["Black", "White", "Purple"],
    category: 'tech'
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: "89.99",
    original_price: "119.99",
    stock: 20,
    color_options: ["Black", "Blue", "Red", "Green"],
    category: 'tech',
    is_bestseller: true
  },
  {
    id: 7,
    name: "Laptop Stand - Adjustable",
    price: "29.99",
    original_price: "34.99",
    stock: 18,
    color_options: ["Silver", "Black", "White"],
    size_options: ["13-inch", "15-inch", "17-inch"],
    category: 'tech'
  },
  {
    id: 8,
    name: "Wireless Charging Pad",
    price: "29.99",
    original_price: "39.99",
    stock: 25,
    color_options: ["Black", "White", "Blue"],
    category: 'tech'
  },
  {
    id: 9,
    name: "Premium Keyboard - Mechanical",
    price: "129.99",
    stock: 6,
    color_options: ["Black", "White", "Red"],
    category: 'tech'
  },
  {
    id: 10,
    name: "HD Webcam",
    price: "69.99",
    stock: 14,
    color_options: ["Black", "White"],
    category: 'tech'
  },
  {
    id: 11,
    name: "Noise Cancelling Earbuds",
    price: "99.99",
    stock: 22,
    color_options: ["Black", "White", "Gray", "Blue"],
    category: 'tech'
  },
  {
    id: 12,
    name: "Smart Watch Band",
    price: "18.99",
    stock: 35,
    color_options: ["Black", "Brown", "Pink", "Blue", "Red"],
    category: 'tech'
  },

  // CLOTHES CATEGORY
  {
    id: 13,
    name: "Premium Cotton T-Shirt",
    price: "29.99",
    original_price: "39.99",
    stock: 45,
    color_options: ["White", "Black", "Navy", "Gray", "Red"],
    size_options: ["XS", "S", "M", "L", "XL", "XXL"],
    category: 'clothes',
    is_bestseller: true
  },
  {
    id: 14,
    name: "Classic Denim Jeans",
    price: "79.99",
    original_price: "99.99",
    stock: 28,
    color_options: ["Blue", "Black", "Light Blue", "Dark Blue"],
    size_options: ["28", "30", "32", "34", "36", "38", "40"],
    category: 'clothes',
    is_bestseller: true
  },
  {
    id: 15,
    name: "Elegant Dress Shirt",
    price: "49.99",
    original_price: "64.99",
    stock: 20,
    color_options: ["White", "Blue", "Light Blue", "Pink", "Gray"],
    size_options: ["S", "M", "L", "XL", "XXL"],
    category: 'clothes'
  },
  {
    id: 16,
    name: "Casual Hoodie",
    price: "59.99",
    original_price: "69.99",
    stock: 35,
    color_options: ["Black", "Gray", "Navy", "Green", "Red"],
    size_options: ["S", "M", "L", "XL", "XXL"],
    category: 'clothes'
  },
  {
    id: 17,
    name: "Athletic Sneakers",
    price: "89.99",
    stock: 24,
    color_options: ["White", "Black", "Red", "Blue", "Green"],
    size_options: ["38", "39", "40", "41", "42", "43", "44", "45"],
    category: 'clothes',
    is_bestseller: true
  },
  {
    id: 18,
    name: "Summer Dress",
    price: "69.99",
    original_price: "89.99",
    stock: 18,
    color_options: ["Floral", "Blue", "Red", "Black", "White"],
    size_options: ["XS", "S", "M", "L", "XL"],
    category: 'clothes'
  },
  {
    id: 19,
    name: "Leather Jacket",
    price: "199.99",
    original_price: "249.99",
    stock: 8,
    color_options: ["Black", "Brown", "Tan"],
    size_options: ["S", "M", "L", "XL"],
    category: 'clothes'
  },
  {
    id: 20,
    name: "Yoga Pants",
    price: "39.99",
    stock: 40,
    color_options: ["Black", "Gray", "Navy", "Purple", "Pink"],
    size_options: ["XS", "S", "M", "L", "XL"],
    category: 'clothes'
  },

  // BEAUTY CATEGORY
  {
    id: 21,
    name: "Luxury Face Moisturizer",
    price: "49.99",
    original_price: "59.99",
    stock: 30,
    color_options: ["Natural"],
    category: 'beauty',
    is_bestseller: true
  },
  {
    id: 22,
    name: "Premium Perfume - Rose Garden",
    price: "89.99",
    original_price: "119.99",
    stock: 15,
    color_options: ["Rose", "Vanilla", "Citrus"],
    size_options: ["30ml", "50ml", "100ml"],
    category: 'beauty',
    is_bestseller: true
  },
  {
    id: 23,
    name: "Anti-Aging Serum",
    price: "79.99",
    stock: 22,
    color_options: ["Clear"],
    size_options: ["15ml", "30ml"],
    category: 'beauty'
  },
  {
    id: 24,
    name: "Organic Lip Balm Set",
    price: "19.99",
    original_price: "24.99",
    stock: 50,
    color_options: ["Cherry", "Vanilla", "Mint", "Coconut"],
    category: 'beauty'
  },
  {
    id: 25,
    name: "Professional Makeup Brush Set",
    price: "69.99",
    stock: 18,
    color_options: ["Rose Gold", "Silver", "Black"],
    category: 'beauty'
  },
  {
    id: 26,
    name: "Vitamin C Face Mask",
    price: "29.99",
    stock: 35,
    color_options: ["Orange"],
    category: 'beauty',
    is_bestseller: true
  },
  {
    id: 27,
    name: "Cologne - Fresh Ocean",
    price: "59.99",
    original_price: "79.99",
    stock: 20,
    color_options: ["Ocean", "Forest", "Citrus"],
    size_options: ["30ml", "50ml", "100ml"],
    category: 'beauty'
  },
  {
    id: 28,
    name: "Hydrating Body Lotion",
    price: "24.99",
    stock: 40,
    color_options: ["Lavender", "Vanilla", "Unscented"],
    size_options: ["250ml", "500ml"],
    category: 'beauty'
  }
];

// Function to simulate API delay (can be removed later)
export const getStaticProducts = async (): Promise<Product[]> => {
  // Minimal delay for smooth UX
  await new Promise(resolve => setTimeout(resolve, 100));
  return staticProducts;
};

// Get single product by ID
export const getStaticProductById = async (id: number): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  return staticProducts.find(product => product.id === id) || null;
};

// Get products by category
export const getProductsByCategory = async (category: 'clothes' | 'tech' | 'beauty'): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return staticProducts.filter(product => product.category === category);
};

// Get bestseller products only
export const getBestsellerProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return staticProducts.filter(product => product.is_bestseller === true);
};

// Get featured products for home page (bestsellers + some from each category)
export const getFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const bestsellers = staticProducts.filter(product => product.is_bestseller === true);
  return bestsellers;
};

// Product categories info
export const productCategories = [
  {
    id: 'clothes',
    name: 'clothes',
    description: 'clothes_description',
    icon: 'clothes',
    color: 'from-accent-500 to-accent-600'
  },
  {
    id: 'tech',
    name: 'technology',
    description: 'tech_description',
    icon: 'tech',
    color: 'from-primary-500 to-primary-600'
  },
  {
    id: 'beauty',
    name: 'beauty_perfumes',
    description: 'beauty_perfumes_description',
    icon: 'beauty',
    color: 'from-primary-500 to-primary-600 '
  }
];