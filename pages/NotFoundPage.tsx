
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center py-12">
      <img 
        src="https://picsum.photos/seed/404page/400/300" 
        alt="Cosmic glitch art for 404" 
        className="w-64 h-auto mb-8 rounded-lg shadow-xl opacity-80"
      />
      <h1 className="font-poppins text-6xl font-bold text-accent mb-4">404</h1>
      <h2 className="font-poppins text-2xl sm:text-3xl font-semibold text-primary-text mb-6">Oops! Page Not Found.</h2>
      <p className="text-gray-600 max-w-md mb-8">
        It seems you've wandered off the main frequency. The page you're looking for might have been moved, deleted, or perhaps it's just vibing in another dimension.
      </p>
      <div className="flex space-x-4">
        <Button to="/" variant="primary" size="lg">
          Go to Homepage
        </Button>
        <Button to="/shop" variant="outline" size="lg">
          Explore Shop
        </Button>
      </div>
    </div>
  );
};
    