import React from 'react';
import { Button } from '../components/Button';

export const HiddenPocketInfoPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      <h1 className="font-poppins text-4xl md:text-5xl font-bold text-center text-primary-text mb-8">
        The Hidden Pocket Option
      </h1>
      
      <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-10">
        <p className="font-raleway text-lg text-gray-700 mb-8 leading-relaxed">
          At Private Lives Matter, we want you to reach the peak, not the precinct. That's why every item in our collection comes with a discreetly sewn hidden pocket, allowing you to securely stash your essentials and lose yourself in the moment.
        </p>

        <h2 className="font-poppins text-2xl font-bold text-primary-text mb-6">
          How It Works
        </h2>
        
        <ol className="space-y-6">
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold mr-4">
              1
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Choose your item</h3>
              <p className="text-gray-600 mt-1">Browse our collection and find the perfect piece that fits your vibe.</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold mr-4">
              2
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Hidden pocket included</h3>
              <p className="text-gray-600 mt-1">Every design in our shop automatically features a secure, hand-sewn pocket.</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold mr-4">
              3
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">We prepare and ship your item</h3>
              <p className="text-gray-600 mt-1">Our team will carefully hand-sew your discreet pocket and ship your order.</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold mr-4">
              4
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Profit</h3>
              <p className="text-gray-600 mt-1">Enjoy your piece, keep your essentials safe, and dance the night away.</p>
            </div>
          </li>
        </ol>
      </div>

      <div className="text-center">
        <Button to="/shop" size="lg" variant="primary">
          Start Shopping
        </Button>
      </div>
    </div>
  );
};
