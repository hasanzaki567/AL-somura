import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductColor, Category } from '../types';
import { Filter, ChevronDown, Eye, Sparkles, Heart } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';

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
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (activeCategory !== 'All') queryParams.append('category', activeCategory);
        if (search) queryParams.append('search', search);

        // Fetch from new backend API
        const res = await fetch(`http://localhost:5000/api/products?${queryParams}`);
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
    <div className="bg-[#fbf9f4] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#090100] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h1 className="font-display font-bold text-4xl tracking-tight">The Complete Collection</h1>
          <p className="text-[#d3c3be] text-sm max-w-xl mx-auto">
            Discover our entire range of handcrafted Tuscan leather goods. Each piece is saddle-stitched by master artisans and built to last generations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Filters Sidebar (Desktop) & Collapsible (Mobile) */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-32 space-y-8 bg-white p-6 rounded-xl border border-[#d3c3be]/40 shadow-sm">
              <div className="flex items-center justify-between lg:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <span className="font-semibold text-sm uppercase tracking-wider text-[#090100] flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filters & Categories
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </div>

              <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block space-y-8 mt-6 lg:mt-0`}>
                {/* Categories */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[#825425] mb-4">Categories</h3>
                  <div className="flex flex-col gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-left text-sm py-1.5 transition-colors ${
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
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[#825425] mb-4">Sort By</h3>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-[#f5f3ee] border border-[#d3c3be]/60 text-sm p-2.5 rounded focus:outline-none focus:border-[#825425]"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>

                {/* Search */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[#825425] mb-4">Search</h3>
                  <input
                    type="text"
                    placeholder="Search collection..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#f5f3ee] border border-[#d3c3be]/60 text-sm p-2.5 rounded focus:outline-none focus:border-[#825425]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center text-sm text-[#504440]">
              <span>Showing <strong>{filteredAndSortedProducts.length}</strong> items {activeCategory !== 'All' ? `in ${activeCategory}` : ''}</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse bg-white rounded-xl border border-[#d3c3be]/40 h-[400px]"></div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#d3c3be]/40 p-16 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#f0eee9] flex items-center justify-center mx-auto text-[#825425] mb-4">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-xl text-[#090100] mb-2">No products found</h3>
                <p className="text-sm text-[#504440]">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => { setActiveCategory('All'); setSearch(''); }}
                  className="mt-6 text-sm font-semibold text-[#825425] uppercase tracking-wider hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl border border-[#d3c3be]/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="w-full aspect-[4/3] bg-[#f5f3ee] relative overflow-hidden flex items-center justify-center cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Tags */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className="bg-[#090100]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded tracking-wider uppercase backdrop-blur-xs shadow-sm">
                          {product.category}
                        </span>
                        {product.isFeatured && (
                          <span className="bg-[#825425]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded tracking-wider uppercase backdrop-blur-xs shadow-sm flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Featured
                          </span>
                        )}
                      </div>

                      {/* Wishlist Heart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full shadow transition-all cursor-pointer ${
                          isInWishlist(product.id)
                            ? 'bg-[#825425] text-white opacity-100'
                            : 'bg-white/90 text-[#090100] opacity-80 hover:opacity-100 hover:bg-[#825425] hover:text-white'
                        }`}
                        title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-white' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="absolute bottom-3 right-3 p-2.5 bg-white/90 text-[#090100] rounded-full shadow opacity-0 group-hover:opacity-100 transition-all hover:bg-[#825425] hover:text-white"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="font-display font-bold text-[#090100] hover:text-[#825425] transition-colors cursor-pointer text-base line-clamp-1"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#504440] line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#f0eee9] flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-[#825425]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-[#827470] flex gap-1 mt-0.5">
                            {product.colors.map(c => (
                              <div key={c.name} className="w-3 h-3 rounded-full border border-[#d3c3be]" style={{ backgroundColor: c.hex }} title={c.name} />
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectProduct(product)}
                          className="px-4 py-2 bg-[#f0eee9] text-[#090100] hover:bg-[#090100] hover:text-white rounded text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
