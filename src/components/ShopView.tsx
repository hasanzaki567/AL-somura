import React, { useState } from 'react';
import { Product, Category, ProductColor } from '../types';
import { PRODUCTS } from '../data/products';
import { BOUTIQUES } from '../data/boutiques';
import { Search, Sparkles, Eye, ShoppingBag, Check, Sliders } from 'lucide-react';

interface ShopViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, color: ProductColor) => void;
  setIsBespokeOpen?: (open: boolean) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedBoutique, setSelectedBoutique] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, ProductColor>>({});

  const categories: Category[] = ['All', 'Jackets', 'Shoes', 'Briefcases', 'Wallets', 'Bags', 'Accessories'];

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesBoutique = selectedBoutique === 'all' || p.boutiques.includes(selectedBoutique);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBoutique && matchesSearch;
  });

  const handleColorSelect = (productId: string, color: ProductColor, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColorMap((prev) => ({ ...prev, [productId]: color }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#d3c3be]/40 pb-6 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#825425]">
            Maison Catalogue
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#090100] mt-1">
            Luxury Leather Collection
          </h1>
          <p className="text-xs text-[#504440] mt-1">
            Select any creation to choose leather shades, enter custom name stamping, or attach custom design logos.
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#d3c3be]/40 shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#090100] text-white shadow'
                  : 'bg-[#f0eee9] text-[#504440] hover:bg-[#e4e2dd] hover:text-[#090100]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Filter Inputs */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#827470]" />
            <input
              type="text"
              placeholder="Search jackets, shoes, briefcases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fbf9f4] border border-[#d3c3be]/60 pl-9 pr-3 py-2 text-xs rounded-md focus:outline-none focus:border-[#825425]"
            />
          </div>

          {/* Boutique Dropdown Filter */}
          <div className="relative">
            <select
              value={selectedBoutique}
              onChange={(e) => setSelectedBoutique(e.target.value)}
              className="bg-[#fbf9f4] border border-[#d3c3be]/60 text-xs text-[#090100] font-medium py-2 px-3 rounded-md focus:outline-none focus:border-[#825425] cursor-pointer"
            >
              <option value="all">All Flagships</option>
              {BOUTIQUES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.city} Flagship
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid - Perfectly Aligned Containers */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#d3c3be]/40 space-y-3">
          <div className="text-[#825425] text-lg font-serif">No creations found matching criteria</div>
          <p className="text-xs text-[#504440]">Try adjusting your search query or category filter.</p>
          <button
            onClick={() => { setActiveCategory('All'); setSelectedBoutique('all'); setSearchQuery(''); }}
            className="mt-2 text-xs font-semibold text-[#825425] underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const activeColor = selectedColorMap[product.id] || product.colors[0] || { image: product.images[0], name: 'Standard', hex: '#000' };
            const displayImage = activeColor.image || product.images[0];

            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl border border-[#d3c3be]/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Uniform Aspect-Ratio Image Container (Eliminates Awkward Empty Gap) */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="w-full aspect-[4/3] bg-[#f5f3ee] relative overflow-hidden flex items-center justify-center cursor-pointer group"
                >
                  <img
                    src={displayImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <span className="bg-[#090100]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded tracking-wider uppercase backdrop-blur-xs">
                      {product.category}
                    </span>
                    {product.customizable !== false ? (
                      <span className="bg-[#fdc087] text-[#090100] text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#090100]" />
                        Customizable
                      </span>
                    ) : (
                      <span className="bg-[#e4e2dd] text-[#504440] text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase flex items-center gap-1">
                        Fixed Design
                      </span>
                    )}
                  </div>

                  {/* Quick Details Eye Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="absolute bottom-3 right-3 p-2 bg-white/90 text-[#090100] rounded-full shadow opacity-0 group-hover:opacity-100 transition-all hover:bg-[#825425] hover:text-white z-10"
                    title="Quick Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Info & Swatches */}
                <div className="p-5 bg-[#F4F4F4] flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-display font-semibold text-base sm:text-lg text-[#090100] hover:text-[#825425] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Color Swatches */}
                    {product.colors.length > 0 && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-[10px] uppercase font-semibold text-[#827470]">Shades:</span>
                        {product.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={(e) => handleColorSelect(product.id, c, e)}
                            className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
                              activeColor.name === c.name ? 'border-[#090100] scale-125 shadow ring-1 ring-[#825425]' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          >
                            {activeColor.name === c.name && <Check className="w-3 h-3 text-white mx-auto" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#f0eee9] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#827470]">Craft Price</div>
                      <div className="text-base font-bold text-[#825425]">
                        ${product.price.toLocaleString()} USD
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-3.5 py-2 bg-[#f0eee9] hover:bg-[#e4e2dd] text-[#090100] rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Details & Custom
                      </button>
                      <button
                        onClick={() => onQuickAddToCart(product, activeColor)}
                        className="px-3 py-2 bg-[#090100] hover:bg-[#825425] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                        title="Add to Shopping Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#fdc087]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
