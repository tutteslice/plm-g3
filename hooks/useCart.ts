import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, CartItem } from '../types';
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../constants';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string, selectedSize?: string) => number;
  cartTotal: number;
  cartSubtotal: number;
  shippingCost: number;
  itemCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getInitialCart = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem('dopamineThreadsCart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dopamineThreadsCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity: number, selectedSize?: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity, selectedSize }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string, selectedSize?: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === productId && item.selectedSize === selectedSize))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, selectedSize?: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: Math.max(0, quantity) } // Ensure quantity doesn't go below 0
          : item
      ).filter(item => item.quantity > 0) // Remove if quantity is 0
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemQuantity = useCallback((productId: string, selectedSize?: string) => {
    const item = cartItems.find(i => i.id === productId && i.selectedSize === selectedSize);
    return item ? item.quantity : 0;
  }, [cartItems]);

  const cartSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const shippingCost = cartSubtotal > 0 && cartSubtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_COST : 0;
  
  const cartTotal = cartSubtotal + shippingCost;

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        cartTotal,
        cartSubtotal,
        shippingCost,
        itemCount,
        isCartOpen,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};