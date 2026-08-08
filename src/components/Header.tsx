import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { LOGO_IMAGE } from '../data/products';
import { ShoppingBag, Search, Sparkles, Menu, X, MapPin } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsBespokeOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  setIsSearchOpen,
  setIsBespokeOpen,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Collection' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Desk' },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/90 backdrop-blur-md border-b border-[#d3c3be]/30 transition-all duration-300">
      {/* Stable Static Top Banner */}
      <div className="bg-[#090100] text-[#ffffff] text-[11px] sm:text-xs font-body tracking-wider py-2 px-4 border-b border-[#2c1810]">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center gap-3 sm:gap-6 flex-wrap">
          <span className="text-[#fdc087] font-semibold tracking-widest uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#fdc087]" />
            COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING
          </span>
          <span className="hidden sm:inline text-[#504440]">•</span>
          <button
            onClick={() => { setActiveTab('shop'); window.scrollTo(0, 0); }}
            className="hover:text-[#fdc087] transition-colors flex items-center gap-1.5 cursor-pointer font-medium tracking-wide uppercase text-slate-200"
          >
            <span>Complimentary Custom Monogramming & Engraving</span>
          </button>
          <span className="hidden md:inline text-[#504440]">•</span>
          <span className="hidden md:inline text-[#fdc087] font-semibold tracking-widest uppercase">
            HANDCRAFTED IN TUSCANY & PARIS
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#1b1c19] hover:text-[#825425] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <img
              src={LOGO_IMAGE}
              alt="Al Sumora Heritage Logo"
              referrerPolicy="no-referrer"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl sm:text-2xl tracking-wider text-[#090100] uppercase">
                AL SUMORA
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#825425] uppercase font-semibold -mt-1">
                HERITAGE • PARIS
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
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
              </button>
            );
          })}
        </nav>

        {/* Right Actions Header */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Bespoke Studio Shortcut */}
          <button
            onClick={() => setIsBespokeOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#825425]/40 text-[#825425] hover:bg-[#825425] hover:text-white transition-all text-xs font-semibold tracking-wider uppercase cursor-pointer"
            title="Open Bespoke Monogramming Studio"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Monogramming</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#1b1c19] hover:text-[#825425] transition-colors rounded-full hover:bg-[#f0eee9] cursor-pointer"
            title="Search Collection"
            aria-label="Search Collection"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-[#1b1c19] hover:text-[#825425] transition-colors relative rounded-full hover:bg-[#f0eee9] cursor-pointer"
            title="View Shopping Bag"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#825425] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fbf9f4] border-b border-[#d3c3be]/40 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-base font-medium py-2 border-b border-[#e4e2dd]/60 flex items-center justify-between ${
                  activeTab === item.id ? 'text-[#825425] font-semibold' : 'text-[#1b1c19]'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="w-2 h-2 rounded-full bg-[#825425]" />}
              </button>
            ))}
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
