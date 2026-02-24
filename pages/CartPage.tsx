
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/Button';
import { CartItem as CartItemType } from '../types';
import { TrashIcon, ArrowLeftIcon } from '../components/Icons';

const CartItemRow: React.FC<{ item: CartItemType }> = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b">
      <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6" />
      <div className="flex-grow text-center sm:text-left">
        <Link to={`/product/${item.id}`} className="font-poppins text-lg font-semibold hover:text-accent">{item.name}</Link>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        <div className="text-xs text-gray-400 mt-1 flex justify-center sm:justify-start space-x-2">
          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
          {(!item.selectedSize && !item.selectedColor) && <span className="italic">Unique Item</span>}
        </div>
      </div>
      <p className="font-poppins text-lg font-semibold text-accent w-24 text-center sm:text-right sm:mx-6">${item.price.toFixed(2)}</p>
      <Button variant="ghost" onClick={() => removeFromCart(item.cartItemId)} className="p-2 text-gray-500 hover:text-red-500 ml-0 sm:ml-4 mt-2 sm:mt-0" aria-label="Remove item">
        <TrashIcon className="w-5 h-5" />
      </Button>
    </div>
  );
};

export const CartPage: React.FC = () => {
  const { cartItems, cartSubtotal, shippingCost, cartTotal, clearCart, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="container mx-auto text-center py-12">
        <img src="https://picsum.photos/seed/emptycartpage/300/250" alt="Empty Cart Illustration" className="mx-auto mb-8 opacity-70 rounded-lg" />
        <h1 className="font-poppins text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet. Explore our collections!</p>
        <Button to="/shop" variant="primary" size="lg">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-8">Your Shopping Cart</h1>
      
      <div className="bg-white shadow-xl rounded-lg p-6">
        <div className="hidden sm:flex font-semibold text-gray-600 border-b pb-3 mb-3 text-sm">
          <div className="w-3/5">Product</div>
          <div className="w-1/5 text-right">Price</div>
          <div className="w-1/5 text-right">Remove</div>
        </div>

        {cartItems.map(item => (
          <CartItemRow key={item.cartItemId} item={item} />
        ))}

        <div className="mt-8 flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-auto mb-6 md:mb-0">
             <Button to="/shop" variant="outline" className="text-sm">
               <ArrowLeftIcon className="w-4 h-4 mr-2" /> Continue Shopping
            </Button>
            <Button variant="ghost" onClick={clearCart} className="ml-4 text-sm text-red-600 hover:text-red-800">
              Clear Cart
            </Button>
          </div>

          <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-50 p-6 rounded-lg">
            <h2 className="font-poppins text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <hr className="my-2"/>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button to="/checkout" variant="primary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};