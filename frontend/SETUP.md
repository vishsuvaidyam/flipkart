# Flipkart Frontend - Quick Start Guide

## Page Access Rules Summary

| Page | URL | Login Required? | Description |
|------|-----|-----------------|-------------|
| Home | `/` | ❌ No | Landing page - visible to everyone |
| Login | `/login` | ❌ No | Login page - accessible without login |
| Shop | `/shop` | ❌ No | Browse products - visible to everyone |
| Product Detail | `/product/:id` | ❌ No | View single product - visible to everyone |
| Cart | `/cart` | ✅ **YES** | Shopping cart - login required |
| Checkout | `/checkout` | ✅ **YES** | Order checkout - login required |
| Orders | `/orders` | ✅ **YES** | Order history - login required |
| Order Detail | `/order/:id` | ✅ **YES** | Single order - login required |

## Complete Setup Steps

### 1. Setup Frontend Dependencies
```bash
cd /home/vishwa/frappe_docker/development/erpnext/apps/flipkart/frontend
npm install
```

### 2. Configure ERPNext Backend
Add to your ERPNext site config (`/home/vishwa/frappe_docker/development/erpnext/sites/flip.localhost/site_config.json`):

```json
{
  "cors_allowed_origins": ["http://localhost:5173", "http://localhost:8080"],
  "use_ssl": false
}
```

### 3. Create Product DocType (if not exists)
In ERPNext, create a DocType called "Product" with fields:
- name (ID)
- title (Data)
- description (Text)
- price (Float)
- stock (Int)
- image (Attach)

### 4. Create Test Data
Create some test products in ERPNext:
- Name: PROD001, Title: "Wireless Headphones", Price: 299, Stock: 100
- Name: PROD002, Title: "USB Cable", Price: 99, Stock: 500
- Name: PROD003, Title: "Phone Case", Price: 199, Stock: 200

### 5. Verify User Credentials
Ensure login credentials work:
- Go to ERPNext User doctype
- Verify user "admin" or create test user with email and password

### 6. Start Development Server
```bash
npm run dev
```
App will run at: `http://localhost:5173/flipkart`

### 7. Test Authentication Flow
1. Visit `http://localhost:5173/flipkart` → see **Home page** (no login needed)
2. Click "Browse Products" → see **Shop page** (no login needed)
3. Click "Add to Cart" → redirects to **Login page** (login required)
4. Enter credentials → login and redirect to **Home**
5. Now "Add to Cart" works → visit **Cart page**
6. Click "Checkout" → enter delivery/payment details
7. "Place Order" → redirected to **Orders page** (login required)
8. Click logout → redirected to login page

## Authentication Implementation Details

### Login Flow
```
User → Login Page → Enter Credentials → ERPNext /login endpoint 
→ Session Cookie Created → User Redirected to Home
```

### Protected Page Access
```
Unauthenticated User → Tries /cart → Router Guard Checks → 
No Session → Redirect /login?redirect-to=/flipkart
```

### Session Storage
- Uses browser cookies (set by ERPNext via `Set-Cookie` header)
- Session user ID stored in `user_id` cookie
- Guest users have value "Guest" in `user_id` cookie

## Frontend Architecture

### `stores/session.js`
```javascript
- isLoggedIn: computed - checks if user_id cookie exists
- login: createResource - handles POST to /login
- logout: createResource - handles POST to /logout
- user: ref - stores current user
```

### `router.js`
```javascript
- beforeEach guard: checks isLoggedIn before each route
- meta: { requiresAuth: true } on protected pages
- Redirects to /login with redirect-to parameter
```

### Public vs Protected Pages
- **Public**: No `requiresAuth` meta or `requiresAuth: false`
- **Protected**: `meta: { requiresAuth: true }`

## Troubleshooting

### "Invalid Email or Password" on Login
- Verify user exists in ERPNext
- Check password is correct
- Check ERPNext is running and accessible

### Pages show but "Add to Cart" doesn't work
- Check if you're logged in (check browser cookies)
- Verify session store is initialized properly

### Products not loading
- Verify ERPNext has Product doctype
- Check if CORS is configured
- Verify /api/resource/Product endpoint is accessible

### CORS Errors
- Add frontend URL to cors_allowed_origins in site config
- Restart ERPNext server
- Check browser console for exact error

## Environment Variables

Create `.env.local` if needed:
```
VITE_API_URL=http://localhost:8000
```

## Build for Production

```bash
npm run build
```

Output: `../flipkart/public/frontend/` and generates `../flipkart/www/flipkart.html`

## More Information

See [README.md](./README.md) for detailed documentation.
