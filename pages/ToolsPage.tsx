import React, { useEffect } from 'react';
import { ExternalLinkIcon, InfoIcon } from '../components/Icons';

export const ToolsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Shopping Tools | Private Lives Matter";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore our curated shopping tools to help you find the best deals on your favorite items.");
    }
  }, []);

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-6 text-primary-text">
          Shopping Tools
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          We've curated a selection of powerful tools to enhance your shopping experience and help you make informed decisions.
        </p>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gray-50 flex items-center justify-center p-8">
              <div className="bg-white p-6 rounded-2xl shadow-inner border border-gray-100">
                 <img 
                    src="https://pic-price-hound.lovable.app/logo.png" 
                    alt="Pic Price Hound" 
                    className="w-24 h-24 object-contain"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/FF6B6B/FFFFFF?text=PPH';
                    }}
                 />
              </div>
            </div>
            
            <div className="p-8 md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)' }}>
                    Recommended Tool
                  </span>
                </div>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  Pic Price Hound
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed font-raleway">
                  Pic Price Hound is a powerful visual shopping assistant. Simply use an image to find and compare prices for items across various online stores. It's the perfect companion for finding the best deals on fashion, home decor, and more.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 text-accent">
                      <InfoIcon className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-gray-500 italic font-raleway">
                      Check prices instantly by searching with images.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <a 
                  href="https://pic-price-hound.lovable.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-accent hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
                >
                  Visit Pic Price Hound
                  <ExternalLinkIcon className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-black flex items-center justify-center p-8">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                 <img 
                    src="/qr-code.png" 
                    alt="Mobile QR Code" 
                    className="w-32 h-32 object-contain"
                 />
              </div>
            </div>
            
            <div className="p-8 md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)' }}>
                    Mobile Access
                  </span>
                </div>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-4">
                  Mobile Companion
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed font-raleway">
                  Scan this QR code to access Private Lives Matter on your mobile device. Take the peak with you wherever you go and stay updated on our latest drops and secret pocket technology.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-3">
                  <div className="text-accent">
                    <InfoIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-gray-500 font-raleway">
                    Point your camera at the QR code to open the site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
          <h3 className="font-poppins text-xl font-bold text-gray-900 mb-4">
            More Tools Coming Soon
          </h3>
          <p className="text-gray-600 font-raleway">
            We are constantly looking for new ways to improve your shopping journey. Check back soon for more helpful tools and resources.
          </p>
        </div>
      </div>
    </div>
  );
};
