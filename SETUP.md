# SETUP INSTRUCTIONS

## For Windows Users

### 1. Open Terminal
Open PowerShell or Command Prompt and navigate to the project:
```powershell
cd "C:\Users\Mohsin-pc\Desktop\Asigmnet\Assignment 2\auth and protected routes"
```

### 2. Backend Setup

#### Terminal 1 - Backend Server
```powershell
cd backend
npm install
npm start
```

Wait for message: `Server running on http://localhost:5000`

#### Update Backend .env (if needed)
Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup

#### Terminal 2 - Frontend Server (Keep Terminal 1 open)
```powershell
cd frontend
npm install
npm run dev
```

Wait for message showing: `Local: http://localhost:3000`

### 4. Access Application
Open browser: **http://localhost:3000**

---

## What You'll See

### Register Page (`/register`)
- Form with: Name, Email, Password fields
- Button to go to login page

### Login Page (`/login`)
- Form with: Email, Password fields
- Button to go to register page

### Products Page (`/products`) - PROTECTED
- Header with welcome message and logout button
- "+ Add Product" button
- Grid of product cards with Edit/Delete buttons
- Each card shows: Name, Description, Price, Stock, Category

### Add Product Page (`/add-product`) - PROTECTED
- Form to create new product
- Fields: Name, Description, Price, Stock, Category

### Edit Product Page (`/edit-product/:id`) - PROTECTED
- Pre-filled form with product data
- Update button

---

## How Authentication Works

### Token Flow
```
User enters credentials
        ↓
Backend validates & creates JWT token
        ↓
Frontend receives token
        ↓
Token saved to localStorage
        ↓
Token sent in every API request header
        ↓
Backend validates token on each request
```

### Protected Route Logic
```
User accesses /products
        ↓
AuthContext checks for token
        ↓
Token exists? → Show page
Token missing? → Redirect to /login
```

---

## API Calls Explained

### Registration
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```javascript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
// Returns: { token: "...", user: {...} }
```

### Create Product (with token)
```javascript
POST /api/products
Headers: Authorization: Bearer <token>
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 1299.99,
  "stock": 5,
  "category": "Electronics"
}
```

---

## Frontend Code Overview

### AuthContext (`src/context/AuthContext.jsx`)
- Manages: user state, token, login/logout functions
- Persists token to localStorage
- Provides auth data to entire app

### ProtectedRoute (`src/components/ProtectedRoute.jsx`)
- Checks if token exists
- If no token → redirects to /login
- If token exists → allows access

### API Service (`src/services/api.js`)
- All API functions in one place
- Automatically includes token in headers
- Handles error responses

### Pages
- `Login.jsx` - Login form
- `Register.jsx` - Registration form
- `Products.jsx` - Display products + logout
- `AddProduct.jsx` - Create new product
- `EditProduct.jsx` - Update product

---

## Database Setup

### Option 1: Local MongoDB

Install MongoDB:
https://www.mongodb.com/try/download/community

Start MongoDB:
```
mongod
```

### Option 2: MongoDB Atlas (Cloud - Recommended)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Replace in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auth_db
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to database" | Start MongoDB or check Atlas connection string |
| "Port 5000 already in use" | Change PORT in .env or kill process using port |
| "Token not saving" | Check browser localStorage is enabled |
| "API requests failing" | Ensure backend running on http://localhost:5000 |
| "Redirect loop to /login" | Check browser console for errors |
| "npm ERR!" | Delete node_modules and package-lock.json, then npm install |

---

## Testing Checklist

- [ ] Backend server starts successfully
- [ ] Frontend server starts successfully
- [ ] Can access http://localhost:3000
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can see products page after login
- [ ] Can add new product
- [ ] Can edit existing product
- [ ] Can delete product
- [ ] Can logout
- [ ] Accessing /products without login redirects to /login
- [ ] Refresh page keeps you logged in
- [ ] Can login with multiple different users

---

## Environment Variables

### Backend `.env`
```env
# Database
MONGODB_URI=mongodb://localhost:27017/auth_db

# JWT Secret (change in production!)
JWT_SECRET=your_jwt_secret_key_change_this_in_production

# Server
PORT=5000
NODE_ENV=development
```

### Frontend (No .env needed)
Frontend connects to backend via proxy in `vite.config.js`

---

## Security Notes

✅ What's Implemented:
- Password hashing (bcryptjs)
- JWT tokens
- Protected routes
- Bearer token validation

⚠️ What to add for Production:
- Change JWT_SECRET to strong random string
- Use HTTPS instead of HTTP
- Add refresh tokens
- Implement rate limiting
- Add CORS restrictions
- Setup monitoring/logging

---

## Deployment Options

### Frontend (Choose one)
- **Vercel**: `npm install -g vercel` then `vercel`
- **Netlify**: Drag & drop `build` folder
- **GitHub Pages**: Set up workflow

### Backend (Choose one)
- **Heroku**: `heroku create` and `git push heroku main`
- **Railway**: Connect GitHub repo
- **AWS**: Deploy to EC2 or Elastic Beanstalk
- **DigitalOcean**: Create droplet and deploy

---

## File Descriptions

### Backend Files

| File | Purpose |
|------|---------|
| `app.js` | Main server file, routes setup |
| `src/config/db.js` | MongoDB connection |
| `src/models/User.js` | User schema & password hashing |
| `src/models/Product.js` | Product schema |
| `src/controllers/authController.js` | Register, Login, GetMe logic |
| `src/controllers/productController.js` | CRUD operations logic |
| `src/middlewares/authMiddleware.js` | JWT verification |
| `src/routes/authRoutes.js` | Auth endpoints |
| `src/routes/productRoutes.js` | Product endpoints |
| `src/utils/generateToken.js` | JWT token generation |

### Frontend Files

| File | Purpose |
|------|---------|
| `src/main.jsx` | React app entry point |
| `src/App.jsx` | Main app + router |
| `src/context/AuthContext.jsx` | Auth state management |
| `src/services/api.js` | API calls |
| `src/components/ProtectedRoute.jsx` | Protected routes component |
| `src/pages/Login.jsx` | Login page |
| `src/pages/Register.jsx` | Register page |
| `src/pages/Products.jsx` | Products list page |
| `src/pages/AddProduct.jsx` | Create product page |
| `src/pages/EditProduct.jsx` | Edit product page |

---

## Architecture Diagram

```
Browser
   │
   ├─→ Register Form
   ├─→ Login Form
   └─→ Protected Pages
        ├─ Products List
        ├─ Add Product
        └─ Edit Product
          ↓
   AuthContext (State)
   ├─ token (localStorage)
   ├─ user
   ├─ login()
   ├─ logout()
   └─ register()
          ↓
   API Service
   ├─ authAPI.login()
   ├─ authAPI.register()
   └─ productAPI.*
          ↓
   Backend (Express)
   ├─ /api/auth/login
   ├─ /api/auth/register
   ├─ /api/auth/me
   ├─ /api/products GET
   ├─ /api/products POST
   ├─ /api/products/:id PUT
   └─ /api/products/:id DELETE
          ↓
   Database (MongoDB)
   ├─ Users Collection
   └─ Products Collection
```

---

## Success! 🎉

You now have a complete full-stack authentication system with:
- ✅ User registration & login
- ✅ Protected routes
- ✅ JWT token management
- ✅ Product CRUD operations
- ✅ Secure password hashing
- ✅ Token persistence
- ✅ Responsive UI

Ready to deploy or customize further!
