// Tipos globales para la aplicación Amor Eterno

// Información de la empresa
export interface CompanyInfo {
  whatsapp?: string;
  email?: string;
  phone?: string;
  address?: string;
  name?: string;
  description?: string;
}

// Producto
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  discount?: number;
  image?: string;
  category?: string;
  category_id?: number;
  is_featured?: boolean;
  featured?: boolean;
  stock?: number;
  occasion?: string[];
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

// Categoría
export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

// Ocasión
export interface Occasion {
  id: string; // Cambiado a string para coincidir con el JSON
  name: string;
  description?: string;
  image?: string;
  icon?: string; // Agregar la propiedad icon
  effect?: string; // Nueva propiedad para efectos visuales
  created_at?: string;
  updated_at?: string;
}

// Item del carrito
export interface CartItem {
  product: Product;
  quantity: number;
  selectedOccasion?: Occasion;
}

// Contexto del carrito
export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  isOpen: boolean;
  addToCart: (product: Product, occasion?: Occasion) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

// Contexto de la aplicación
export interface AppContextType {
  products: Product[];
  categories: Category[];
  occasions: Occasion[];
  loading: boolean;
  error: string | null;
  featuredProducts: Product[];
  getProductsByCategory: (categoryId: number) => Product[];
  getProductsByOccasion: (occasionId: number) => Product[];
}

// Estación del metro
export interface Station {
  id: number;
  name: string;
  line?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Formulario de pedido personalizado
export interface CustomOrderForm {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  selectedStation?: Station;
  occasion?: string;
  message?: string;
  images: File[];
  deliveryDate: string;
  deliveryTime: string;
  budget?: number;
}

// API Response genérico
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  status: number;
}

// Eventos personalizados del DOM
declare global {
  interface WindowEventMap {
    scrollToEstaciones: CustomEvent;
  }
}
