# Authentication & Protected Routes Project

A complete full-stack authentication system with React frontend and Node.js backend, featuring protected routes, JWT token management, and product CRUD operations.

## Features

✅ **Authentication**
- User registration with validation
- Secure login with JWT tokens
- Token stored in localStorage
- Automatic logout on token expiration
- Persistent login on page refresh

✅ **Protected Routes**
- Protected product pages
- Redirect to login if unauthenticated
- Role-based access control

✅ **Product Management**
- View all products
- Create new products
- Edit existing products
- Delete products
- Real-time updates

✅ **Security**
- Password hashing with bcryptjs
- JWT authentication
- Bearer token in headers
- Authorization middleware

## Project Structure

```
auth and protected routes/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── productController.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Product.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── productRoutes.js
│   │   └── utils/
│   │       └── generateToken.js
│   ├── app.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   └── *.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
│
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Installation & Setup

### 1. Clone/Download the Project
```bash
cd "C:\Users\Mohsin-pc\Desktop\Asigmnet\Assignment 2\auth and protected routes"
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create or update `.env` file in the backend folder:
```env
MONGODB_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auth_db
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Start the frontend dev server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | `{ name, email, password }` |
| POST | `/login` | Login user | `{ email, password }` |
| GET | `/me` | Get current user | - |

**Response on login/register:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Product Routes (`/api/products`)
All product routes require authentication (Bearer token in header)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all user's products |
| GET | `/:id` | Get single product |
| POST | `/` | Create new product |
| PUT | `/:id` | Update product |
| DELETE | `/:id` | Delete product |

**Product request body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "stock": 10,
  "category": "Electronics"
}
```

## Authentication Flow

### Registration
1. User fills registration form (name, email, password)
2. Frontend sends POST request to `/api/auth/register`
3. Backend validates and hashes password
4. User is created in MongoDB
5. User redirected to login page

### Login
1. User enters email and password
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials
4. JWT token is generated
5. Token is saved in localStorage
6. User is redirected to `/products`

### Protected Routes
1. When accessing protected routes, AuthContext checks for token
2. If token exists, route is accessible
3. If no token, user is redirected to `/login`
4. Token is sent in Authorization header for API calls

### Logout
1. Click logout button
2. Token is removed from localStorage
3. AuthContext state is cleared
4. User is redirected to `/login`

## Using the Application

### Register
1. Go to `http://localhost:3000/register`
2. Fill in name, email, and password
3. Click "Register"
4. You'll be redirected to login page

### Login
1. Go to `http://localhost:3000/login`
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to products page

### View Products
1. After login, you're on `/products` page
2. See all your products in a grid layout
3. Click "Edit" to edit a product
4. Click "Delete" to delete a product

### Add Product
1. Click "+ Add Product" button
2. Fill in product details
3. Click "Add Product"
4. Product appears in your product list

### Edit Product
1. Click "Edit" on any product card
2. Update product details
3. Click "Update Product"
4. Changes are saved

### Logout
1. Click "Logout" button
2. You'll be redirected to login page
3. Token is removed from localStorage

## Token Management

### How tokens are stored and used:

**Frontend (localStorage):**
```javascript
// Save token
localStorage.setItem('token', token);

// Retrieve token
const token = localStorage.getItem('token');

// Remove token
localStorage.removeItem('token');
```

**API Requests:**
```javascript
fetch('/api/products', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

**Persistence:**
- Token persists on page refresh
- AuthContext reads from localStorage on mount
- Automatic logout if token is expired

## Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  stock: Number (default: 0),
  category: String (required),
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend
Frontend uses proxy configuration in `vite.config.js` to connect to backend:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

## Error Handling

The application handles various errors:
- **Invalid credentials** → "Invalid credentials" message
- **User not found** → "User not found" message
- **Missing fields** → "All fields are required" message
- **Network errors** → Error message is displayed
- **Token expired** → User is logged out automatically

## Development

### Running both servers:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Both servers run simultaneously:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Building for Production

**Backend:**
```bash
# Set NODE_ENV=production in .env
npm start
```

**Frontend:**
```bash
npm run build
npm run preview
```

## Testing the Application

### Test User Credentials
```
Email: test@example.com
Password: password123
```

### Test Flow
1. **Register**: Create a new account
2. **Login**: Login with credentials
3. **Add Product**: Create a product
4. **View Products**: See all products
5. **Edit Product**: Update product details
6. **Delete Product**: Remove a product
7. **Logout**: Logout and verify redirect to login

## Security Considerations

✅ **Implemented:**
- Password hashing with bcryptjs
- JWT token authentication
- Bearer token in Authorization header
- Protected routes middleware
- Token validation on each request

⚠️ **Additional Security for Production:**
- Use HTTPS instead of HTTP
- Add CORS restrictions to specific domains
- Implement refresh token rotation
- Add rate limiting
- Use environment variables for secrets
- Implement CSRF protection
- Add request validation middleware
- Implement logging and monitoring

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or MongoDB Atlas URI is correct
- Check MONGODB_URI in .env file
- Verify network connection

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Change port in vite.config.js

### CORS Errors
- Ensure backend has CORS middleware enabled
- Check proxy configuration in vite.config.js

### Token Not Persisting
- Check browser's localStorage is enabled
- Verify token is being saved: `localStorage.getItem('token')`

### API Requests Failing
- Ensure backend is running on correct port
- Check Authorization header is being sent
- Verify token format: `Bearer <token>`

## Deployment

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Heroku/Railway (Backend)
```bash
# Create .env with production values
# Deploy using platform instructions
```

## License

This project is for educational purposes.

## Support

For issues or questions, refer to the code comments and structure.
