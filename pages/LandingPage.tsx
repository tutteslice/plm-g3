
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { CategoryCard } from '../components/CategoryCard';
import { FeaturedItemCard } from '../components/FeaturedItemCard';
import { sampleProducts } from '../data/products';
import { CATEGORY_LINKS_INFO, LANDING_PAGE_INTRO } from '../constants';

export const LandingPage: React.FC = () => {
  const featuredProducts = sampleProducts.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-xl shadow-inner">
        <div className="container mx-auto px-4">
          <h1 className="font-poppins text-4xl sm:text-5xl md:text-6xl font-bold text-accent mb-6 leading-tight animate-fade-in-down">
            Wear Your Joy.
          </h1>
          <p className="font-raleway text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-300">
            {LANDING_PAGE_INTRO}
          </p>
          <Button to="/shop" size="lg" variant="primary" className="animate-fade-in-up animation-delay-600">
            Explore the Collection
          </Button>
        </div>
      </section>

      {/* Shop Category Links */}
      <section>
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">Discover Your Vibe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CATEGORY_LINKS_INFO.map((categoryInfo, index) => (
            <div key={categoryInfo.name} className={`animate-fade-in-up animation-delay-${600 + index * 200}`}>
              <CategoryCard categoryInfo={categoryInfo} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Items Section */}
      {featuredProducts.length > 0 && (
        <section>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">Featured Finds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className={`animate-fade-in-up animation-delay-${900 + index * 150}`}>
                <FeaturedItemCard product={product} />
              </div>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button to="/shop" size="lg" variant="outline">
              See All Products
            </Button>
          </div>
        </section>
      )}

      {/* Call to Action - Reinforce hidden pocket */}
      <section className="py-12 md:py-20 bg-gray-100 rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-primary-text mb-4">Ride the Wave, Not Catch a Case.</h2>
          <p className="font-raleway text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            All our Dopamine Designs come with cleverly hidden pockets. Keep your essentials secure, so you can lose yourself in the moment, not your valuables.
          </p>
          <Button to={`/shop/${encodeURIComponent("Dopamine Designs")}`} size="lg" variant="secondary">
            Shop Designs with Hidden Pockets
          </Button>
        </div>
      </section>
      
      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1050 { animation-delay: 1.05s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
      `}</style>
    </div>
  );
};
    