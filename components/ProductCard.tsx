
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './Button';
import { useCart } from '../hooks/useCart';
import { ImageMagnifier } from './ImageMagnifier';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation if button inside Link
    e.stopPropagation();
    addToCart(product);
  };

  const handleThumbnailClick = (e: React.MouseEvent<HTMLDivElement>, img: string) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(img);
  };

  const inCart = isInCart(product.id);

  return (
    <Link to={`/product/${product.id}`} className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative overflow-hidden aspect-[3/4]">
        <ImageMagnifier src={currentImage} alt={product.name} />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300 pointer-events-none"></div>
        {inCart && (
          <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded text-xs font-bold shadow-md pointer-events-none">
            IN CART
          </div>
        )}
      </div>
      
      {product.images.length > 1 && (
        <div className="flex gap-2 px-4 pt-4 overflow-x-auto hide-scrollbar">
          {product.images.slice(0, 4).map((img, idx) => (
            <div 
              key={idx} 
              onClick={(e) => handleThumbnailClick(e, img)}
              className={`w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border shadow-sm transition-opacity ${currentImage === img ? 'border-accent opacity-100 ring-1 ring-accent' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
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

      <div className={`p-4 ${product.images.length > 1 ? 'pt-3' : ''}`}>
        <h3 className="font-poppins text-lg font-semibold text-primary-text truncate group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{product.brand} - {product.category}</p>
        {product.collection && (
           <p className="text-xs text-accent font-semibold mt-1 italic">"{product.collection}"</p>
        )}
        <div className="flex justify-between items-center mt-3">
          <p className="font-poppins text-xl font-bold text-accent">
            ${product.price.toFixed(2)}
          </p>
          <Button
            size="sm"
            variant={inCart ? "outline" : "primary"}
            onClick={handleAddToCart}
            className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 ${inCart ? 'cursor-default' : ''}`}
            aria-label={inCart ? `${product.name} is in cart` : `Add ${product.name} to cart`}
            disabled={inCart}
          >
            {inCart ? 'In Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
};