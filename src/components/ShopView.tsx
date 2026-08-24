import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductColor, Category } from '../types';
import { Filter, ChevronDown, Eye, Sparkles, Heart } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { API_URL } from '../config';

interface ShopViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, color: ProductColor) => void;
  setIsBespokeOpen?: (open: boolean) => void;
}

const CATEGORIES: Category[] = ['All', 'Jackets', 'Shoes', 'Briefcases', 'Wallets', 'Bags', 'Accessories'];

export const ShopView: React.FC<ShopViewProps> = ({
  onSelectProduct,
  onQuickAddToCart,
  setIsBespokeOpen,
}) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam) {
      const matched = CATEGORIES.find(c => c.toLowerCase() === catParam.toLowerCase());
      if (matched) {
        setActiveCategory(matched);
      }
    }
  }, [window.location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (activeCategory !== 'All') queryParams.append('category', activeCategory);
        if (search) queryParams.append('search', search);

        // Fetch from new backend API
        const res = await fetch(`${API_URL}/api/products?${queryParams}&t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          // Transform _id to id if necessary, but we'll map it inline
          setProducts(data.map((p: any) => ({ ...p, id: p._id || p.id })));
        } else {
          // Fallback if backend isn't up
          const { PRODUCTS } = await import('../data/products');
          setProducts(PRODUCTS);
        }
      } catch (error) {
        // Fallback for development if express server isn't running
        const { PRODUCTS } = await import('../data/products');
        setProducts(PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, search]);

  const filteredAndSortedProducts = [...products]
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default / Featured
      if (sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
      }
      return 0;
    });

  return (
    <div className="bg-[#fbf9f4] min-h-screen pt-4 sm:pt-6">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:items-start">
          
          {/* Filters Sidebar (Desktop) & Collapsible (Mobile) */}
          <div className="w-full lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-32 space-y-8 bg-white p-4 sm:p-6 rounded-xl border border-[#d3c3be]/40 shadow-sm">
              <div className="flex items-center justify-between lg:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-[#090100] flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5" /> Filters & Categories
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </div>

              <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block space-y-8 mt-6 lg:mt-0`}>
                {/* Categories */}
                <div>
                  <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#825425] mb-3 sm:mb-4">Categories</h3>
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-left text-xs sm:text-sm py-1 sm:py-1.5 transition-colors ${
                          activeCategory === cat 
                            ? 'font-semibold text-[#090100] translate-x-1' 
                            : 'text-[#504440] hover:text-[#825425] hover:translate-x-1'
                        } transform duration-200`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#825425] mb-3 sm:mb-4">Sort By</h3>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-[#f5f3ee] border border-[#d3c3be]/60 text-xs sm:text-sm p-2 rounded focus:outline-none focus:border-[#825425]"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>

                {/* Search */}
                <div>
                  <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#825425] mb-3 sm:mb-4">Search</h3>
                  <input
                    type="text"
                    placeholder="Search collection..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#f5f3ee] border border-[#d3c3be]/60 text-xs sm:text-sm p-2 rounded focus:outline-none focus:border-[#825425]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid — scrolls independently on desktop */}
          <div className="flex-1 w-full lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-1 scrollbar-thin mt-2">

            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse bg-white rounded-xl border border-[#e8e0d8] aspect-[3/4]"></div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#d3c3be]/40 p-8 sm:p-16 text-center shadow-sm">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#f0eee9] flex items-center justify-center mx-auto text-[#825425] mb-4">
                  <Filter className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-display font-semibold text-lg sm:text-xl text-[#090100] mb-2">No products found</h3>
                <p className="text-xs sm:text-sm text-[#504440]">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => { setActiveCategory('All'); setSearch(''); }}
                  className="mt-4 sm:mt-6 text-xs sm:text-sm font-semibold text-[#825425] uppercase tracking-wider hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredAndSortedProducts.map((product, idx) => {
                  const isBestSeller = product.isBestSeller;
                  const isLowStock = product.isLowStock;
                  const reviewCount = 40 + ((product.price % 37) + idx * 7) % 60;
                  const reviewScore = 4 + (idx % 3) * 0.2 + 0.5; // 4.5–4.9

                  return (
                    <div
                      key={product.id || idx}
                      onClick={() => onSelectProduct(product)}
                      className="group bg-white rounded-xl border border-[#e8e0d8] overflow-hidden hover:shadow-xl hover:border-[#c4a882] transition-all duration-300 flex flex-col cursor-pointer"
                    >
                      {/* ── IMAGE — tall portrait 3:4 ── */}
                      <div className="w-full aspect-[3/4] bg-[#f5f3ee] relative overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                        />

                        {/* Bottom gradient for legibility */}
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                        {/* Top-left — psychological badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
                          {isBestSeller && (
                            <span className="bg-[#825425] text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase shadow-md">
                              ★ Best Seller
                            </span>
                          )}
                          {isLowStock && (
                            <span className="bg-red-600/90 text-white text-[8px] sm:text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide uppercase shadow-md animate-pulse">
                              Only 3 Left
                            </span>
                          )}
                        </div>

                        {/* Wishlist — top-right */}
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                            isInWishlist(product.id)
                              ? 'bg-[#825425] text-white'
                              : 'bg-white/90 text-[#090100] hover:bg-[#825425] hover:text-white'
                          }`}
                          title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-white' : ''}`} />
                        </button>

                        {/* Quick View — bottom, desktop hover */}
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-1.5 bg-white text-[#090100] hover:bg-[#090100] hover:text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-250 cursor-pointer whitespace-nowrap"
                        >
                          <Eye className="w-3 h-3" /> Quick View
                        </button>
                      </div>

                      {/* ── CARD BODY ── */}
                      <div className="p-2.5 sm:p-3 flex flex-col gap-1.5 flex-1">
                        {/* Category */}
                        <span className="text-[7px] sm:text-[9px] font-semibold uppercase tracking-widest text-[#825425]">
                          {product.category}
                        </span>

                        {/* Name */}
                        <h3 className="font-display font-semibold text-xs sm:text-sm md:text-[15px] text-[#090100] leading-snug line-clamp-2 group-hover:text-[#825425] transition-colors">
                          {product.name}
                        </h3>

                        {/* Price + CTA at bottom */}
                        <div className="mt-auto pt-2 border-t border-[#f0eee9] flex items-center justify-between gap-2">
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-[#090100]">
                              ₹{product.price.toLocaleString('en-IN')}
                            </div>
                            <div className="flex gap-1 mt-0.5">
                              {product.colors.slice(0, 3).map(c => (
                                <div key={c.name} className="w-2.5 h-2.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: c.hex }} title={c.name} />
                              ))}
                              {product.colors.length > 3 && (
                                <span className="text-[8px] text-[#827470] self-center">+{product.colors.length - 3}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
                            className="flex-shrink-0 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white bg-[#090100] hover:bg-[#825425] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded transition-colors cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
