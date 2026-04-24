# Flipkart Frontend

A modern e-commerce frontend built with Vue 3, Vite, and Tailwind CSS, integrated with ERPNext backend.

## Features

- **Authentication**: Login/Logout with ERPNext backend
- **Product Listing**: Browse products with filters and sorting
- **Shopping Cart**: Add/remove items and manage quantities
- **Checkout**: Complete order process with delivery address and payment options
- **Order Management**: View order history and order details
- **Responsive Design**: Flipkart-like UI with Tailwind CSS

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── pages/          # Vue components for each page
│   │   ├── Home.vue           (Public - No login needed)
│   │   ├── Login.vue          (Public - No login needed)
│   │   ├── Shop.vue           (Public - No login needed)
│   │   ├── ProductDetail.vue  (Public - No login needed)
│   │   ├── Cart.vue           (Auth required)
│   │   ├── Checkout.vue       (Auth required)
│   │   ├── Orders.vue         (Auth required)
│   │   ├── OrderDetail.vue    (Auth required)
│   │   └── InvalidPage.vue    (Public - 404 page)
│   ├── stores/         # Pinia stores
│   │   ├── session.js  # User authentication
│   │   └── products.js # Product and cart management
│   ├── App.vue         # Main app component
│   ├── main.js         # App entry point
│   ├── index.css       # Global styles
│   └── router.js       # Vue Router with auth guards
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Authentication & Page Access

### Public Pages (No Login Required)
- **Home** (`/`) - Landing page with featured products
- **Login** (`/login`) - User login page
- **Shop** (`/shop`) - Product listing page
- **Product Detail** (`/product/:productId`) - Individual product page
- **404 Page** (`/:invalidpath`) - Invalid page handler

### Protected Pages (Login Required)
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Order checkout
- **Orders** (`/orders`) - User's order history
- **Order Detail** (`/order/:orderId`) - Individual order details

## Authentication Flow

1. **User Visits App**
   - If not logged in and tries to access protected pages → redirects to `/login?redirect-to=/flipkart`
   - If logged in, can access all pages normally

2. **Login Process**
   - User enters credentials (email/password)
   - Credentials sent to ERPNext backend (`/login` endpoint)
   - On success: Session is created, user redirected to home
   - On failure: Error message shown

3. **Logout Process**
   - User clicks logout button
   - Session is cleared via ERPNext backend (`/logout` endpoint)
   - User redirected to login page with redirect-to parameter

## Router Guards

The router includes `beforeEach` guard that:
- Checks if user is logged in
- Requires authentication for protected pages (`meta: { requiresAuth: true }`)
- Redirects unauthenticated users to login page
- Loads products from backend on each navigation

## Setup Instructions

### Installation

```bash
cd apps/flipkart/frontend
npm install
```

### Development

```bash
npm run dev
```

Server will run on `http://localhost:5173`

### Build

```bash
npm run build
```

This builds the app and copies the HTML entry point to the Frappe app.

## Integration with ERPNext

### Backend Endpoints Used

1. **Login**
   - Endpoint: `/login`
   - Method: POST
   - Params: `usr` (email), `pwd` (password)

2. **Logout**
   - Endpoint: `/logout`
   - Method: POST

3. **Get Products**
   - Endpoint: `/api/resource/Product`
   - Method: GET
   - Returns: List of products

4. **Session Check**
   - Uses cookies (`user_id`) to check login status

### CORS Configuration

Update your ARPNext site config to allow the frontend origin:

```python
# common_site_config.json
{
  "cors_allowed_origins": ["http://localhost:5173", "https://your-domain.com"]
}
```

## Features Detail

### Session Store (`stores/session.js`)
- Manages user login/logout
- Stores authentication state
- Handles redirect after login
- Reads session from cookies

### Product Store (`stores/products.js`)
- Manages product list
- Manages shopping cart
- Cart operations: add, remove, update quantity
- Stores cart in component state (can be persisted to localStorage/backend)

### Router (`router.js`)
- Defines all routes with meta information
- Implements auth guards
- Handles redirects for unauthenticated users
- Loads products on app initialization

## Styling

- **Framework**: Tailwind CSS
- **Colors**: 
  - Blue (Flipkart): `#2874f0`
  - Orange (Button): `#ff9f1a`
  - Dark: `#212121`
  - Light: `#f5f5f5`

## Future Enhancements

- [ ] Product search and filters
- [ ] User profile management
- [ ] Payment gateway integration
- [ ] Order tracking in real-time
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Local storage for cart persistence
- [ ] PWA support (already configured)

## Support

For issues or questions, contact the development team.
