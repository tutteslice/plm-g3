
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from './Button';
import { XIcon, PlusIcon, MinusIcon, TrashIcon } from './Icons';
import { CartItem as CartItemType } from '../types'; // Renamed to avoid conflict

const CartItemCard: React.FC<{ item: CartItemType }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex py-4 border-b border-gray-200">
      <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
      <div className="flex-grow">
        <Link to={`/product/${item.id}`} className="font-semibold text-primary-text hover:text-accent text-sm">{item.name}</Link>
        {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>}
        <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <Button size="sm" variant="ghost" onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)} className="p-1" aria-label="Decrease quantity">
            <MinusIcon className="w-4 h-4" />
          </Button>
          <span className="mx-2 text-sm">{item.quantity}</span>
          <Button size="sm" variant="ghost" onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)} className="p-1" aria-label="Increase quantity">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between ml-2">
        <p className="font-semibold text-accent text-sm">${(item.price * item.quantity).toFixed(2)}</p>
        <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id, item.selectedSize)} className="p-1 text-gray-500 hover:text-red-500" aria-label="Remove item">
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};


export const CartSidebar: React.FC = () => {
  const { cartItems, cartSubtotal, shippingCost, cartTotal, itemCount, isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300 ease-in-out" onClick={closeCart}>
      <div 
        className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-poppins font-semibold">Your Cart ({itemCount})</h2>
          <Button variant="ghost" onClick={closeCart} className="p-2" aria-label="Close cart">
            <XIcon className="w-6 h-6" />
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <img src="https://picsum.photos/seed/emptycart/200/200" alt="Empty cart" className="w-40 h-40 mb-4 opacity-50" />
            <p className="text-gray-600 text-lg">Your cart is feeling a bit lonely.</p>
            <Button to="/shop" variant="primary" className="mt-6" onClick={closeCart}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.map(item => (
                <CartItemCard key={`${item.id}-${item.selectedSize || 'default'}`} item={item} />
              ))}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 && cartSubtotal > 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Button to="/checkout" variant="primary" size="lg" className="w-full" onClick={closeCart} disabled={cartItems.length === 0}>
                Proceed to Checkout
              </Button>
              <Button to="/cart" variant="outline" size="md" className="w-full mt-3" onClick={closeCart} disabled={cartItems.length === 0}>
                View Full Cart Page
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

    