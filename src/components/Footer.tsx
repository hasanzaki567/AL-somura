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
    <footer className="bg-[#090100] text-[#fbf9f4] pt-16 pb-12 border-t border-[#2c1810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">
          {/* Brand Info & Social Media Links */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_IMAGE}
                alt="Al Sumora Logo"
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain brightness-200"
              />
              <span className="font-display font-bold text-xl tracking-wider text-white">
                AL SUMORA
              </span>
            </div>
            <p className="text-xs text-[#d3c3be] leading-relaxed">
              Maison de Cuir since 1984. Dedicated to preserving saddlery traditions, vegetable tanning, and hand-embossing.
            </p>
            <div className="text-xs text-[#fdc087] font-medium">
              Atelier & Private Concierge Services
            </div>

            {/* Social Media & Direct Contact Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="Follow on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/442079460912"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="tel:+442079460912"
                className="w-8 h-8 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="Call Concierge"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href="mailto:concierge@alsumora.com"
                className="w-8 h-8 rounded-full bg-[#1b1c19] border border-[#504440] hover:border-[#fdc087] hover:text-[#fdc087] flex items-center justify-center transition-colors cursor-pointer text-[#d3c3be]"
                title="Email Desk"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fdc087] mb-4">
              Explore Collection
            </h4>
            <ul className="space-y-2 text-xs text-[#d3c3be]">
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  All Goods & Leather
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Executive Briefcases
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Heritage Totes
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Fine Wallets & Cardholders
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => window.scrollTo(0,0)} className="text-[#fdc087] font-semibold hover:underline flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Customization & Details
                </Link>
              </li>
            </ul>
          </div>

          {/* House & Heritage */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fdc087] mb-4">
              Maison & Services
            </h4>
            <ul className="space-y-2 text-xs text-[#d3c3be]">
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Our Heritage & History
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Artisan Leather Care
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">
                  Concierge Inquiry Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fdc087] mb-4">
              The Al Sumora Gazette
            </h4>
            <p className="text-xs text-[#d3c3be] mb-4">
              Subscribe for private previews of seasonal leather releases and invitation-only atelier events.
            </p>
            
            {subscribed ? (
              <div className="p-3 bg-[#2c1810] text-[#fdc087] rounded text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you. You are enrolled in the Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1b1c19] border border-[#504440] text-white text-xs px-3 py-2.5 rounded focus:outline-none focus:border-[#fdc087] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 bg-[#825425] text-white rounded hover:bg-[#fdc087] hover:text-[#090100] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Copyright & Sub-footer */}
        <div className="pt-8 border-t border-[#2c1810] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#827470]">
          <div>
            &copy; {new Date().getFullYear()} Al Sumora Heritage Maison de Cuir. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
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
              Terms of Service
            </button>
            <span className="text-[#504440]">|</span>
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
