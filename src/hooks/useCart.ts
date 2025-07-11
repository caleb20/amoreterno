import { useState, useEffect } from 'react';

export interface CartItem {
  id: string | number;
  name?: string;
  price: number;
  quantity: number;
  [key: string]: any;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('amoreterno-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('amoreterno-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: { id: string | number; price: number; [key: string]: any }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 } as CartItem];
      }
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string | number, newQuantity: number) => {
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

  // Calculated values
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const estimatedDeliveryTime = cart.length > 0 ? "2-3 horas" : null;

  return {
    cart,
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
    estimatedDeliveryTime
  };
};