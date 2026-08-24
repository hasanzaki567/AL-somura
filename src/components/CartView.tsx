import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Sparkles, ShieldCheck, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const CartView: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem, clearCart } = useCartStore();

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

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
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#090100] mt-1">
              Your Shopping Bag
            </h1>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-[#827470] hover:text-[#090100] underline cursor-pointer"
            >
              Clear Entire Bag
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#d3c3be]/40 p-16 text-center shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#f0eee9] flex items-center justify-center mx-auto text-[#825425] mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#090100] mb-2">Your shopping bag is empty</h3>
            <p className="text-xs text-[#504440] leading-relaxed max-w-xs mx-auto mb-6">
              Select one of our hand-tailored leather goods or visit the custom monogramming studio to design your own.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#090100] text-white hover:bg-[#825425] py-3.5 px-8 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 rounded-2xl bg-white border border-[#d3c3be]/35 shadow-xs relative"
                >
                  <img
                    src={item.monogram?.canvasSnapshot || item.selectedColor?.image || item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => navigate(`/product/${item.product.id}`)}
                    className="w-24 h-24 object-contain bg-[#f5f3ee] rounded-xl p-1 border border-[#e4e2dd] cursor-pointer hover:opacity-90 transition-opacity"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => navigate(`/product/${item.product.id}`)}
                          className="font-display font-semibold text-base sm:text-lg text-[#090100] hover:text-[#825425] transition-colors cursor-pointer truncate"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-[#827470] hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      <div className="text-xs text-[#504440] mt-0.5">
                        Shade: <span className="font-semibold text-[#1b1c19]">{item.selectedColor.name}</span>
                      </div>

                      {item.monogram && (
                        <div className="mt-3 p-3 rounded-lg bg-[#f0eee9] border border-[#825425]/20 text-[11px] space-y-1 max-w-md">
                          <div className="flex items-center gap-1.5 font-semibold text-[#825425]">
                            <Sparkles className="w-3.5 h-3.5 text-[#825425]" />
                            <span>Custom Stamping: <strong className="font-serif tracking-widest uppercase">{item.monogram.initials}</strong></span>
                          </div>
                          <div className="text-[#827470] text-[10px] flex gap-x-2">
                            <span>Pos: {item.monogram.placement}</span>
                            {item.monogram.finish && (
                              <>
                                <span>•</span>
                                <span className="capitalize">Finish: {item.monogram.finish}</span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-end mt-4 pt-3 border-t border-[#f0eee9]">
                      <div className="flex items-center border border-[#d3c3be]/60 rounded bg-[#fbf9f4]">
                        <button
                          onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1.5 text-xs hover:bg-[#e4e2dd]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="px-3 py-1.5 text-xs hover:bg-[#e4e2dd]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-bold text-base sm:text-lg text-[#825425]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Summary Card */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Shipping Guarantee Banner */}
              <div className="bg-[#2c1810] text-[#fbf9f4] p-4 rounded-xl text-xs flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#fdc087] shrink-0" />
                <div>
                  <div className="font-bold text-[#fdc087] uppercase tracking-wide">Worldwide shipping</div>
                  <div className="text-[10px] text-[#d3c3be] mt-0.5">Complimentary express courier & transit insurance included.</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#d3c3be]/40 shadow-xs p-6 space-y-6">
                <h3 className="font-display font-bold text-lg text-[#090100] border-b border-[#f0eee9] pb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs text-[#504440]">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-[#090100]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insured Global Shipping</span>
                    <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">FREE</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-[#f0eee9]">
                    <span>Custom Monogramming</span>
                    <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#090100] font-bold pt-2">
                    <span>Grand Total</span>
                    <span className="text-base text-[#825425]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#090100] hover:bg-[#2c1810] text-white py-4 px-6 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#fdc087]" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#827470]">
                  <ShieldCheck className="w-4 h-4 text-[#825425]" />
                  <span>Secure 256-Bit SSL Encryption</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
