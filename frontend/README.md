# OurStore Frontend

A modern Next.js e-commerce frontend built with React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog**: Browse and view product details
- 🛒 **Shopping Cart**: Add/remove items with local storage persistence
- 📦 **Checkout Process**: Customer information form for order placement
- 👤 **No User Accounts**: Orders saved in localStorage for simplicity
- 🔧 **Admin Dashboard**: View and manage orders
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Fast**: Built with Next.js 14 and optimized for performance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + localStorage
- **UI Components**: Custom components with Tailwind

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (Flask app)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.local` and update the API URL if needed
   - Default: `NEXT_PUBLIC_API_URL=http://localhost:5000`

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## Backend Integration

The frontend expects the following API endpoints from your Flask backend:

- `GET /products` - Get all products
- `POST /orders` - Create a new order
- `GET /orders` - Get all orders (for admin)

## Key Features

### 1. Local Storage Cart
- Cart items persist between browser sessions
- No user authentication required
- Items stored with product details and selected options

### 2. Order Flow
1. Customer browses products
2. Adds items to cart (stored locally)
3. Proceeds to checkout
4. Fills contact information (name, phone, address)
5. Order submitted to backend
6. Customer receives order confirmation
7. Admin can view order in dashboard

### 3. Admin Dashboard
- View all orders from backend
- Contact information display
- Order status management

## Important Note

The current Flask backend's Order model doesn't include customer information (name, address, phone). To fully utilize the frontend features, consider updating the backend Order model to include customer details.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
