import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductColor } from '../types';
import { Heart, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';

export const WishlistView: React.FC = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeItem, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleMoveToCart = (product: Product) => {
    const defaultColor = product.colors[0] || { name: 'Natural', hex: '#8c5e3c', image: product.images[0] };
    addToCart(product, defaultColor, 1);
    removeItem(product.id);
  };

  return (
    <div className="bg-[#fbf9f4] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#825425] hover:text-[#090100] transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Continue Shopping</span>
        </button>

        {/* Page Title */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#d3c3be]/40 pb-6 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#825425]">
              Maison de Cuir
            </span>
            <div className="flex items-center gap-3 mt-1">
              <Heart className="w-6 h-6 fill-[#825425] text-[#825425]" />
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#090100]">
                Saved Wishlist
              </h1>
              <span className="text-xs bg-[#825425] text-white px-2.5 py-0.5 rounded-full font-semibold">
                {wishlistItems.length}
              </span>
            </div>
          </div>
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-semibold text-[#827470] hover:text-[#090100] underline cursor-pointer"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#d3c3be]/40 p-16 text-center shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#f0eee9] flex items-center justify-center mx-auto text-[#825425] mb-4">
              <Heart className="w-8 h-8 text-[#825425]" />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#090100] mb-2">Your wishlist is empty</h3>
            <p className="text-xs text-[#504440] leading-relaxed max-w-xs mx-auto mb-6">
              Browse our handcrafted collection and click the heart icon on your favorite pieces to save them here.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#090100] text-white hover:bg-[#825425] py-3.5 px-8 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group bg-white rounded-lg sm:rounded-2xl border border-[#d3c3be]/35 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/3] bg-[#f5f3ee] overflow-hidden flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-[#090100]/90 text-white text-[8px] sm:text-[9px] font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded tracking-wider uppercase">
                    {product.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(product.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white/95 text-[#827470] hover:text-red-600 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content Info */}
                <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-1.5">
                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="font-display font-medium text-[#090100] hover:text-[#825425] transition-colors text-xs sm:text-base line-clamp-1 sm:line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-[#827470] line-clamp-2 leading-relaxed hidden sm:block">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#f0eee9] flex items-center justify-between gap-1">
                    <span className="text-xs sm:text-base font-bold text-[#825425]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveToCart(product);
                      }}
                      className="p-1.5 sm:px-4 sm:py-2 bg-[#090100] hover:bg-[#825425] text-white rounded text-[10px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Move to Shopping Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#fdc087]" />
                      <span className="hidden sm:inline">Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
