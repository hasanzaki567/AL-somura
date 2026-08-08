import React, { useState, useEffect } from 'react';
import { Product, ProductColor, MonogramConfig } from '../types';
import {
  ArrowLeft,
  Check,
  Sparkles,
  Shield,
  Truck,
  ShoppingBag,
  Upload,
  Sliders,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  RotateCcw
} from 'lucide-react';
import { LeatherCustomizerCanvas } from './LeatherCustomizerCanvas';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (
    product: Product,
    color: ProductColor,
    quantity: number,
    monogram?: MonogramConfig
  ) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onAddToCart,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product]);

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Natural', hex: '#8c5e3c', image: product.images[0] }
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Customization State
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [useFabricCanvas, setUseFabricCanvas] = useState(false);
  const [customText, setCustomText] = useState('A. SUMORA');
  const [placement, setPlacement] = useState('Bottom Right Corner');
  const [logoFileName, setLogoFileName] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [canvasSnapshot, setCanvasSnapshot] = useState<string | null>(null);

  const isCustomizable = product.customizable !== false;
  const currentImage =
    product.images[selectedImageIndex] || selectedColor.image || product.images[0];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFileName(e.target.files[0].name);
    }
  };

  const handleApplyCanvasCustomization = (
    dataUrl: string,
    monogramConfig: MonogramConfig
  ) => {
    setCanvasSnapshot(dataUrl);
    setCustomText(monogramConfig.initials);
    setPlacement(monogramConfig.placement);
    if (monogramConfig.logoFileName) {
      setLogoFileName(monogramConfig.logoFileName);
    }
    if (monogramConfig.customNotes) {
      setCustomNotes(monogramConfig.customNotes);
    }
    setUseFabricCanvas(false);
    setIsCustomizing(true);

    // Directly add custom item to cart on apply
    onAddToCart(product, selectedColor, quantity, {
      ...monogramConfig,
      canvasSnapshot: dataUrl,
    });
  };

  const handleAddToCartSubmit = () => {
    const monogram: MonogramConfig | undefined = isCustomizing
      ? {
          initials: customText.trim() || 'CUSTOM',
          placement,
          logoFileName: logoFileName || undefined,
          customNotes: customNotes.trim() || undefined,
          canvasSnapshot: canvasSnapshot || undefined,
        }
      : undefined;

    onAddToCart(product, selectedColor, quantity, monogram);
  };

  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumbs & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#d3c3be]/30">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#825425] hover:text-[#090100] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Collection</span>
          </button>

          <nav className="text-xs text-[#827470] flex items-center gap-2">
            <span className="hover:text-[#090100] cursor-pointer" onClick={onBack}>
              Home
            </span>
            <span>/</span>
            <span className="hover:text-[#090100] cursor-pointer" onClick={onBack}>
              {product.category}
            </span>
            <span>/</span>
            <span className="text-[#090100] font-semibold truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Fabric.js Canvas Mode Studio Fullscreen/Dedicated Container */}
        {useFabricCanvas ? (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[#d3c3be]/40 mb-12">
            <LeatherCustomizerCanvas
              baseImageUrl={currentImage}
              productName={product.name}
              productCategory={product.category}
              onApplyCustomization={handleApplyCanvasCustomization}
              onClose={() => setUseFabricCanvas(false)}
            />
          </div>
        ) : (
          /* Standard Product Page Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Product Image Gallery & Canvas Launcher */}
            <div className="lg:col-span-7 space-y-4">
              <div className="w-full aspect-[4/3] sm:aspect-square relative overflow-hidden rounded-xl bg-[#f5f3ee] p-4 flex items-center justify-center border border-[#d3c3be]/40 shadow-sm group">
                <img
                  src={currentImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg transition-all duration-300 transform group-hover:scale-105"
                />

                {/* Photo Carousel Arrow Buttons */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-[#090100]/70 hover:bg-[#090100] text-white rounded-full transition-all cursor-pointer shadow-md opacity-90 hover:scale-110 z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-[#090100]/70 hover:bg-[#090100] text-white rounded-full transition-all cursor-pointer shadow-md opacity-90 hover:scale-110 z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image indicator badge */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#090100]/80 text-[#fdc087] text-xs font-mono rounded-full tracking-widest z-10 backdrop-blur-xs">
                      {selectedImageIndex + 1} / {product.images.length}
                    </div>
                  </>
                )}

                {/* Customization Live Badge Overlay */}
                {isCustomizing && isCustomizable && (
                  <div
                    className={`absolute p-3 rounded-lg bg-[#090100]/90 text-white border border-[#fdc087] shadow-xl flex flex-col gap-1 max-w-[220px] backdrop-blur-xs transition-all ${
                      placement === 'Front Center'
                        ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                        : placement === 'Bottom Right Corner'
                        ? 'bottom-6 right-6'
                        : placement === 'Top Flap / Collar'
                        ? 'top-6 left-6'
                        : 'bottom-6 left-6'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#fdc087] tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#fdc087]" />
                      <span>Custom Stamping</span>
                    </div>

                    {customText.trim() && (
                      <div className="text-sm font-serif font-bold uppercase tracking-widest text-[#fdc087]">
                        "{customText}"
                      </div>
                    )}

                    {logoFileName && (
                      <div className="text-[10px] text-emerald-300 font-mono truncate flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3" />
                        <span>Logo: {logoFileName}</span>
                      </div>
                    )}

                    <div className="text-[9px] text-[#d3c3be] uppercase tracking-wider">
                      Pos: {placement}
                    </div>
                  </div>
                )}
              </div>

              {/* Alternate Thumbnails Strip */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-20 rounded-lg border-2 overflow-hidden p-0.5 bg-white cursor-pointer transition-all shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-[#825425] ring-2 ring-[#825425]/40 scale-105 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Heritage Guarantees Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#d3c3be]/40 text-center">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white border border-[#d3c3be]/30 shadow-2xs">
                  <Truck className="w-5 h-5 text-[#825425]" />
                  <span className="text-xs font-semibold text-[#090100]">Express Shipping</span>
                  <span className="text-[10px] text-[#827470]">Worldwide Insured</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white border border-[#d3c3be]/30 shadow-2xs">
                  <Shield className="w-5 h-5 text-[#825425]" />
                  <span className="text-xs font-semibold text-[#090100]">Atelier Quality</span>
                  <span className="text-[10px] text-[#827470]">100% Handcut Leather</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white border border-[#d3c3be]/30 shadow-2xs">
                  <RotateCcw className="w-5 h-5 text-[#825425]" />
                  <span className="text-xs font-semibold text-[#090100]">30-Day Guarantee</span>
                  <span className="text-[10px] text-[#827470]">Complimentary Returns</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Information & Customization Form */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-[#d3c3be]/40 shadow-xs space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#825425]">
                    Maison de Cuir • {product.category}
                  </span>
                  {!isCustomizable ? (
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-amber-300">
                      Fixed Design
                    </span>
                  ) : (
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-emerald-300">
                      Customizable Piece
                    </span>
                  )}
                </div>

                <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#090100] leading-tight">
                  {product.name}
                </h1>

                <div className="text-2xl font-bold text-[#825425] mt-3">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>

                {/* Full Product Description */}
                <div className="mt-4 p-4 rounded-lg bg-[#fbf9f4] border border-[#d3c3be]/40">
                  <p className="text-xs sm:text-sm text-[#504440] leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Step 1: Leather Shade Selection */}
              {product.colors.length > 0 && (
                <div className="pt-4 border-t border-[#d3c3be]/40">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#1b1c19] block mb-3">
                    1. Select Leather Shade:{' '}
                    <span className="text-[#825425] font-bold">{selectedColor.name}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                          selectedColor.name === c.name
                            ? 'border-[#090100] scale-110 ring-2 ring-[#825425]/40'
                            : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor.name === c.name && (
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Customization Options */}
              <div className="pt-4 border-t border-[#d3c3be]/40">
                {isCustomizable ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsCustomizing(!isCustomizing)}
                      className={`w-full py-3.5 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer border ${
                        isCustomizing
                          ? 'bg-[#090100] text-white border-[#090100] shadow-md'
                          : 'bg-[#f0eee9] text-[#090100] border-[#825425]/30 hover:border-[#825425] hover:bg-[#e4e2dd]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Sliders
                          className={`w-4 h-4 ${
                            isCustomizing ? 'text-[#fdc087]' : 'text-[#825425]'
                          }`}
                        />
                        <span>
                          {isCustomizing
                            ? '2. Customization Enabled'
                            : '2. Add Custom Name & Logo Stamping'}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase ${
                          isCustomizing
                            ? 'bg-[#fdc087] text-[#090100]'
                            : 'bg-[#825425]/15 text-[#825425]'
                        }`}
                      >
                        {isCustomizing ? 'Active' : 'Customize'}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-[#f0eee9] border border-[#d3c3be] text-[#504440] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#d3c3be]/50 flex items-center justify-center shrink-0">
                      <Sliders className="w-4 h-4 text-[#827470]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#090100] uppercase tracking-wider">
                        Fixed Master Specifications
                      </div>
                      <div className="text-[11px] text-[#827470]">
                        This artisan product is crafted to fixed specifications and cannot be modified with custom monograms or logos.
                      </div>
                    </div>
                  </div>
                )}

                {/* Customization Details Form */}
                {isCustomizing && isCustomizable && (
                  <div className="mt-4 p-4 rounded-lg bg-[#fbf9f4] border border-[#825425]/30 shadow-2xs space-y-4 animate-in fade-in duration-200">
                    {/* Fabric.js Canvas Mode Launcher Button */}
                    <div className="p-3 bg-[#2c1810] text-white rounded-lg flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#fdc087] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Interactive Fabric.js Canvas Studio</span>
                        </div>
                        <div className="text-[10px] text-[#d3c3be] mt-0.5">
                          Drag, rotate, and position text/logo visually on product image
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUseFabricCanvas(true)}
                        className="bg-[#fdc087] text-[#090100] hover:bg-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1 shadow-sm shrink-0"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Launch Canvas</span>
                      </button>
                    </div>

                    {/* Name or Monogram Text */}
                    <div>
                      <label className="text-[10px] font-bold text-[#504440] uppercase tracking-wider block mb-1">
                        Custom Name / Monogram Text:
                      </label>
                      <input
                        type="text"
                        maxLength={24}
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="e.g. ABDUR RAHMAN or INITIALS"
                        className="w-full bg-white border border-[#827470]/40 rounded px-3 py-2 text-xs font-serif font-bold uppercase tracking-widest text-[#090100] focus:outline-none focus:border-[#825425]"
                      />
                    </div>

                    {/* Placement Position */}
                    <div>
                      <label className="text-[10px] font-bold text-[#504440] uppercase tracking-wider block mb-1">
                        Placement Position:
                      </label>
                      <select
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                        className="w-full bg-white border border-[#827470]/40 rounded px-3 py-2 text-xs text-[#090100] focus:outline-none focus:border-[#825425]"
                      >
                        <option value="Bottom Right Corner">Bottom Right Corner</option>
                        <option value="Front Center">Front Center</option>
                        <option value="Top Flap / Collar">Top Flap / Collar</option>
                        <option value="Inner Leather Tag">Inner Leather Tag</option>
                      </select>
                    </div>

                    {/* Logo File Attachment */}
                    <div>
                      <label className="text-[10px] font-bold text-[#504440] uppercase tracking-wider block mb-1">
                        Attach Custom Logo / Crest (Optional):
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="flex-1 flex items-center justify-center gap-2 bg-[#f0eee9] hover:bg-[#e4e2dd] text-[#090100] text-xs font-semibold py-2 px-3 rounded border border-[#827470]/30 cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#825425]" />
                          <span className="truncate">
                            {logoFileName ? logoFileName : 'Upload Logo File (PNG/SVG/PDF)'}
                          </span>
                          <input
                            type="file"
                            accept="image/*,.pdf,.svg"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </label>
                        {logoFileName && (
                          <button
                            type="button"
                            onClick={() => setLogoFileName('')}
                            className="text-[10px] text-red-700 hover:underline px-1"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Custom Design Instructions */}
                    <div>
                      <label className="text-[10px] font-bold text-[#504440] uppercase tracking-wider block mb-1">
                        Custom Design Notes to Atelier:
                      </label>
                      <textarea
                        rows={2}
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        placeholder="e.g. Place logo on left collar or specify exact size dimensions..."
                        className="w-full bg-white border border-[#827470]/40 rounded p-2 text-xs text-[#090100] focus:outline-none focus:border-[#825425] resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Specifications Bullet List */}
              <div className="pt-4 border-t border-[#d3c3be]/40 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#090100] block">
                  Craft Specifications:
                </span>
                <ul className="text-xs text-[#504440] space-y-1.5 list-disc list-inside">
                  {product.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>

              {/* Action Row: Quantity Selector & Add to Bag */}
              <div className="pt-6 border-t border-[#d3c3be]/40 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-center justify-between border border-[#827470]/40 rounded-lg bg-[#fbf9f4]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-sm font-bold text-[#1b1c19] hover:bg-[#f0eee9] transition-colors rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-xs font-semibold min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-sm font-bold text-[#1b1c19] hover:bg-[#f0eee9] transition-colors rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCartSubmit}
                  className="flex-1 bg-[#090100] text-white hover:bg-[#2c1810] py-4 px-6 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-[#fdc087]" />
                  <span>
                    Add to Shopping Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Extra Atelier Craftsmanship Section */}
        <div className="mt-16 pt-12 border-t border-[#d3c3be]/40">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#825425]">
              Atelier Standards
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#090100] mt-1">
              Uncompromising Handcrafted Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl border border-[#d3c3be]/30 space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#f0eee9] flex items-center justify-center text-[#825425]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#090100]">
                Full-Grain Tuscan Tannery Leather
              </h3>
              <p className="text-xs text-[#504440] leading-relaxed">
                Hand-selected hide individually tanned with natural vegetable extracts in Santa Croce, Italy for unmatched durability and rich patina.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#d3c3be]/30 space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#f0eee9] flex items-center justify-center text-[#825425]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#090100]">
                Generational Saddle Stitching
              </h3>
              <p className="text-xs text-[#504440] leading-relaxed">
                Crafted using traditional double-hand needle saddle stitch technique with waxed linen thread that never unravels over decades of wear.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#d3c3be]/30 space-y-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#f0eee9] flex items-center justify-center text-[#825425]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#090100]">
                Atelier Bespoke Personalization
              </h3>
              <p className="text-xs text-[#504440] leading-relaxed">
                Enjoy complimentary brass foil monogram debossing or custom brass emblem stamping applied individually by master craftsmen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
