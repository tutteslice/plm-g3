
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartSidebar } from './CartSidebar'; 

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-primary text-primary-text">
      <Header />
      <CartSidebar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 sm:pt-28 md:pt-32"> {/* Added padding-top for fixed header */}
        {children}
      </main>
      <Footer />
    </div>
  );
};
    