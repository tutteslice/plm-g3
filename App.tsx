
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

import { SplashPage } from './pages/SplashPage';
// @ts-ignore
import { BuzzedGame } from './Buzzed-HBG/src/BuzzedGame';

const App: React.FC = () => {
  return (
    <ProductsProvider>
      <CartProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            {/* Splash page as root */}
            <Route path="/" element={<SplashPage />} />
            
            {/* Buzzed game routes */}
            <Route path="/buzzed/*" element={<BuzzedGame />} />

            {/* Main store routes with Layout */}
            <Route path="/shop/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<ShopPage />} />
                  <Route path="/:brand" element={<ShopPage />} />
                </Routes>
              </Layout>
            } />
            
            <Route path="/product/:productId" element={<Layout><ProductDetailPage /></Layout>} />
            <Route path="/hidden-pocket-info" element={<Layout><HiddenPocketInfoPage /></Layout>} />
            <Route path="/media" element={<Layout><MediaPage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
            <Route path="/privacy-policy" element={<Layout><PrivacyPolicyPage /></Layout>} />
            <Route path="/returns-policy" element={<Layout><ReturnsPolicyPage /></Layout>} />
            <Route path="/tools" element={<Layout><ToolsPage /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
            <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
            <Route path="/404" element={<Layout><NotFoundPage /></Layout>} />
            
            {/* Redirect old home to shop if needed, or just let LandingPage handle it */}
            <Route path="/home" element={<Layout><LandingPage /></Layout>} />
            
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </HashRouter>
      </CartProvider>
    </ProductsProvider>
  );
};

export default App;
    