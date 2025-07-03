import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product, CartItem, Station } from '../types';

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  itemCount: number;
  totalPrice: number;
  estimatedDeliveryTime: string | null;
  selectedStation: string;
  setSelectedStation: (station: string) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

interface CartItemStorage {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItemStorage[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCartLoaded, setIsCartLoaded] = useState<boolean>(false);
  const [selectedStation, setSelectedStation] = useState<string>("");

  useEffect(() => {
    const savedCart = localStorage.getItem('magia-cart');
    console.log('[CartContext] localStorage magia-cart al cargar:', savedCart);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    setIsCartLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem('magia-cart', JSON.stringify(cart));
      console.log('[CartContext] Guardando en localStorage magia-cart:', cart);
    }
  }, [cart, isCartLoaded]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { 
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1 
        }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const estimatedDeliveryTime = cart.length > 0 ? "2-3 horas" : null;

  // Convertir el cart interno a CartItem[] para compatibilidad
  const cartItems: CartItem[] = cart.map(item => ({
    product: {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    } as Product,
    quantity: item.quantity
  }));

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        openCart,
        itemCount,
        totalPrice,
        estimatedDeliveryTime,
        selectedStation,
        setSelectedStation
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
