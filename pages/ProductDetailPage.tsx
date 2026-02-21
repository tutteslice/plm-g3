
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleProducts } from '../data/products';
import { Product } from '../types';
import { Button } from '../components/Button';
import { useCart } from '../hooks/useCart';
import { ArrowLeftIcon, PlusIcon, MinusIcon } from '../components/Icons';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Simulate loading

  useEffect(() => {
    setIsLoading(true);
    const foundProduct = sampleProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.images[0]);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    } else {
      navigate('/404'); // Product not found
    }
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [productId, navigate]);

  const handleAddToCart = () => {
    if (product) {
      if (product.sizes && !selectedSize) {
        alert("Please select a size."); // Simple validation
        return;
      }
      addToCart(product, quantity, product.sizes ? selectedSize : undefined);
      // Optionally: show notification, redirect to cart, or open cart sidebar
      // For now, just log
      console.log(`${quantity} of ${product.name} (Size: ${selectedSize || 'N/A'}) added to cart.`);
    }
  };

  if (isLoading || !product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-sm">
        <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back to Shop
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery */}
        <div className="animate-fade-in-left">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
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
          <span className="text-sm text-gray-500 uppercase tracking-wider">{product.category}</span>
          <h1 className="font-poppins text-3xl md:text-4xl font-bold my-2">{product.name}</h1>
          <p className="font-poppins text-3xl text-accent mb-4">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 mb-6">
            <p>{product.description}</p>
            {product.details && <p className="mt-2">{product.details}</p>}
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label htmlFor="size-selector" className="block text-sm font-medium text-gray-700 mb-1">
                Select Size: <span className="font-semibold">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 ${selectedSize === size ? '' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {product.dimensions && (
            <div className="mb-6">
              <p className="text-sm text-gray-700"><span className="font-medium">Dimensions:</span> {product.dimensions}</p>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="mb-6">
             <label htmlFor="quantity-selector" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <div className="flex items-center border border-gray-300 rounded-md w-max">
              <Button variant="ghost" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-r-none border-r border-gray-300" aria-label="Decrease quantity">
                <MinusIcon className="w-5 h-5" />
              </Button>
              <input
                id="quantity-selector"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-12 text-center border-none focus:ring-0"
                min="1"
              />
              <Button variant="ghost" onClick={() => setQuantity(q => q + 1)} className="p-2 rounded-l-none border-l border-gray-300" aria-label="Increase quantity">
                <PlusIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleAddToCart}
            className="w-full md:w-auto"
            disabled={product.sizes && !selectedSize}
          >
            Add to Cart
          </Button>
          {getItemQuantity(product.id, selectedSize) > 0 && (
            <p className="text-sm text-green-600 mt-2">
              You have {getItemQuantity(product.id, selectedSize)} of this item (size: {selectedSize || 'N/A'}) in your cart.
            </p>
          )}
        </div>
      </div>
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
    