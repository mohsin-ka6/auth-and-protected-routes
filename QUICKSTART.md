# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB running (or MongoDB Atlas account)

## Step 1: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
# Default: mongodb://localhost:27017/auth_db
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update MONGODB_URI in backend/.env

## Step 2: Start Backend Server

```bash
cd backend
npm install  # (if not already done)
npm start
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

## Step 3: Start Frontend Server (New Terminal)

```bash
cd frontend
npm install  # (if not already done)
npm run dev
```

You should see:
```
Local: http://localhost:3000
```

## Step 4: Test the Application

### 4.1 Register New User
1. Open http://localhost:3000
2. Click "Register here"
3. Fill in:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
4. Click "Register"
5. You'll be redirected to login

### 4.2 Login
1. Fill in:
   - Email: john@example.com
   - Password: password123
2. Click "Login"
3. You'll see the Products page

### 4.3 Add Product
1. Click "+ Add Product"
2. Fill in:
   - Name: Laptop
   - Description: High-performance laptop
   - Price: 1299.99
   - Stock: 5
   - Category: Electronics
3. Click "Add Product"
4. Product appears in list

### 4.4 Edit Product
1. Click "Edit" on a product
2. Change any field
3. Click "Update Product"
4. Changes appear instantly

### 4.5 Delete Product
1. Click "Delete" on a product
2. Confirm deletion
3. Product is removed from list

### 4.6 Logout
1. Click "Logout"
2. You're redirected to login
3. Try accessing /products without login → redirected to /login ✓

## Common Issues

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Or update MONGODB_URI with Atlas connection string

### "Port 5000 already in use"
- Change PORT in backend/.env
- Update proxy in frontend/vite.config.js

### "API not responding"
- Ensure backend is running on http://localhost:5000
- Check browser DevTools → Network tab
- Verify Authorization header is sent

### "Token not saving"
- Check localStorage in DevTools → Application
- Should see: `localStorage.getItem('token')`

## File Structure Created

```
✓ Backend (Node.js + Express + MongoDB)
  ✓ Authentication (Register, Login)
  ✓ Product CRUD APIs
  ✓ JWT Token Generation
  ✓ Password Hashing

✓ Frontend (React + Vite)
  ✓ Register Page
  ✓ Login Page
  ✓ Products Page (Protected)
  ✓ Add Product Page (Protected)
  ✓ Edit Product Page (Protected)
  ✓ AuthContext for state management
  ✓ ProtectedRoute component
  ✓ API service

✓ Security
  ✓ Protected Routes
  ✓ JWT Authentication
  ✓ Bearer Token in Headers
  ✓ Password Hashing
```

## Test Scenarios

### Scenario 1: New User Registration
```
Register → Login → Add Product → View Products → Logout
Expected: All steps complete successfully
```

### Scenario 2: Protected Routes
```
Access /products without login
Expected: Redirected to /login
```

### Scenario 3: Token Persistence
```
Login → Refresh page → Still logged in
Expected: Token persists from localStorage
```

### Scenario 4: CRUD Operations
```
Add Product → Edit Product → Delete Product
Expected: All operations work with authentication
```

## Next Steps

1. **Test with Multiple Users**
   - Register user 2
   - Login as user 2
   - Each user sees only their products

2. **Deploy to Production**
   - Frontend: Vercel or Netlify
   - Backend: Heroku, Railway, or AWS

3. **Enhance Security**
   - Add refresh tokens
   - Implement rate limiting
   - Add email verification

4. **Add Features**
   - Product search/filter
   - User profile page
   - Product comments/reviews
   - Order management

## API Endpoints Reference

### Auth
- POST `/api/auth/register` → Register user
- POST `/api/auth/login` → Login user
- GET `/api/auth/me` → Get current user

### Products (All require token)
- GET `/api/products` → Get all products
- GET `/api/products/:id` → Get single product
- POST `/api/products` → Create product
- PUT `/api/products/:id` → Update product
- DELETE `/api/products/:id` → Delete product

## Debugging Tips

1. **Check Backend Logs**
   - Look at terminal where `npm start` is running
   - Check for connection errors

2. **Check Frontend Console**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for API calls

3. **Check MongoDB**
   - Use MongoDB Compass
   - View collections: users, products
   - Verify data is being saved

4. **Check Token**
   - DevTools → Application → localStorage
   - Look for 'token' key
   - Verify token format

## Success Indicators

✅ Backend server running on port 5000
✅ Frontend server running on port 3000
✅ Can register new user
✅ Can login with credentials
✅ Token saved in localStorage
✅ Can add/edit/delete products
✅ Protected routes redirect to login
✅ Can logout
✅ Page refresh persists login
