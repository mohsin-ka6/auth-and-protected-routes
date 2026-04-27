import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { productAPI } from '../services/api';
import './Products.css';

const Products = () => {
  const { token, logout, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getProducts(token);
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id, token);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <div className="header-content">
          <h1>Products</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <div className="header-actions">
          <button
            className="btn-add-product"
            onClick={() => navigate('/add-product')}
          >
            + Add Product
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No products found. Create your first product!</p>
          <button
            className="btn-add-product"
            onClick={() => navigate('/add-product')}
          >
            + Add Product
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-header">
                <h2>{product.name}</h2>
                <span className="category-badge">{product.category}</span>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-info">
                <div className="price">${product.price.toFixed(2)}</div>
                <div className="stock">Stock: {product.stock}</div>
              </div>
              <div className="product-actions">
                <button
                  className="btn-edit"
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
