
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { CategoryCard } from '../components/CategoryCard';
import { FeaturedItemCard } from '../components/FeaturedItemCard';
import { useProducts } from '../hooks/useProducts';
import { BRAND_LINKS_INFO, LANDING_PAGE_INTRO } from '../constants';

export const LandingPage: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  // SEO: Reset title for home page
  useEffect(() => {
    document.title = "Private Lives Matter | To the peak, not the precinct.";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "A unique clothing brand dedicated to rave and festival culture. Shop our PLM™ Designs featuring discreet, hand-sewn hidden pockets.");
    }
  }, []);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section 
        className="relative text-center py-20 md:py-32 rounded-xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/new_collection.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-poppins text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 leading-tight animate-fade-in-down drop-shadow-lg">
            New collection.
          </h1>
          <h2 className="font-poppins text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-8 animate-fade-in-down animation-delay-300 drop-shadow-lg italic">
            "To the peak, not the precinct."
          </h2>
          <p className="font-raleway text-lg md:text-2xl text-white max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-600 font-semibold drop-shadow-md">
            Hidden pocket included. Private Lives Matter
          </p>
          <Button to="/shop?collection=To+the+peak,+not+the+precinct." size="lg" variant="primary" className="animate-fade-in-up animation-delay-800 shadow-xl border-2 border-white">
            Explore the Collection
          </Button>
        </div>
      </section>

      {/* Shop Category Links */}
      <section>
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">Discover Your Vibe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {BRAND_LINKS_INFO.map((brandInfo, index) => (
            <div key={brandInfo.name} className={`animate-fade-in-up animation-delay-${600 + index * 200}`}>
              <CategoryCard categoryInfo={brandInfo} />
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
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-primary-text mb-4">To the peak, not the precinct.</h2>
          <p className="font-raleway text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Every one of our designs comes with a discreetly sewn hidden pocket. Keep your essentials secure, so you can lose yourself in the moment, not your valuables.
          </p>
          <Button to="/hidden-pocket-info" size="lg" variant="secondary">
            More info
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
    