// API utility functions with error handling and loading states

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  status: number;
  data: any;
  constructor(message: string, status: number, data: any = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const handleResponse = async (response: Response) => {
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

const request = async (endpoint: string, options: Record<string, any> = {}) => {
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
      ...((options.headers as Record<string, string>) || {}),
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
  get: (endpoint: string, options: Record<string, any> = {}) => {
    return request(endpoint, {
      method: 'GET',
      ...options,
    });
  },

  // POST request
  post: (endpoint: string, data: any, options: Record<string, any> = {}) => {
    return request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },

  // PUT request
  put: (endpoint: string, data: any, options: Record<string, any> = {}) => {
    return request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },

  // DELETE request
  delete: (endpoint: string, options: Record<string, any> = {}) => {
    return request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  },

  // PATCH request
  patch: (endpoint: string, data: any, options: Record<string, any> = {}) => {
    return request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  },
};

// Custom hook for API calls with loading and error states
export const useApiCall = () => {
  const callApi = async (apiMethod: (...args: any[]) => Promise<any>, ...args: any[]) => {
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
  getProducts: (filters: Record<string, any> = {}) => api.get('/products', { params: filters }),
  getProduct: (id: string | number) => api.get(`/products/${id}`),
  getFeaturedProducts: () => api.get('/products/featured'),
  getSaleProducts: () => api.get('/products/sale'),

  // Categories
  getCategories: () => api.get('/categories'),
  getCategory: (id: string | number) => api.get(`/categories/${id}`),

  // Occasions
  getOccasions: () => api.get('/occasions'),
  getOccasion: (id: string | number) => api.get(`/occasions/${id}`),

  // Orders
  createOrder: (orderData: Record<string, any>) => api.post('/orders', orderData),
  getOrder: (id: string | number) => api.get(`/orders/${id}`),
  updateOrder: (id: string | number, orderData: Record<string, any>) => api.put(`/orders/${id}`, orderData),

  // Contact
  sendContactMessage: (messageData: Record<string, any>) => api.post('/contact', messageData),

  // Delivery
  checkDeliveryAvailability: (address: string) => api.post('/delivery/check', { address }),
  getDeliveryZones: () => api.get('/delivery/zones'),
};

export { ApiError };