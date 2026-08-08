import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, Sparkles, ShieldCheck, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [giftNote, setGiftNote] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      // Auto clear cart after order placement
      onClearCart();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#090100]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f4] text-[#1b1c19] shadow-2xl flex flex-col justify-between border-l border-[#d3c3be]/40">
          
          {/* Header */}
          <div className="p-6 bg-[#f5f3ee] border-b border-[#d3c3be]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-[#090100]">Your Shopping Bag</span>
              <span className="text-xs bg-[#825425] text-white px-2 py-0.5 rounded-full font-semibold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#504440] hover:text-[#090100] transition-colors rounded-full hover:bg-[#e4e2dd] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="bg-[#2c1810] text-[#fbf9f4] px-6 py-2.5 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#fdc087] font-medium">
              <Truck className="w-4 h-4" /> Complimentary Insured Express Shipping Applied
            </span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f0eee9] flex items-center justify-center mx-auto text-[#825425]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[#090100]">Your bag is currently empty</h3>
                <p className="text-xs text-[#504440] max-w-xs mx-auto">
                  Explore our handcrafted leather goods or design a personalized monogram piece.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-[#090100] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#825425] transition-colors cursor-pointer"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg bg-white border border-[#d3c3be]/40 shadow-xs relative">
                  <img
                    src={item.monogram?.canvasSnapshot || item.selectedColor?.image || item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-contain bg-[#f5f3ee] rounded p-1 border border-[#e4e2dd]"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-semibold text-sm text-[#090100] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-[#827470] hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#504440] mt-1">
                        Shade: <span className="font-medium text-[#1b1c19]">{item.selectedColor.name}</span>
                      </div>

                      {/* Custom Monogram / Logo Badge if configured */}
                      {item.monogram && (
                        <div className="mt-2 p-2 rounded bg-[#f0eee9] border border-[#825425]/30 text-[10px] space-y-1">
                          <div className="flex items-center gap-1.5 font-semibold text-[#825425]">
                            <Sparkles className="w-3 h-3 text-[#825425]" />
                            <span>Custom Stamping: <strong className="font-serif tracking-widest uppercase">{item.monogram.initials}</strong></span>
                          </div>
                          <div className="text-[#504440] text-[9px] flex flex-wrap gap-x-2">
                            <span>Pos: {item.monogram.placement}</span>
                            {item.monogram.finish && (
                              <>
                                <span>•</span>
                                <span className="capitalize">Finish: {item.monogram.finish}</span>
                              </>
                            )}
                          </div>
                          {item.monogram.logoFileName && (
                            <div className="text-[9px] text-emerald-700 font-mono flex items-center gap-1">
                              <span>Attached Logo: {item.monogram.logoFileName}</span>
                            </div>
                          )}
                          {item.monogram.customNotes && (
                            <div className="text-[9px] italic text-[#504440] truncate">
                              Note: "{item.monogram.customNotes}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#f0eee9]">
                      <div className="flex items-center border border-[#d3c3be]/60 rounded bg-[#fbf9f4]">
                        <button
                          onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 text-xs hover:bg-[#e4e2dd]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-1 text-xs hover:bg-[#e4e2dd]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-semibold text-sm text-[#090100]">
                        ${(item.product.price * item.quantity).toLocaleString()} USD
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#f5f3ee] border-t border-[#d3c3be]/40 space-y-4">
              <div className="space-y-1.5 text-xs text-[#504440]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#090100] text-sm">${subtotal.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Global Courier</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Monogramming</span>
                  <span className="text-emerald-700 font-semibold">COMPLIMENTARY</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full bg-[#090100] hover:bg-[#2c1810] text-white py-3.5 px-6 rounded text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#fdc087]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#827470]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#825425]" />
                <span>256-bit Encrypted Checkout • Maison Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Order Confirmation Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#090100]/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#fbf9f4] w-full max-w-md p-6 rounded-xl shadow-2xl border border-[#d3c3be]/60 relative text-[#1b1c19]">
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-[#504440] hover:text-[#090100]"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#090100]">Order Placed Successfully</h3>
                <p className="text-xs text-[#504440]">
                  Thank you for choosing Al Sumora. Order #AS-{Math.floor(100000 + Math.random() * 900000)} has been registered. You will receive an insured tracking link shortly.
                </p>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setOrderComplete(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#090100] text-white text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Return to Maison
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="text-center pb-2 border-b border-[#d3c3be]/40">
                  <h3 className="font-display font-bold text-lg text-[#090100]">Al Sumora Checkout</h3>
                  <p className="text-xs text-[#825425]">Total Due: ${subtotal.toLocaleString()} USD</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-semibold text-[#504440] uppercase block mb-1">Full Name</label>
                    <input required type="text" defaultValue="Lord Sterling" className="w-full text-xs p-2 bg-white border border-[#d3c3be] rounded" />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-[#504440] uppercase block mb-1">Shipping Address</label>
                    <input required type="text" defaultValue="42 Mayfair Square, London" className="w-full text-xs p-2 bg-white border border-[#d3c3be] rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-[#504440] uppercase block mb-1">Card Number</label>
                      <input required type="text" defaultValue="•••• •••• •••• 8842" className="w-full text-xs p-2 bg-white border border-[#d3c3be] rounded" />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-[#504440] uppercase block mb-1">Expiry / CVC</label>
                      <input required type="text" defaultValue="11/28 - 942" className="w-full text-xs p-2 bg-white border border-[#d3c3be] rounded" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-[#090100] hover:bg-[#825425] text-white py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Complete Order (${subtotal.toLocaleString()})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
