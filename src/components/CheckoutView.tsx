import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export const CheckoutView: React.FC = () => {
  const { user } = useAuthStore();
  const { cartItems, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.role === 'customer' ? (user as any).phone || '' : ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50; // Simple logic
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const formattedItems = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        monogram: item.monogram
      }));

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          items: formattedItems,
          customerInfo,
          shippingAddress
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      clearCart();
      navigate('/account'); // Navigate to account page where order history is
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-display font-bold mb-4">Authentication Required</h2>
        <p className="mb-6 text-[#504440]">Create an account or sign in to continue.</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-[#090100] text-white px-8 py-3 rounded uppercase font-semibold text-sm hover:bg-[#825425] transition-colors"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-display font-bold mb-4">Your Cart is Empty</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-[#090100] text-white px-8 py-3 rounded uppercase font-semibold text-sm hover:bg-[#825425] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:flex lg:gap-12 items-start">
      {/* Checkout Form */}
      <div className="lg:w-2/3 bg-white p-8 rounded-xl border border-[#d3c3be]/40 shadow-sm">
        <h2 className="font-display text-2xl font-bold mb-6">Secure Checkout</h2>
        
        {error && (
          <div className="p-3 mb-6 bg-red-50 text-red-600 rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="space-y-8">
          {/* Contact Info */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#825425] mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Name</label>
                <input 
                  type="text" required
                  value={customerInfo.name}
                  onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full border border-[#d3c3be]/60 p-2.5 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Email</label>
                <input 
                  type="email" required
                  value={customerInfo.email}
                  onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="w-full border border-[#d3c3be]/60 p-2.5 rounded text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">Phone</label>
                <input 
                  type="tel" required
                  value={customerInfo.phone}
                  onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full border border-[#d3c3be]/60 p-2.5 rounded text-sm"
                />
              </div>
            </div>
          </section>

          {/* Shipping Info */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#825425] mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1">Street Address</label>
                <input 
                  type="text" required
                  value={shippingAddress.address}
                  onChange={e => setShippingAddress({...shippingAddress, address: e.target.value})}
                  className="w-full border border-[#d3c3be]/60 p-2.5 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">City</label>
                <input 
                  type="text" required
                  value={shippingAddress.city}
                  onChange={e => setShippingAddress({...shippingAddress, city: e.target.value})}
                  className="w-full border border-[#d3c3be]/60 p-2.5 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">State / Province</label>
                <input 
                  type="text" required
                  value={shippingAddress.state}
                  onChange={e => setShippingAddress({...shippingAddress, state: e.target.value})}
                  className="w-full border border-[#d3c3be]/60 p-2.5 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">ZIP / Postal Code</label>
                <input 
                  type="text" required
                  value={shippingAddress.pincode}
                  onChange={e => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                  className="w-full border border-[#d3c3be]/60 p-2.5 rounded text-sm"
                />
              </div>
            </div>
          </section>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#090100] text-white py-4 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#825425] transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing Order...' : 'Place Order securely'}
          </button>
        </form>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:w-1/3 mt-8 lg:mt-0 bg-[#f5f3ee] p-6 rounded-xl border border-[#d3c3be]/40">
        <h3 className="font-display text-lg font-bold mb-4 border-b border-[#d3c3be]/40 pb-4">Order Summary</h3>
        
        <div className="space-y-4 max-h-[40vh] overflow-y-auto mb-6">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-16 h-16 bg-white rounded border border-[#d3c3be]/40 overflow-hidden flex-shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#090100] leading-tight line-clamp-1">{item.product.name}</h4>
                <div className="text-xs text-[#827470] mt-1 space-y-0.5">
                  <p>Color: {item.selectedColor.name}</p>
                  <p>Qty: {item.quantity}</p>
                  {item.monogram && <p>Monogram: {item.monogram.initials} ({item.monogram.finish})</p>}
                </div>
              </div>
              <div className="text-sm font-semibold">
                ₹{(item.product.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-4 border-t border-[#d3c3be]/40 text-sm">
          <div className="flex justify-between">
            <span className="text-[#504440]">Subtotal</span>
            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#504440]">Shipping</span>
            <span className="font-medium">{shipping === 0 ? 'Complimentary' : `₹${shipping.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-[#d3c3be]/40 text-base font-bold text-[#090100]">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
