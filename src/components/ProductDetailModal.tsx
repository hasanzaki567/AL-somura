import React, { useState } from 'react';
import { Product, ProductColor, MonogramConfig } from '../types';
import { X, Check, Sparkles, Shield, Truck, ShoppingBag, Upload, Sliders, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { LeatherCustomizerCanvas } from './LeatherCustomizerCanvas';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, quantity: number, monogram?: MonogramConfig) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Natural', hex: '#8c5e3c', image: product.images[0] });
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

  const currentImage = product.images[selectedImageIndex] || selectedColor.image || product.images[0];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFileName(e.target.files[0].name);
    }
  };

  const handleApplyCanvasCustomization = (dataUrl: string, monogramConfig: MonogramConfig) => {
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
    onClose();
  };

  const handleAddToCart = () => {
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090100]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#fbf9f4] w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl shadow-2xl border border-[#d3c3be]/50 relative flex flex-col text-[#1b1c19]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#504440] hover:text-[#090100] bg-[#f0eee9] hover:bg-[#e4e2dd] rounded-full transition-colors cursor-pointer shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {useFabricCanvas ? (
          <div className="p-4 sm:p-6">
            <LeatherCustomizerCanvas
              baseImageUrl={currentImage}
              productName={product.name}
              productCategory={product.category}
              onApplyCustomization={handleApplyCanvasCustomization}
              onClose={() => setUseFabricCanvas(false)}
            />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row w-full">
            {/* Left Side: Product Image & Custom Overlay Preview */}
            <div className="w-full md:w-1/2 p-6 bg-[#f5f3ee] flex flex-col justify-between items-center relative border-r border-[#d3c3be]/30">
              <div className="w-full aspect-[4/3] sm:aspect-square relative overflow-hidden rounded-lg bg-white p-2 flex items-center justify-center shadow-inner group">
                <img
                  src={currentImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded transition-all duration-300 transform hover:scale-105"
                />

                {/* Photo Carousel Arrow Buttons */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[#090100]/70 hover:bg-[#090100] text-white rounded-full transition-all cursor-pointer shadow-md opacity-90 hover:scale-110 z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#090100]/70 hover:bg-[#090100] text-white rounded-full transition-all cursor-pointer shadow-md opacity-90 hover:scale-110 z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image indicator badge */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#090100]/80 text-[#fdc087] text-[10px] font-mono rounded-full tracking-widest z-10">
                      {selectedImageIndex + 1} / {product.images.length}
                    </div>
                  </>
                )}

                {/* Customization Live Badge Overlay */}
                {isCustomizing && isCustomizable && (
                  <div 
                    className={`absolute p-2.5 rounded-md bg-[#090100]/85 text-white border border-[#fdc087] shadow-xl flex flex-col gap-0.5 max-w-[200px] backdrop-blur-xs transition-all ${
                      placement === 'Front Center'
                        ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                        : placement === 'Bottom Right Corner'
                        ? 'bottom-4 right-4'
                        : placement === 'Top Flap / Collar'
                        ? 'top-4 left-4'
                        : 'bottom-4 left-4'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#fdc087] tracking-wider">
                      <Sparkles className="w-3 h-3 text-[#fdc087]" />
                      <span>Custom Stamping</span>
                    </div>

                    {customText.trim() && (
                      <div className="text-xs font-serif font-bold uppercase tracking-widest text-[#fdc087]">
                        "{customText}"
                      </div>
                    )}

                    {logoFileName && (
                      <div className="text-[9px] text-emerald-300 font-mono truncate flex items-center gap-1 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                        <span>Logo: {logoFileName}</span>
                      </div>
                    )}

                    <div className="text-[8px] text-[#d3c3be] uppercase tracking-wider">
                      Pos: {placement}
                    </div>
                  </div>
                )}
              </div>

              {/* Alternate thumbnails gallery slider */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 w-full justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-14 h-14 rounded-md border overflow-hidden p-0.5 bg-white cursor-pointer transition-all ${
                        selectedImageIndex === idx ? 'border-[#825425] ring-2 ring-[#825425]/50 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Slide ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover rounded" />
                    </button>
                  ))}
                </div>
              )}

              {/* Heritage guarantee note */}
              <div className="w-full mt-4 text-[11px] text-[#504440] flex items-center justify-around border-t border-[#d3c3be]/40 pt-3">
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-[#825425]" /> Express Shipping</span>
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-[#825425]" /> Quality Product</span>
              </div>
            </div>

            {/* Right Side: Product Details & Customization Options */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-[#825425] mb-1">
                    Maison de Cuir • {product.category}
                  </div>
                  {!isCustomizable && (
                    <span className="text-[9px] bg-amber-100 text-amber-900 font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-300">
                      Fixed Design • No Customization
                    </span>
                  )}
                  {isCustomizable && (
                    <span className="text-[9px] bg-emerald-100 text-emerald-900 font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-300">
                      Customizable Piece
                    </span>
                  )}
                </div>

                <h2 className="font-display font-bold text-2xl md:text-3xl text-[#090100] leading-tight">
                  {product.name}
                </h2>
                <div className="text-xl font-bold text-[#825425] mt-2">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>

                <p className="text-xs text-[#504440] mt-2.5 leading-relaxed">
                  {product.description}
                </p>

                {/* Step 1: Leather Shade Selection */}
                {product.colors.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[#d3c3be]/40">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1b1c19] block mb-2">
                      1. Select Leather Shade: <span className="text-[#825425] font-bold">{selectedColor.name}</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer shadow-sm ${
                            selectedColor.name === c.name ? 'border-[#090100] scale-110 ring-2 ring-[#825425]/40' : 'border-transparent opacity-80 hover:opacity-100'
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

                {/* Step 2: Customization Availability or Customization Form */}
                <div className="mt-5 pt-4 border-t border-[#d3c3be]/40">
                  {isCustomizable ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsCustomizing(!isCustomizing)}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer border ${
                          isCustomizing
                            ? 'bg-[#090100] text-white border-[#090100] shadow-md'
                            : 'bg-[#f0eee9] text-[#090100] border-[#825425]/30 hover:border-[#825425] hover:bg-[#e4e2dd]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Sliders className={`w-4 h-4 ${isCustomizing ? 'text-[#fdc087]' : 'text-[#825425]'}`} />
                          <span>{isCustomizing ? '2. Customization Enabled' : '2. Add Custom Name & Logo Stamping'}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${isCustomizing ? 'bg-[#fdc087] text-[#090100]' : 'bg-[#825425]/15 text-[#825425]'}`}>
                          {isCustomizing ? 'Active' : 'Customize'}
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-lg bg-[#f0eee9] border border-[#d3c3be] text-[#504440] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d3c3be]/50 flex items-center justify-center shrink-0">
                        <Sliders className="w-4 h-4 text-[#827470]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#090100] uppercase tracking-wider">
                          Customization is not available
                        </div>
                        <div className="text-[11px] text-[#827470]">
                          This artisan product is crafted to fixed master specifications and cannot be modified with custom monograms or logos.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              {/* Customization Details Form */}
              {isCustomizing && isCustomizable && (
                <div className="mt-4 p-4 rounded-lg bg-white border border-[#825425]/30 shadow-xs space-y-3.5 animate-in fade-in duration-200">
                  {/* Fabric.js Canvas Mode Launcher Button */}
                  <div className="p-3 bg-[#2c1810] text-white rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#fdc087] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Interactive Fabric.js Canvas Customizer</span>
                      </div>
                      <div className="text-[10px] text-[#d3c3be] mt-0.5">
                        Drag, rotate, and position text/logo visually on product image
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUseFabricCanvas(true)}
                      className="bg-[#fdc087] text-[#090100] hover:bg-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Launch Canvas Studio</span>
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
                      className="w-full bg-[#fbf9f4] border border-[#827470]/40 rounded px-3 py-1.5 text-xs font-serif font-bold uppercase tracking-widest text-[#090100] focus:outline-none focus:border-[#825425]"
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
                      className="w-full bg-[#fbf9f4] border border-[#827470]/40 rounded px-2.5 py-1.5 text-xs text-[#090100] focus:outline-none focus:border-[#825425]"
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
                        <span className="truncate">{logoFileName ? logoFileName : 'Upload Logo File (PNG/SVG/PDF)'}</span>
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
                      className="w-full bg-[#fbf9f4] border border-[#827470]/40 rounded p-2 text-xs text-[#090100] focus:outline-none focus:border-[#825425] resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Specifications bullet list */}
            <div className="mt-4 pt-3 border-t border-[#d3c3be]/40 space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#090100]">
                Craft Specifications:
              </span>
              <ul className="text-xs text-[#504440] space-y-1 list-disc list-inside">
                {product.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#d3c3be]/40 flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#827470]/40 rounded bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-xs font-bold text-[#1b1c19] hover:bg-[#f0eee9] transition-colors"
              >
                -
              </button>
              <span className="px-3 py-2 text-xs font-semibold min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-xs font-bold text-[#1b1c19] hover:bg-[#f0eee9] transition-colors"
              >
                +
              </button>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#090100] text-white hover:bg-[#2c1810] py-3.5 px-6 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#fdc087]" />
              <span>Add to Shopping Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
};
