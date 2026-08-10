import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export const AuthView: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { cartItems } = useCartStore(); // In a real app we'd merge carts here

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { email, password }
        : { name, email, password, phone };

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      login(data);
      
      // If user is admin go to admin, else if cart has items go to checkout, else go to account
      if (data.role === 'admin') {
        navigate('/admin');
      } else if (cartItems.length > 0) {
        navigate('/checkout');
      } else {
        navigate('/account');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#fbf9f4]">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-[#d3c3be]/40 w-full max-w-md">
        <h2 className="font-display text-3xl font-bold text-center text-[#090100] mb-2">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="text-center text-sm text-[#827470] mb-8">
          {isLogin 
            ? 'Access your private client dashboard.'
            : 'Join our exclusive list of clients.'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-medium text-[#1b1c19] mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#d3c3be]/60 p-2.5 rounded focus:outline-none focus:border-[#825425] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1b1c19] mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#d3c3be]/60 p-2.5 rounded focus:outline-none focus:border-[#825425] text-sm"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-[#1b1c19] mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#d3c3be]/60 p-2.5 rounded focus:outline-none focus:border-[#825425] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1b1c19] mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#d3c3be]/60 p-2.5 rounded focus:outline-none focus:border-[#825425] text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#090100] text-white py-3 rounded text-sm font-semibold tracking-wide uppercase hover:bg-[#825425] transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#504440]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-[#825425] font-semibold hover:underline"
          >
            {isLogin ? 'Create one here' : 'Sign in here'}
          </button>
        </div>
      </div>
    </div>
  );
};
