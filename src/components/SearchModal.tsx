import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#090100]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#fbf9f4] w-full max-w-2xl rounded-xl shadow-2xl border border-[#d3c3be]/60 overflow-hidden relative text-[#1b1c19]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 bg-[#f5f3ee] border-b border-[#d3c3be]/40 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#825425]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search briefcases, totes, wallets, cardholders..."
            className="w-full bg-transparent text-sm md:text-base text-[#090100] placeholder-[#827470] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#504440] hover:text-[#090100] transition-colors rounded-full hover:bg-[#e4e2dd] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-3 bg-[#f0eee9] flex items-center gap-2 overflow-x-auto text-xs text-[#504440] border-b border-[#d3c3be]/30">
          <span className="font-semibold text-[#825425] shrink-0">Popular:</span>
          {['Briefcase', 'Tote', 'Wallet', 'Monogram', 'Weekender'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded bg-white hover:bg-[#825425] hover:text-white transition-colors cursor-pointer shrink-0 border border-[#d3c3be]/40"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#827470]">
              No leather creations found matching "{query}".
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 rounded-lg hover:bg-[#f0eee9] transition-all flex items-center justify-between cursor-pointer group border border-transparent hover:border-[#d3c3be]/40"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain bg-white rounded p-1 border border-[#e4e2dd]"
                  />
                  <div>
                    <div className="font-display font-semibold text-sm text-[#090100]">
                      {product.name}
                    </div>
                    <div className="text-xs text-[#825425] font-medium">
                      {product.category} • ₹{product.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="text-[#825425] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-semibold">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
