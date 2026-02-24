import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, CartItem } from '../types';
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../constants';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, selectedSize?: string, selectedColor?: string, hiddenPocket?: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string, selectedSize?: string, selectedColor?: string, hiddenPocket?: boolean) => boolean;
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
    const storedCart = localStorage.getItem('privateLivesMatterCart');
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
    localStorage.setItem('privateLivesMatterCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: Product, selectedSize?: string, selectedColor?: string, hiddenPocket?: boolean) => {
    const cartItemId = `${product.id}-${selectedSize || 'none'}-${selectedColor || 'none'}-${hiddenPocket || false}`;
    setCartItems(prevItems => {
      const exists = prevItems.some(item => item.cartItemId === cartItemId);
      if (exists) {
        return prevItems;
      }
      return [...prevItems, { ...product, cartItemId, quantity: 1, selectedSize, selectedColor, hiddenPocket }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.cartItemId !== cartItemId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const isInCart = useCallback((productId: string, selectedSize?: string, selectedColor?: string, hiddenPocket?: boolean) => {
    const cartItemId = `${productId}-${selectedSize || 'none'}-${selectedColor || 'none'}-${hiddenPocket || false}`;
    return cartItems.some(i => i.cartItemId === cartItemId);
  }, [cartItems]);

  const cartSubtotal = cartItems.reduce((total, item) => total + item.price, 0);
  
  const shippingCost = cartSubtotal > 0 && cartSubtotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_COST : 0;
  
  const cartTotal = cartSubtotal + shippingCost;

  const itemCount = cartItems.length;

  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
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