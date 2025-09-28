# Next.js E-commerce Frontend Structure

## Project Structure
```
frontend/
├── public/
│   ├── images/
│   │   └── products/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home page with products
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Product detail page
│   │   ├── cart/
│   │   │   └── page.tsx                # Cart page
│   │   ├── checkout/
│   │   │   └── page.tsx                # Checkout form
│   │   ├── success/
│   │   │   └── page.tsx                # Order success page
│   │   └── admin/
│   │       ├── page.tsx                # Admin dashboard
│   │       ├── orders/
│   │       │   └── page.tsx            # Orders management
│   │       └── products/
│   │           └── page.tsx            # Products management
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── ColorSelector.tsx
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartDrawer.tsx
│   │   ├── forms/
│   │   │   ├── CheckoutForm.tsx
│   │   │   └── ContactForm.tsx
│   │   └── admin/
│   │       ├── OrdersList.tsx
│   │       ├── OrderDetail.tsx
│   │       ├── ProductsList.tsx
│   │       └── Dashboard.tsx
│   ├── lib/
│   │   ├── api.ts                      # API calls to Flask backend
│   │   ├── localStorage.ts             # Local storage utilities
│   │   ├── types.ts                    # TypeScript types
│   │   └── utils.ts                    # Utility functions
│   ├── hooks/
│   │   ├── useCart.ts                  # Cart management hook
│   │   ├── useProducts.ts              # Products data hook
│   │   └── useLocalStorage.ts          # Local storage hook
│   └── contexts/
│       └── CartContext.tsx             # Cart state context
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Key Features Implementation

### 1. Product Display
- **ProductGrid**: Display all products from `/products` API
- **ProductCard**: Individual product with image, name, price, stock
- **ProductDetail**: Detailed view with color options and quantity selector

### 2. Shopping Cart (LocalStorage)
- **CartContext**: Global cart state management
- **useCart**: Custom hook for cart operations (add, remove, update quantity)
- **CartDrawer**: Slide-out cart summary
- **LocalStorage**: Persist cart items between sessions

### 3. Checkout Process
- **CheckoutForm**: Customer info (name, address, phone)
- **OrderSummary**: Cart items + total
- **Order Submission**: Send to backend + save to localStorage for user reference

### 4. Admin Dashboard
- **Orders Management**: View all orders from `/orders` API
- **Order Details**: Customer info + order items
- **Products Management**: View products, update stock (if needed)

### 5. Data Flow
```
Customer Flow:
Browse Products → Add to Cart (localStorage) → Checkout Form → Order Submission → Success Page

Admin Flow:
Dashboard → Orders List → Order Details → Contact Customer
```

## Technology Stack

### Core
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** for styling

### State Management
- **React Context** for cart state
- **localStorage** for persistence
- **SWR or TanStack Query** for server state

### UI Components
- **Headless UI** or **Radix UI** for components
- **React Hook Form** for forms
- **Framer Motion** for animations (optional)

## API Integration Points

Your current backend provides:
- `GET /products` - Get all products
- `POST /orders` - Create order
- `GET /orders` - Get all orders (admin)

**Note**: You might need to update the Order model to include customer info (name, address, phone) for the complete flow.