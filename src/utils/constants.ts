// Application constants
export const APP_NAME = 'Amor Eterno';
export const APP_VERSION = '1.0.0';

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'magia-cart',
  USER_PREFERENCES: 'magia-preferences',
  NEWSLETTER_SUBSCRIPTION: 'magia-newsletter'
};

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  CATEGORIES: '/api/categories',
  ORDERS: '/api/orders',
  NEWSLETTER: '/api/newsletter'
};

// Default Values
export const DEFAULT_VALUES = {
  DELIVERY_TIME: '2-3 horas',
  CURRENCY: 'S/.',
  PHONE_PREFIX: '+51',
  TIMEZONE: 'America/Lima'
};

// Business Hours
export const BUSINESS_HOURS = {
  OPENING_TIME: '08:00',
  CLOSING_TIME: '20:00',
  SAME_DAY_CUTOFF: '17:00',
  WEEKEND_CUTOFF: '16:00'
};

// Delivery Zones
export const DELIVERY_ZONES = {
  LIMA_CENTRO: { name: 'Lima Centro', maxTime: '3', cutoff: '18:00' },
  MIRAFLORES: { name: 'Miraflores', maxTime: '2', cutoff: '19:00' },
  SAN_ISIDRO: { name: 'San Isidro', maxTime: '2', cutoff: '19:00' },
  CALLAO: { name: 'Callao', maxTime: '4', cutoff: '17:00' }
};

// Product Categories
export const PRODUCT_CATEGORIES = {
  ROSES: 'rosas',
  TULIPS: 'tulipanes',
  SUNFLOWERS: 'girasoles',
  ORCHIDS: 'orquideas'
};

// Occasions
export const OCCASIONS = {
  BIRTHDAY: 'cumpleanos',
  ANNIVERSARY: 'aniversario',
  LOVE: 'amor',
  BIRTH: 'nacimiento'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  IN_DELIVERY: 'in_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Payment Methods
export const PAYMENT_METHODS = {
  YAPE: 'yape',
  PLIN: 'plin',
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  CASH: 'cash'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  CAROUSEL: 5000
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// SEO and Meta Data
export const SEO = {
  TITLE: 'Magia Florería - Envío de Flores a Domicilio en Lima | Entrega el Mismo Día',
  DESCRIPTION: 'Florería premium en Lima con entrega el mismo día. Ramos frescos, arreglos personalizados y regalos especiales. Envío garantizado en Lima y Callao.',
  KEYWORDS: 'flores lima, florería, envío flores, ramos, arreglos florales, entrega mismo día',
  AUTHOR: 'Magia Florería',
  LANG: 'es'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor, intenta nuevamente.',
  PRODUCT_NOT_FOUND: 'Producto no encontrado.',
  CART_EMPTY: 'Tu carrito está vacío.',
  INVALID_EMAIL: 'Por favor, ingresa un email válido.',
  REQUIRED_FIELD: 'Este campo es requerido.',
  GENERIC_ERROR: 'Ha ocurrido un error inesperado.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: 'Producto agregado al carrito',
  NEWSLETTER_SUBSCRIBED: '¡Suscripción exitosa! Revisa tu email para el descuento.',
  ORDER_PLACED: 'Pedido realizado exitosamente',
  CART_UPDATED: 'Carrito actualizado'
};

// Feature Flags (for future development)
export const FEATURE_FLAGS = {
  ENABLE_CHECKOUT: false,
  ENABLE_USER_ACCOUNTS: false,
  ENABLE_REVIEWS: false,
  ENABLE_WISHLIST: false,
  ENABLE_LOYALTY_PROGRAM: false
};

// External Links
export const EXTERNAL_LINKS = {
  WHATSAPP_BASE: 'https://wa.me/',
  GOOGLE_MAPS: 'https://maps.google.com',
  FACEBOOK: 'https://facebook.com',
  INSTAGRAM: 'https://instagram.com',
  TWITTER: 'https://twitter.com'
};

// Image Fallbacks
export const IMAGE_FALLBACKS = {
  PRODUCT: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  AVATAR: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
  HERO: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  RUC: /^\d{11}$/,
  DNI: /^\d{8}$/
};

export default {
  APP_NAME,
  APP_VERSION,
  STORAGE_KEYS,
  API_ENDPOINTS,
  DEFAULT_VALUES,
  BUSINESS_HOURS,
  DELIVERY_ZONES,
  PRODUCT_CATEGORIES,
  OCCASIONS,
  ORDER_STATUS,
  PAYMENT_METHODS,
  NOTIFICATION_TYPES,
  ANIMATION_DURATION,
  BREAKPOINTS,
  SEO,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS,
  EXTERNAL_LINKS,
  IMAGE_FALLBACKS,
  REGEX_PATTERNS
};