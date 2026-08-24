import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_IMAGE } from '../data/products';
import { ArrowRight, CheckCircle2, Sparkles, Instagram, Facebook, Phone, MessageCircle, Mail } from 'lucide-react';

interface FooterProps {
  setIsBespokeOpen?: (open: boolean) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#090100] text-[#fbf9f4] pt-6 pb-4 sm:pt-10 sm:pb-8 border-t border-[#2c1810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 md:gap-8 pb-6 sm:pb-8">
          {/* Brand Info & Social Media Links */}
          <div className="space-y-2 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <img
                src={LOGO_IMAGE}
                alt="Al Sumora Logo"
                referrerPolicy="no-referrer"
                className="h-6 sm:h-8 w-auto object-contain brightness-200"
              />
              <span className="font-display font-bold text-sm sm:text-base tracking-wider text-white">
                AL SUMORA
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-[#d3c3be] leading-relaxed">
              Maison de Cuir since 1984. Preserving saddlery traditions, vegetable tanning, and hand-embossing.
            </p>
            <div className="text-[10px] sm:text-xs text-[#fdc087] font-medium">
              Atelier Concierge Services
            </div>

            {/* Social Media & Direct Contact Icons */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="Follow on Instagram"
              >
                <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="Follow on Facebook"
              >
                <Facebook className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>

              <a
                href="https://wa.me/442079460912"
                target="_blank"
                rel="noreferrer"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>

              <a
                href="tel:+442079460912"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="Call Concierge"
              >
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>

              <a
                href="mailto:concierge@alsumora.com"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="Email Desk"
              >
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-[9px] sm:text-xs font-semibold uppercase tracking-widest text-[#fdc087] mb-2 sm:mb-3">
              Collection
            </h4>
            <ul className="space-y-1 text-[10px] sm:text-xs text-[#d3c3be]">
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  All Goods & Leather
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Briefcases
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Heritage Totes
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Fine Wallets
                </Link>
              </li>
            </ul>
          </div>

          {/* House & Heritage */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-[9px] sm:text-xs font-semibold uppercase tracking-widest text-[#fdc087] mb-2 sm:mb-3">
              Maison
            </h4>
            <ul className="space-y-1 text-[10px] sm:text-xs text-[#d3c3be]">
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Leather Care
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Concierge Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[9px] sm:text-xs font-semibold uppercase tracking-widest text-[#fdc087] mb-2 sm:mb-3">
              Newsletter
            </h4>
            <p className="text-[10px] sm:text-xs text-[#d3c3be] mb-2 sm:mb-3">
              Private previews of seasonal leather releases and events.
            </p>
            
            {subscribed ? (
              <div className="p-2 bg-[#2c1810] text-[#fdc087] rounded text-[10px] sm:text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>You are enrolled.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-1.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1b1c19] border border-[#504440] text-white text-[10px] sm:text-xs px-2.5 py-1.5 rounded focus:outline-none focus:border-[#fdc087] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 p-1 bg-[#825425] text-white rounded hover:bg-[#fdc087] hover:text-[#090100] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Copyright & Sub-footer */}
        <div className="pt-4 sm:pt-6 border-t border-[#2c1810] flex flex-col md:flex-row items-center justify-between text-[9px] sm:text-[10px] text-[#827470] gap-3">
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Al Sumora Heritage Maison de Cuir.
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#d3c3be] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#d3c3be] transition-colors cursor-pointer"
            >
              Terms
            </button>
            <span className="text-[#504440] hidden sm:inline">|</span>
            <Link
              to="/admin-login"
              onClick={() => window.scrollTo(0,0)}
              className="text-[#504440] hover:text-[#d3c3be] transition-colors cursor-pointer"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
