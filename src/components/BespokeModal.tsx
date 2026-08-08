import React, { useState } from 'react';
import { Product, ProductColor, MonogramConfig } from '../types';
import { PRODUCTS, CUSTOMIZATION_IMAGES } from '../data/products';
import { X, Sparkles, Check, ShoppingBag, Layers, Eye } from 'lucide-react';

interface BespokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, quantity: number, monogram?: MonogramConfig) => void;
}

export const BespokeModal: React.FC<BespokeModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(PRODUCTS[0].colors[0]);
  const [initials, setInitials] = useState('AS');
  const [finish, setFinish] = useState<'blind' | 'gold' | 'silver'>('gold');
  const [placement, setPlacement] = useState('Front Center Badge');

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    if (product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  };

  const handleAddToCart = () => {
    const monogram: MonogramConfig = {
      initials: initials.toUpperCase().slice(0, 3) || 'AS',
      finish,
      placement,
    };
    onAddToCart(selectedProduct, selectedColor, 1, monogram);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090100]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#fbf9f4] w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-xl shadow-2xl border border-[#d3c3be]/60 relative flex flex-col md:flex-row text-[#1b1c19]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#504440] hover:text-[#090100] bg-[#f0eee9] hover:bg-[#e4e2dd] rounded-full transition-colors cursor-pointer"
          aria-label="Close studio"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Live Leather Monogram Canvas Preview */}
        <div className="w-full md:w-7/12 p-8 bg-[#2c1810] text-[#fbf9f4] flex flex-col justify-between items-center relative overflow-hidden border-r border-[#825425]/30">
          <div className="w-full flex items-center justify-between mb-4 z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#fdc087]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#fdc087]">
                Atelier Monogram Studio
              </span>
            </div>
            <span className="text-[10px] uppercase text-[#d3c3be] tracking-wider bg-[#090100]/50 px-2.5 py-1 rounded">
              Hand-Stamped in Paris
            </span>
          </div>

          {/* Substrate Leather Simulation Card */}
          <div className="w-full aspect-[4/3] max-w-md my-6 relative rounded-lg p-6 shadow-2xl flex flex-col justify-between items-center border border-[#825425]/40 transition-all duration-500 overflow-hidden"
               style={{
                 backgroundImage: `linear-gradient(135deg, ${selectedColor.hex} 0%, #090100 100%)`,
                 boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)'
               }}>
            
            {/* Leather texture grain watermark */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Product outline watermark */}
            <div className="absolute top-4 left-6 text-xs text-[#fdc087]/40 font-mono tracking-widest uppercase">
              {selectedProduct.name} • {selectedColor.name}
            </div>

            {/* Center Live Monogram Emblem */}
            <div className="my-auto flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#825425]/30 rounded-lg relative z-10 bg-[#090100]/30 backdrop-blur-xs">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#d3c3be] mb-2 font-mono">
                {placement}
              </div>

              {/* The Stamped Monogram Initials */}
              <div 
                className={`text-5xl sm:text-6xl font-serif font-bold tracking-[0.2em] transition-all duration-300 drop-shadow-md ${
                  finish === 'gold'
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#ffe7b8] via-[#fdc087] to-[#825425] filter drop-shadow-[0_2px_4px_rgba(253,192,135,0.4)]'
                    : finish === 'silver'
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#d3c3be] to-[#504440] filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]'
                    : 'text-[#1b1c19] opacity-70 filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.15)] [text-shadow:0_-1px_1px_rgba(0,0,0,0.9)]'
                }`}
              >
                {initials.toUpperCase() || 'AS'}
              </div>

              <div className="mt-3 text-[10px] text-[#fdc087]/80 tracking-widest uppercase flex items-center gap-1">
                <Check className="w-3 h-3 text-[#fdc087]" />
                <span>{finish === 'gold' ? '24K Gold Foil Stamped' : finish === 'silver' ? 'Sterling Silver Stamped' : 'Heat Blind Embossed'}</span>
              </div>
            </div>

            {/* Bottom Brand Stamp */}
            <div className="z-10 text-[9px] tracking-[0.4em] uppercase text-[#d3c3be]/60">
              AL SUMORA HERITAGE • PARIS
            </div>
          </div>

          {/* Craftsmanship quote */}
          <div className="w-full text-center text-xs text-[#d3c3be] italic pt-2">
            "Every initial is individually set by hand with brass type matrices, heated to 130°C for deep permanence."
          </div>
        </div>

        {/* Right Side: Interactive Controls */}
        <div className="w-full md:w-5/12 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-[#090100]">
              Personalization Atelier
            </h2>
            <p className="text-xs text-[#504440] mt-1">
              Select your leather piece and design your signature monogram.
            </p>

            {/* Step 1: Select Product */}
            <div className="mt-5 space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#090100] block">
                1. Select Leather Creation
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1 border border-[#d3c3be]/40 rounded bg-white">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleProductSelect(prod)}
                    className={`p-2 rounded text-left text-xs transition-all flex items-center gap-2 cursor-pointer ${
                      selectedProduct.id === prod.id
                        ? 'bg-[#090100] text-white font-semibold shadow'
                        : 'hover:bg-[#f0eee9] text-[#1b1c19]'
                    }`}
                  >
                    <img src={prod.images[0]} alt={prod.name} referrerPolicy="no-referrer" className="w-8 h-8 object-contain bg-white rounded p-0.5" />
                    <div className="truncate">
                      <div className="truncate font-medium">{prod.name}</div>
                      <div className="text-[10px] opacity-80">${prod.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Leather Color Swatches */}
            {selectedProduct.colors.length > 0 && (
              <div className="mt-4 space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#090100] block">
                  2. Select Leather Color: <span className="text-[#825425]">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        selectedColor.name === c.name ? 'border-[#090100] scale-110 shadow-md' : 'border-transparent opacity-80'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor.name === c.name && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Enter Initials */}
            <div className="mt-4 space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#090100] block">
                3. Enter Initials (1-3 Characters)
              </label>
              <input
                type="text"
                maxLength={3}
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase())}
                className="w-full bg-white border border-[#827470]/50 rounded px-3 py-2 text-lg font-serif font-bold tracking-[0.25em] text-[#090100] uppercase focus:outline-none focus:border-[#825425]"
                placeholder="AS"
              />
            </div>

            {/* Step 4: Foil Finish Selector */}
            <div className="mt-4 space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#090100] block">
                4. Select Stamping Finish
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFinish('gold')}
                  className={`p-2.5 rounded border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    finish === 'gold' ? 'border-[#825425] bg-[#fdc087]/20 text-[#784c1e]' : 'border-[#d3c3be] bg-white text-[#504440]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 inline-block shadow-xs" />
                  <span>24k Gold</span>
                </button>

                <button
                  onClick={() => setFinish('silver')}
                  className={`p-2.5 rounded border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    finish === 'silver' ? 'border-[#827470] bg-[#e4e2dd] text-[#1b1c19]' : 'border-[#d3c3be] bg-white text-[#504440]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-slate-300 to-slate-500 inline-block shadow-xs" />
                  <span>Sterling Silver</span>
                </button>

                <button
                  onClick={() => setFinish('blind')}
                  className={`p-2.5 rounded border text-xs font-semibold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    finish === 'blind' ? 'border-[#090100] bg-[#2c1810]/10 text-[#090100]' : 'border-[#d3c3be] bg-white text-[#504440]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-[#3d2314] inline-block shadow-xs" />
                  <span>Blind Emboss</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#d3c3be]/40">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#090100] hover:bg-[#2c1810] text-white py-3.5 px-6 rounded text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#fdc087]" />
              <span>Add Custom Piece • ${selectedProduct.price.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
