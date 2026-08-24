import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductColor } from '../types';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: ProductColor, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onSelectProduct,
}) => {
  const navigate = useNavigate();
  const { wishlistItems, removeItem, clearWishlist } = useWishlistStore();

  if (!isOpen) return null;

  const handleMoveToCart = (product: Product) => {
    const defaultColor = product.colors[0] || { name: 'Natural', hex: '#8c5e3c', image: product.images[0] };
    onAddToCart(product, defaultColor, 1);
    removeItem(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090100]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Centered Floating Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#fbf9f4] text-[#1b1c19] shadow-2xl rounded-2xl flex flex-col max-h-[85vh] border border-[#d3c3be]/40 overflow-hidden animate-in zoom-in-95 duration-200 z-10">
        
        {/* Header */}
        <div className="p-6 bg-[#f5f3ee] border-b border-[#d3c3be]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#825425] text-[#825425]" />
            <span className="font-display font-bold text-lg text-[#090100]">Saved Wishlist</span>
            <span className="text-xs bg-[#825425] text-white px-2.5 py-0.5 rounded-full font-semibold">
              {wishlistItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#504440] hover:text-[#090100] transition-colors rounded-full hover:bg-[#e4e2dd] cursor-pointer"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader Banner */}
        <div className="bg-[#2c1810] text-[#fbf9f4] px-6 py-2 text-xs flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[#fdc087] font-medium">
            <Heart className="w-4 h-4 fill-[#fdc087]" /> Your Personal Collection of Leather Masterpieces
          </span>
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-[10px] text-[#d3c3be] hover:text-white underline cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {/* scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f0eee9] flex items-center justify-center mx-auto text-[#825425]">
                <Heart className="w-8 h-8 text-[#825425]" />
              </div>
              <h3 className="font-display font-semibold text-lg text-[#090100]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#827470] max-w-xs mx-auto leading-relaxed">
                Explore our handcrafted leather collection and tap the heart icon on items you'd like to save for later.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/shop');
                }}
                className="mt-2 px-6 py-2.5 bg-[#090100] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#825425] transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            wishlistItems.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-4 rounded-xl bg-white border border-[#d3c3be]/35 shadow-2xs relative"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="w-20 h-20 object-cover bg-[#f5f3ee] rounded-lg p-1 border border-[#e4e2dd] cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="font-display font-semibold text-sm sm:text-base text-[#090100] leading-tight hover:text-[#825425] transition-colors cursor-pointer truncate"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-[#827470] hover:text-red-600 transition-colors p-1 flex-shrink-0"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#825425] font-semibold uppercase tracking-wider mt-0.5">
                      {product.category}
                    </div>

                    <div className="font-semibold text-sm sm:text-base text-[#090100] mt-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#f0eee9]">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1 py-2 px-3 bg-[#090100] hover:bg-[#825425] text-white rounded text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#fdc087]" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="p-6 bg-[#f5f3ee] border-t border-[#d3c3be]/40 space-y-3">
            <button
              onClick={() => {
                onClose();
                navigate('/shop');
              }}
              className="w-full bg-[#090100] hover:bg-[#2c1810] text-white py-3.5 px-6 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4 text-[#fdc087]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
