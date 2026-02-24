import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from '../types';
import { sampleProducts } from '../data/products';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Product) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('privateLivesMatterProducts');
      const customProducts: Product[] = stored ? JSON.parse(stored) : [];
      setProducts([...sampleProducts, ...customProducts]);
    } catch (e) {
      console.error("Error loading products from local storage", e);
      setProducts([...sampleProducts]);
    }
  }, []);

  const addProduct = useCallback((newProduct: Product) => {
    setProducts(prev => {
      const updated = [...prev, newProduct];
      // Store only custom products in localStorage
      const customProducts = updated.filter(p => !sampleProducts.some(sp => sp.id === p.id));
      localStorage.setItem('privateLivesMatterProducts', JSON.stringify(customProducts));
      return updated;
    });
  }, []);

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
