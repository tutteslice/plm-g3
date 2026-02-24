
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import { CartItem } from '../types'; // Direct import
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../constants';
import { ArrowLeftIcon } from '../components/Icons';

interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone?: string;
}

export const CheckoutPage: React.FC = () => {
  const { cartItems, cartSubtotal, shippingCost, cartTotal, clearCart, itemCount } = useCart();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '', address: '', city: '', postalCode: '', country: 'United States', email: '', phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | ''>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.id]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    // Basic validation for shipping form
    for (const key in shippingInfo) {
        if (key !== 'phone' && !(shippingInfo[key as keyof ShippingInfo] as string).trim()) {
            alert(`Please fill in ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
            return;
        }
    }
    
    setIsProcessing(true);
    console.log("Order submitted:", { shippingInfo, cartItems, cartTotal, paymentMethod });
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2500);
  };

  if (itemCount === 0 && !orderPlaced) {
    navigate('/shop'); // Redirect if cart is empty and order not just placed
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto text-center py-16">
        <img src="https://picsum.photos/seed/thankyou/200/200" alt="Order confirmed" className="mx-auto mb-6 rounded-full"/>
        <h1 className="font-poppins text-3xl font-bold text-green-600 mb-4">Thank You For Your Order!</h1>
        <p className="text-gray-700 mb-2">Your order has been successfully placed.</p>
        <p className="text-gray-700 mb-6">A confirmation email has been sent to {shippingInfo.email}.</p>
        <Button to="/shop" variant="primary" size="lg">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
       <Button variant="ghost" onClick={() => navigate('/cart')} className="mb-6 text-sm">
        <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back to Cart
      </Button>
      <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-center mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Information */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="font-poppins text-xl font-semibold mb-6">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField id="fullName" label="Full Name" value={shippingInfo.fullName} onChange={handleShippingChange} required />
            <FormField id="email" label="Email" type="email" value={shippingInfo.email} onChange={handleShippingChange} required />
            <FormField id="address" label="Street Address" value={shippingInfo.address} onChange={handleShippingChange} className="md:col-span-2" required />
            <FormField id="city" label="City" value={shippingInfo.city} onChange={handleShippingChange} required />
            <FormField id="postalCode" label="Postal Code" value={shippingInfo.postalCode} onChange={handleShippingChange} required />
            <FormField id="country" label="Country" value={shippingInfo.country} onChange={handleShippingChange} required />
            <FormField id="phone" label="Phone (Optional)" type="tel" value={shippingInfo.phone || ''} onChange={handleShippingChange} />
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-28"> {/* Sticky for summary */}
            <h2 className="font-poppins text-xl font-semibold mb-4">Order Summary</h2>
            <div className="max-h-60 overflow-y-auto mb-4 border-b pb-2">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="flex justify-between items-center py-2 text-sm">
                  <div className="flex items-center">
                    <img src={item.images[0]} alt={item.name} className="w-10 h-10 object-cover rounded mr-2" />
                    <span>{item.name} <span className="text-xs text-gray-400 italic">(Unique)</span></span>
                  </div>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1 mb-4 text-sm">
              <div className="flex justify-between"><span>Subtotal:</span> <span>${cartSubtotal.toFixed(2)}</span></div>
              <div className="flex justify-between">
                <span>Shipping:</span> 
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1 border-t mt-1">
                <span>Total:</span> 
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-4">Shipping is a flat rate of ${SHIPPING_COST.toFixed(2)}, or free for orders over ${FREE_SHIPPING_THRESHOLD.toFixed(2)}.</p>
            
            <h3 className="font-poppins text-lg font-semibold my-4">Payment Method</h3>
            <div className="space-y-3 mb-6">
              <Button 
                type="button" 
                variant={paymentMethod === 'stripe' ? 'primary' : 'outline'} 
                onClick={() => setPaymentMethod('stripe')}
                className="w-full justify-start"
              >
                <img src="https://js.stripe.com/v3/fingerprinted/img/stripe-logo-blurple.45539351135730602AF0ECAC274017F4.svg" alt="Stripe" className="h-5 mr-2"/> Pay with Card (Stripe)
              </Button>
              <Button 
                type="button" 
                variant={paymentMethod === 'paypal' ? 'primary' : 'outline'} 
                onClick={() => setPaymentMethod('paypal')}
                className="w-full justify-start"
              >
                 <img src="https://www.paypalobjects.com/images/shared/developer/logo/PP_Desk_FC_palette.png" alt="PayPal" className="h-5 mr-2"/> PayPal
              </Button>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isProcessing} disabled={isProcessing || !paymentMethod}>
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};