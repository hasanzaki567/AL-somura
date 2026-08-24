import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_IMAGE } from '../data/products';
import { ShoppingBag, Search, Sparkles, Menu, X, MapPin, Heart, User, Truck } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useWishlistStore } from '../store/wishlistStore';
import { API_URL } from '../config';

interface HeaderProps {
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsBespokeOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  setIsCartOpen,
  setIsSearchOpen,
  setIsBespokeOpen,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();
  const { wishlistItems, setIsWishlistOpen } = useWishlistStore();
  const wishlistCount = wishlistItems.length;
  const [hasOrders, setHasOrders] = useState(false);

  useEffect(() => {
    if (!user) {
      setHasOrders(false);
      return;
    }

    const checkOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/myorders?t=${Date.now()}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setHasOrders(data && data.length > 0);
        }
      } catch (err) {
        console.error('Failed to check user orders', err);
        setHasOrders(false);
      }
    };

    checkOrders();
  }, [user]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop Collection' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Desk' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/90 backdrop-blur-md border-b border-[#d3c3be]/30 transition-all duration-300">
      {/* Stable Static Top Banner */}
      <div className="hidden sm:block bg-[#090100] text-[#ffffff] text-[11px] sm:text-xs font-body tracking-wider py-2 px-4 border-b border-[#2c1810]">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center gap-3 sm:gap-6 flex-wrap">
          <span className="text-[#fdc087] font-semibold tracking-widest uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#fdc087]" />
            COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING
          </span>
          <span className="hidden sm:inline text-[#504440]">•</span>
          <Link
            to="/shop"
            onClick={() => window.scrollTo(0, 0)}
            className="hover:text-[#fdc087] transition-colors flex items-center gap-1.5 cursor-pointer font-medium tracking-wide uppercase text-slate-200"
          >
            <span>Complimentary Custom Monogramming & Engraving</span>
          </Link>
          <span className="hidden md:inline text-[#504440]">•</span>
          <span className="hidden md:inline text-[#fdc087] font-semibold tracking-widest uppercase">
            HANDCRAFTED IN TUSCANY & PARIS
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-[#1b1c19] hover:text-[#825425] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            onClick={() => handleNavClick()}
            className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer"
          >
            <img
              src={LOGO_IMAGE}
              alt="Al Sumora Heritage Logo"
              referrerPolicy="no-referrer"
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm sm:text-2xl tracking-wider text-[#090100] uppercase leading-none">
                AL SUMORA
              </span>
              <span className="text-[7px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#825425] uppercase font-semibold mt-0.5 leading-none">
                HERITAGE • PARIS
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleNavClick()}
                className={`relative py-2 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#090100] font-semibold'
                    : 'text-[#504440] hover:text-[#825425]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#825425] transition-all" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions Header */}
        <div className="flex items-center space-x-1.5 sm:space-x-5">
          {/* Track Order Shortcut */}
          {user && hasOrders && (
            <Link
              to="/track"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#825425]/40 text-[#825425] hover:bg-[#825425] hover:text-white transition-all text-xs font-semibold tracking-wider uppercase cursor-pointer"
              title="Track Your Order"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </Link>
          )}

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-[#1b1c19] hover:text-[#825425] transition-colors rounded-full hover:bg-[#f0eee9] cursor-pointer"
            title="Search Collection"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="p-1.5 text-[#1b1c19] hover:text-[#825425] transition-colors relative rounded-full hover:bg-[#f0eee9] cursor-pointer"
            title="Saved Wishlist"
            aria-label="Saved Wishlist"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlistCount > 0 ? 'fill-[#825425] text-[#825425]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#825425] text-white text-[8px] sm:text-[10px] font-bold w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Bag Link */}
          <Link
            to="/cart"
            className="p-1.5 text-[#1b1c19] hover:text-[#825425] transition-colors relative rounded-full hover:bg-[#f0eee9] cursor-pointer"
            title="View Shopping Bag"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#825425] text-white text-[8px] sm:text-[10px] font-bold w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account/Profile Link */}
          <Link
            to={user ? (user.role === 'admin' ? '/admin' : '/account') : '/login'}
            className="p-1.5 text-[#1b1c19] hover:text-[#825425] transition-colors rounded-full hover:bg-[#f0eee9] cursor-pointer flex text-sm font-medium items-center gap-1.5"
            title={user ? `Account (${user.name})` : "Sign In"}
            aria-label={user ? `Account (${user.name})` : "Sign In"}
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            {user && (
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">
                {user.name.split(' ')[0]}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fbf9f4] border-b border-[#d3c3be]/40 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleNavClick()}
                className={`text-left text-base font-medium py-2 border-b border-[#e4e2dd]/60 flex items-center justify-between ${
                  location.pathname === item.path ? 'text-[#825425] font-semibold' : 'text-[#1b1c19]'
                }`}
              >
                <span>{item.label}</span>
                {location.pathname === item.path && <span className="w-2 h-2 rounded-full bg-[#825425]" />}
              </Link>
            ))}
            
            <Link
              to={user ? (user.role === 'admin' ? '/admin' : '/account') : '/login'}
              onClick={() => handleNavClick()}
              className="text-left text-base font-medium py-2 border-b border-[#e4e2dd]/60 flex items-center justify-between text-[#1b1c19]"
            >
              <span>{user ? 'My Account' : 'Sign In'}</span>
            </Link>

            <Link
              to="/wishlist"
              onClick={() => handleNavClick()}
              className="text-left text-base font-medium py-2 border-b border-[#e4e2dd]/60 flex items-center justify-between text-[#1b1c19]"
            >
              <span>Saved Wishlist</span>
              {wishlistCount > 0 && <span className="bg-[#825425] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{wishlistCount}</span>}
            </Link>

            <Link
              to="/cart"
              onClick={() => handleNavClick()}
              className="text-left text-base font-medium py-2 border-b border-[#e4e2dd]/60 flex items-center justify-between text-[#1b1c19]"
            >
              <span>Shopping Bag</span>
              {cartCount > 0 && <span className="bg-[#825425] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsBespokeOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#090100] text-white py-3 rounded-md text-xs font-semibold tracking-wider uppercase"
            >
              <Sparkles className="w-4 h-4 text-[#fdc087]" />
              <span>Bespoke Monogram Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
