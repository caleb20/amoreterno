// API utility functions with error handling and loading states

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Ha ocurrido un error';
    let errorData = null;

    try {
      const errorResponse = await response.json();
      errorMessage = errorResponse.message || errorMessage;
      errorData = errorResponse;
    } catch (e) {
      // If we can't parse the error response, use default message
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }

  return response.json();
};

const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Error de conexión', 0);
  }
};

// API methods
export const api = {
  // GET request
  get: (endpoint, options = {}) => {
    return request(endpoint, {
      method: 'GET',
      ...options,
    });
  },

  // POST request
  post: (endpoint, data, options = {}) => {
    return request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },

  // PUT request
  put: (endpoint, data, options = {}) => {
    return request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },

  // DELETE request
  delete: (endpoint, options = {}) => {
    return request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  },

  // PATCH request
  patch: (endpoint, data, options = {}) => {
    return request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  },
};

// Custom hook for API calls with loading and error states
export const useApiCall = () => {
  const callApi = async (apiMethod, ...args) => {
    try {
      const result = await apiMethod(...args);
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return { callApi };
};

// Specific API endpoints for the flower shop
export const flowerShopApi = {
  // Products
  getProducts: (filters = {}) => api.get('/products', { params: filters }),
  getProduct: (id) => api.get(`/products/${id}`),
  getFeaturedProducts: () => api.get('/products/featured'),
  getSaleProducts: () => api.get('/products/sale'),

  // Categories
  getCategories: () => api.get('/categories'),
  getCategory: (id) => api.get(`/categories/${id}`),

  // Occasions
  getOccasions: () => api.get('/occasions'),
  getOccasion: (id) => api.get(`/occasions/${id}`),

  // Orders
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrder: (id, orderData) => api.put(`/orders/${id}`, orderData),

  // Contact
  sendContactMessage: (messageData) => api.post('/contact', messageData),

  // Delivery
  checkDeliveryAvailability: (address) => api.post('/delivery/check', { address }),
  getDeliveryZones: () => api.get('/delivery/zones'),
};

export { ApiError }; 