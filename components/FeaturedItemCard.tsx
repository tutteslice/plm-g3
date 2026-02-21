
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './Button';

interface FeaturedItemCardProps {
  product: Product;
}

export const FeaturedItemCard: React.FC<FeaturedItemCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="block overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-poppins text-xl font-semibold text-primary-text group-hover:text-accent transition-colors duration-200">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.description.substring(0, 70)}...</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="font-poppins text-2xl font-bold text-accent">
            ${product.price.toFixed(2)}
          </p>
          <Button to={`/product/${product.id}`} variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
    