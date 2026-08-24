import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductColor } from '../types';
import { PRODUCTS, HERO_SLIDES } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { ArrowRight, Sparkles, ShieldCheck, Award, Star, Eye, ShoppingBag, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { API_URL } from '../config';

interface HomeViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product, color: ProductColor) => void;
  setIsBespokeOpen?: (open: boolean) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          setProducts(PRODUCTS);
        }
      } catch (error) {
        setProducts(PRODUCTS);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.length > 0 ? products.slice(0, 8) : PRODUCTS.slice(0, 8);

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="space-y-20 pb-20">
      {/* Moving Hero Carousel Section */}
      <section className="relative min-h-[50vh] sm:min-h-[82vh] flex items-center bg-[#090100] overflow-hidden text-white group">
        {/* Carousel Slide Images with Cross-Fade */}
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-50 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Dark Gradient Overlay for optimal legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090100] via-[#090100]/80 to-transparent z-10" />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24 relative z-20 w-full">
          <div className="max-w-2xl space-y-3 sm:space-y-6">
            <div className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 bg-[#fdc087]/15 text-[#fdc087] border border-[#fdc087]/30 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>{slide.subtitle}</span>
            </div>

            <h1 className="font-display font-bold text-xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.2] sm:leading-[1.1] text-[#fbf9f4] min-h-[60px] sm:min-h-[120px] transition-all duration-300">
              {slide.title}
            </h1>

            <p className="text-xs sm:text-base text-[#d3c3be] leading-relaxed max-w-xl min-h-[40px] sm:min-h-[60px]">
              {slide.description}
            </p>

            {/* Single CTA Button - Explore Collection (No Bespoke Button) */}
            <div className="pt-2 sm:pt-4 flex items-center gap-4">
              <button
                onClick={() => { navigate('/shop'); window.scrollTo(0,0); }}
                className="bg-[#825425] hover:bg-[#fdc087] hover:text-[#090100] text-white py-2.5 px-5 sm:py-4 sm:px-8 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-xl cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Navigation */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-black/40 hover:bg-[#825425] text-white rounded-full transition-all border border-white/20 opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:block"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-black/40 hover:bg-[#825425] text-white rounded-full transition-all border border-white/20 opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:block"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'w-6 sm:w-8 bg-[#fdc087]' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 border-b border-[#d3c3be]/35 pb-3">
          <div>
            <span className="hidden sm:block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#825425]">
              Artisan Collections
            </span>
            <h2 className="font-display font-bold text-lg sm:text-2xl text-[#090100] mt-0.5">
              Shop by Category
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-6">
          {[
            { name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=300' },
            { name: 'Shoes', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=300' },
            { name: 'Briefcases', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=300' },
            { name: 'Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=300' },
            { name: 'Bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=300' },
            { name: 'Accessories', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=300' },
          ].map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                navigate(`/shop?category=${cat.name}`);
                window.scrollTo(0, 0);
              }}
              className="flex flex-col items-center gap-2 group cursor-pointer w-full animate-fade-in"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden border border-[#d3c3be]/40 group-hover:border-[#825425] transition-all bg-white shadow-2xs group-hover:scale-105 duration-200">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#504440] group-hover:text-[#825425] transition-colors text-center truncate w-full px-1">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Signature Pieces Grid (Aligned, Uniform Image Aspect Ratios) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 border-b border-[#d3c3be]/40 pb-4 sm:pb-6">
          <div>
            <span className="hidden sm:block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#825425]">
              Curated Masterpieces
            </span>
            <h2 className="font-display font-bold text-xl sm:text-4xl text-[#090100] mt-1">
              Featured Leather Collection
            </h2>
          </div>
          <button
            onClick={() => { navigate('/shop'); window.scrollTo(0,0); }}
            className="mt-2 md:mt-0 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#825425] hover:text-[#090100] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View Full Collection</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {featuredProducts.map((product, idx) => {
            const reviewCount = 42 + ((product.price % 31) + idx * 9) % 55;
            const reviewScore = 4.5 + (idx % 3) * 0.15;
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-xl border border-[#e8e0d8] overflow-hidden hover:shadow-xl hover:border-[#c4a882] transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Portrait image */}
                <div className="w-full aspect-[3/4] bg-[#f5f3ee] relative overflow-hidden flex-shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  
                  {/* Top-left — badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
                    {product.isBestSeller && (
                      <span className="bg-[#825425] text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase shadow-md">
                        ★ Best Seller
                      </span>
                    )}
                    {product.isLowStock && (
                      <span className="bg-red-600/90 text-white text-[8px] sm:text-[10px] font-semibold px-2 py-0.5 rounded tracking-wide uppercase shadow-md animate-pulse">
                        Only 3 Left
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                      isInWishlist(product.id)
                        ? 'bg-[#825425] text-white'
                        : 'bg-white/90 text-[#090100] hover:bg-[#825425] hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-white' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-1.5 bg-white text-[#090100] hover:bg-[#090100] hover:text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    <Eye className="w-3 h-3" /> Quick View
                  </button>
                </div>

                {/* Card body */}
                <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                  <span className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#825425]">
                    {product.category}
                  </span>
                  <h3 className="font-display font-semibold text-xs sm:text-sm text-[#090100] leading-snug line-clamp-2 group-hover:text-[#825425] transition-colors">
                    {product.name}
                  </h3>
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${s <= Math.round(reviewScore) ? 'text-[#f59e0b]' : 'text-[#ddd]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="text-[9px] text-[#827470] ml-0.5">({reviewCount})</span>
                  </div>
                  <div className="mt-auto pt-2.5 border-t border-[#f0eee9] flex items-center justify-between gap-2">
                    <div className="text-sm sm:text-base font-bold text-[#090100]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
                      className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white bg-[#090100] hover:bg-[#825425] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* Feature Boxes / Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#825425]">
            Uncompromising Standards
          </span>
          <h2 className="font-display font-bold text-3xl text-[#090100] mt-1">
            Mastery in Every Stitch
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-xl border border-[#d3c3be]/40 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#f0eee9] flex items-center justify-center text-[#825425]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#090100]">Tuscan Full-Grain Leather</h3>
            <p className="text-xs text-[#504440] leading-relaxed">
              Sourced strictly from certified tanneries in Tuscany using traditional vegetable extracts like oak and chestnut bark for rich longevity.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl border border-[#d3c3be]/40 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#f0eee9] flex items-center justify-center text-[#825425]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#090100]">Hand Saddle Stitching</h3>
            <p className="text-xs text-[#504440] leading-relaxed">
              Stitched using two needles and waxed linen thread. Unlike machine lockstitches, saddle stitching will never unravel over decades of heavy use.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl border border-[#d3c3be]/40 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#f0eee9] flex items-center justify-center text-[#825425]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#090100]">Hand-Burnished Edges</h3>
            <p className="text-xs text-[#504440] leading-relaxed">
              Every raw edge is carefully sanded, dyed, and burnished with beeswax to ensure smooth, waterproof edge protection that develops an exquisite patina.
            </p>
          </div>
        </div>
      </section>

      {/* Client Experiences / Reviews */}
      <section className="bg-[#f5f3ee] py-16 border-y border-[#d3c3be]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#825425]">
              Client Testimonials
            </span>
            <h2 className="font-display font-bold text-3xl text-[#090100] mt-1">
              Client Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-xl border border-[#d3c3be]/40 space-y-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-[#825425] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#fdc087]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#1b1c19] italic leading-relaxed">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f0eee9] flex items-center justify-between">
                  <div>
                    <div className="font-display font-semibold text-xs text-[#090100]">
                      {rev.clientName}
                    </div>
                    <div className="text-[10px] text-[#827470]">{rev.location}</div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#825425] bg-[#f0eee9] px-2 py-0.5 rounded">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
