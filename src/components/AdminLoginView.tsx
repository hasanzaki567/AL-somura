import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Shield, ArrowRight } from 'lucide-react';
import { API_URL } from '../config';

export const AdminLoginView: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok) {
        login(data);
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid admin credentials');
      }
    } catch (err) {
      setError('Server connection failed. Please check backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbf9f4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-[#d3c3be]/40">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[#f0eee9] rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-[#825425]" />
          </div>
          <h2 className="mt-6 text-3xl font-display font-bold text-[#090100]">
            Atelier Administration
          </h2>
          <p className="mt-2 text-sm text-[#827470]">
            Enter your admin username and passphrase to access the concierge portal.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded border border-red-200 text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-semibold text-[#504440] uppercase tracking-wider mb-1">
                Admin Username or Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full border border-[#d3c3be] px-4 py-3 rounded-lg focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] transition-colors"
                placeholder="Username or Admin Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-[#504440] uppercase tracking-wider mb-1">
                Passphrase
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full border border-[#d3c3be] px-4 py-3 rounded-lg focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] transition-colors"
                placeholder="Admin Passphrase"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#090100] hover:bg-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#825425] transition-colors disabled:opacity-70"
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
