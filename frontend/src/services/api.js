const API_URL = '/api';

export const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API call failed');
  }

  return data;
};

// Auth APIs
export const authAPI = {
  register: (name, email, password) =>
    apiCall('/auth/register', 'POST', { name, email, password }),
  login: (email, password) =>
    apiCall('/auth/login', 'POST', { email, password }),
  getMe: (token) => apiCall('/auth/me', 'GET', null, token),
};

// Product APIs
export const productAPI = {
  getProducts: (token) => apiCall('/products', 'GET', null, token),
  getProduct: (id, token) => apiCall(`/products/${id}`, 'GET', null, token),
  createProduct: (productData, token) =>
    apiCall('/products', 'POST', productData, token),
  updateProduct: (id, productData, token) =>
    apiCall(`/products/${id}`, 'PUT', productData, token),
  deleteProduct: (id, token) => apiCall(`/products/${id}`, 'DELETE', null, token),
};
