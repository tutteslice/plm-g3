
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ReturnsPolicyPage } from './pages/ReturnsPolicyPage';
import { ToolsPage } from './pages/ToolsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';
import { HiddenPocketInfoPage } from './pages/HiddenPocketInfoPage';
import { MediaPage } from './pages/MediaPage';
import { CartProvider } from './hooks/useCart';
import { ProductsProvider } from './hooks/useProducts';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <ProductsProvider>
      <CartProvider>
        <HashRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:brand" element={<ShopPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/hidden-pocket-info" element={<HiddenPocketInfoPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/returns-policy" element={<ReturnsPolicyPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
          </Layout>
        </HashRouter>
      </CartProvider>
    </ProductsProvider>
  );
};

export default App;
    