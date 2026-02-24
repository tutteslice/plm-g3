
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import { Button } from '../components/Button';
import { useCart } from '../hooks/useCart';
import { ArrowLeftIcon } from '../components/Icons';
import { ImageMagnifier } from '../components/ImageMagnifier';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { products } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true); // Simulate loading
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.images[0]);
      if (foundProduct.availableSizes && foundProduct.availableSizes.length > 0) {
        setSelectedSize(foundProduct.availableSizes[0]);
      } else {
        setSelectedSize('');
      }
      if (foundProduct.availableColors && foundProduct.availableColors.length > 0) {
        setSelectedColor(foundProduct.availableColors[0]);
      } else {
        setSelectedColor('');
      }
    } else {
      navigate('/404'); // Product not found
    }
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [productId, navigate, products]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, selectedSize, selectedColor);
    }
  };

  if (isLoading || !product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    );
  }

  const alreadyInCart = isInCart(product.id, selectedSize, selectedColor);

  return (
    <div className="container mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-sm">
        <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back to Shop
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery */}
        <div className="animate-fade-in-left">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <ImageMagnifier src={selectedImage} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-accent ring-2 ring-accent' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="animate-fade-in-right">
          <div className="flex flex-wrap items-center gap-3">
             <span className="text-sm text-gray-500 uppercase tracking-wider">{product.brand}</span>
             <span className="text-xs font-semibold text-gray-400 border border-gray-300 px-2 py-0.5 rounded">{product.category}</span>
             {product.collection && (
               <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-semibold italic border border-accent/20">"{product.collection}"</span>
             )}
          </div>
          <h1 className="font-poppins text-3xl md:text-4xl font-bold my-2">{product.name}</h1>
          <p className="font-poppins text-3xl text-accent mb-4">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 mb-6">
            <p>{product.description}</p>
            {product.details && <p className="mt-2">{product.details}</p>}
          </div>

          {product.dimensions && (
            <div className="mb-6">
              <p className="text-sm text-gray-700"><span className="font-medium">Dimensions:</span> {product.dimensions}</p>
            </div>
          )}

          {product.size && !product.availableSizes && (
            <div className="mb-6">
              <p className="text-sm text-gray-700"><span className="font-medium">Size:</span> {product.size}</p>
            </div>
          )}

          {product.modelInfo && (
            <div className="mb-6">
              <p className="text-sm text-gray-700 italic">{product.modelInfo}</p>
            </div>
          )}

          {product.availableSizes && product.availableSizes.length > 0 && (
            <div className="mb-4">
              <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                id="size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
              >
                {product.availableSizes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          {product.availableColors && product.availableColors.length > 0 && (
            <div className="mb-6">
              <label htmlFor="color-select" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <select
                id="color-select"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
              >
                {product.availableColors.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}
          
          <Button
            size="lg"
            variant={alreadyInCart ? "outline" : "primary"}
            onClick={handleAddToCart}
            className="w-full md:w-auto"
            disabled={alreadyInCart}
          >
            {alreadyInCart ? 'In Your Cart' : 'Add to Cart'}
          </Button>
          {alreadyInCart && (
            <p className="text-sm text-green-600 mt-2">
              This unique item is already in your cart.
            </p>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {product.relatedProductIds && product.relatedProductIds.length > 0 && (
        <div className="mt-20 border-t pt-16">
          <h2 className="font-poppins text-3xl font-bold text-primary-text mb-8">Complete the Look</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products
              .filter(p => product.relatedProductIds?.includes(p.id))
              .map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))
            }
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left { animation: fade-in-left 0.5s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.5s ease-out forwards; animation-delay: 0.1s; }
      `}</style>
    </div>
  );
};