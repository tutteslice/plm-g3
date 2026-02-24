
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './Button';
import { ImageMagnifier } from './ImageMagnifier';

interface FeaturedItemCardProps {
  product: Product;
}

export const FeaturedItemCard: React.FC<FeaturedItemCardProps> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  return (
    <div className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <Link to={`/product/${product.id}`} className="block overflow-hidden aspect-w-1 aspect-h-1">
        <ImageMagnifier src={currentImage} alt={product.name} />
      </Link>
      
      {product.images.length > 1 && (
        <div className="flex gap-2 px-5 pt-4 overflow-x-auto hide-scrollbar">
          {product.images.slice(0, 4).map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentImage(img)}
              className={`cursor-pointer w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border shadow-sm transition-opacity ${currentImage === img ? 'border-accent opacity-100 ring-1 ring-accent' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
            >
               <img src={img} alt={`${product.name} view ${idx+1}`} className="w-full h-full object-cover" />
            </div>
          ))}
          {product.images.length > 4 && (
            <div className="w-12 h-12 flex-shrink-0 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500">
              +{product.images.length - 4}
            </div>
          )}
        </div>
      )}

      <div className={`p-5 flex flex-col flex-grow ${product.images.length > 1 ? 'pt-3' : ''}`}>
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
    