import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductColor } from '../types';
import { PRODUCTS, HERO_SLIDES, CUSTOMIZATION_IMAGES } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { ArrowRight, Sparkles, ShieldCheck, Award, Star, Eye, ShoppingBag, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';

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
  const featuredProducts = PRODUCTS.slice(0, 8); // Showcase products across jackets, shoes, briefcases, wallets, bags
  const [currentSlide, setCurrentSlide] = useState(0);

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
      <section className="relative min-h-[82vh] flex items-center bg-[#090100] overflow-hidden text-white group">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#fdc087]/15 text-[#fdc087] border border-[#fdc087]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.subtitle}</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[#fbf9f4] min-h-[120px] transition-all duration-300">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-[#d3c3be] leading-relaxed max-w-xl min-h-[60px]">
              {slide.description}
            </p>

            {/* Single CTA Button - Explore Collection (No Bespoke Button) */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => { navigate('/shop'); window.scrollTo(0,0); }}
                className="bg-[#825425] hover:bg-[#fdc087] hover:text-[#090100] text-white py-4 px-8 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-3 transition-all shadow-xl cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Navigation */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-[#825425] text-white rounded-full transition-all border border-white/20 opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-[#825425] text-white rounded-full transition-all border border-white/20 opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-[#fdc087]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Signature Pieces Grid (Aligned, Uniform Image Aspect Ratios) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-[#d3c3be]/40 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#825425]">
              Curated Masterpieces
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#090100] mt-1">
              Featured Leather Collection
            </h2>
          </div>
          <button
            onClick={() => { navigate('/shop'); window.scrollTo(0,0); }}
            className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider text-[#825425] hover:text-[#090100] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View Full Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-[#d3c3be]/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Perfectly Aligned Image Container */}
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

                <span className="absolute top-3 left-3 bg-[#090100]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded tracking-wider uppercase backdrop-blur-xs">
                  {product.category}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="absolute bottom-3 right-3 p-2 bg-white/90 text-[#090100] rounded-full shadow opacity-0 group-hover:opacity-100 transition-all hover:bg-[#825425] hover:text-white"
                  title="View Details & Customize"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info & Actions */}
              <div className="p-5 bg-[#F4F4F4] flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-display font-semibold text-base text-[#090100] hover:text-[#825425] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                </div>

                <div className="pt-3 border-t border-[#f0eee9] flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#825425]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-[#827470]">
                      {product.colors.length} Shade{product.colors.length > 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 bg-[#f0eee9] text-[#090100] hover:bg-[#090100] hover:text-white rounded text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Details & Custom
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Feature Overview (No Standalone Bespoke Modal Button) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2c1810] rounded-2xl overflow-hidden shadow-2xl text-white grid grid-cols-1 lg:grid-cols-2 border border-[#825425]/40">
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-[#fdc087] text-xs font-semibold uppercase tracking-widest">
              <Sliders className="w-4 h-4" />
              <span>Complimentary Personalization</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight text-[#fbf9f4]">
              Custom Stamping & Logo Engraving
            </h2>

            <p className="text-xs sm:text-sm text-[#d3c3be] leading-relaxed">
              Every Al Sumora leather creation can be customized with your choice of leather shade, custom text, name stamping, placement location, or custom logo attachment directly from the product details panel.
            </p>

            <div className="space-y-3 pt-2 text-xs text-[#fdc087]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fdc087]" />
                <span>Select from 24k Gold Foil, Sterling Silver, or Deep Debossing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fdc087]" />
                <span>Choose placement position & attach vector logo files</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => { navigate('/shop'); window.scrollTo(0,0); }}
                className="bg-[#fdc087] text-[#090100] hover:bg-white py-3.5 px-8 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Select a Piece to Customize</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[320px] bg-[#090100] flex items-center justify-center p-6">
            <img
              src={CUSTOMIZATION_IMAGES.goldFoil}
              alt="Artisan stamping gold foil initial"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-lg opacity-90"
            />
          </div>
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
