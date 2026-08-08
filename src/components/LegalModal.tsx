import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#090100]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#fbf9f4] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#d3c3be]/60 overflow-hidden text-[#1b1c19] my-8 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[#f5f3ee] p-6 border-b border-[#d3c3be]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#825425] text-white">
              {activeTab === 'privacy' ? <Lock className="w-5 h-5 text-[#fdc087]" /> : <FileText className="w-5 h-5 text-[#fdc087]" />}
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#825425]">
                Al Sumora Heritage Maison
              </span>
              <h2 className="font-display font-bold text-xl text-[#090100]">
                {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#504440] hover:text-[#090100] transition-colors rounded-full hover:bg-[#e4e2dd] cursor-pointer"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#d3c3be]/40 bg-[#eae8e3] shrink-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-[#fbf9f4] text-[#090100] border-b-2 border-[#825425]'
                : 'text-[#504440] hover:text-[#090100]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#825425]" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-[#fbf9f4] text-[#090100] border-b-2 border-[#825425]'
                : 'text-[#504440] hover:text-[#090100]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#825425]" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#504440] leading-relaxed">
          {activeTab === 'privacy' ? (
            <div className="space-y-5">
              <div>
                <h3 className="font-display font-bold text-sm text-[#090100] mb-1">
                  1. Information We Collect
                </h3>
                <p>
                  At Al Sumora, we respect your privacy and confidentiality. When you place an order or request custom bespoke monogramming, we collect your name, shipping address, contact phone number, email, and custom design files or text details strictly to process and craft your custom leather piece.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-sm text-[#090100] mb-1">
                  2. Use of Custom Design Files & Monograms
                </h3>
                <p>
                  Any logo attachments, initials, or sketches uploaded to our interactive Fabric customizer are utilized solely for handcrafting your leather creation. We never share, sell, or reproduce client crests or trademarked artwork without express written permission.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-sm text-[#090100] mb-1">
                  3. Payment Security & Encryption
                </h3>
                <p>
                  All transactions placed with Al Sumora are processed over 256-bit encrypted SSL protocol. Your payment details are handled by compliant financial gateways and are never stored on our servers.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-sm text-[#090100] mb-1">
                  4. Data Retention & Client Rights
                </h3>
                <p>
                  You have the right to request access to, amendment of, or deletion of your personal record from our concierge database at any time by contacting our Privacy Desk at concierge@alsumora.com.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="font-display font-bold text-sm text-[#090100] mb-1">
                  1. Custom Bespoke Orders & Personalization
                </h3>
                <p>
                  Items personalized via initial stamping, laser engraving, hand drawing, or custom logo attachments are bespoke creations crafted specifically to client specifications. Once an order enters production at our atelier, modifications may be subject to approval.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-sm text-[#090100] mb-1">
                  2. Insured Express Courier Delivery
                </h3>
                <p>
                  Al Sumora ships all products via insured express courier. Delivery estimates are provided in good faith. Recipients are required to sign upon physical delivery to guarantee safe receipt.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-sm text-[#090100] mb-1">
                  3. Intellectual Property Rights
                </h3>
                <p>
                  All designs, photography, branding, and content published by Al Sumora are protected under international copyright law. Clients uploading custom logos guarantee they hold necessary trademark usage rights.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-sm text-[#090100] mb-1">
                  4. Warranty & Quality Promise
                </h3>
                <p>
                  Every piece is subjected to rigorous quality controls before dispatch. Should any manufacturing flaw occur, our concierge team will promptly repair or replace the item.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f5f3ee] border-t border-[#d3c3be]/40 flex items-center justify-between shrink-0 text-[10px] text-[#827470]">
          <span>Maison Al Sumora • Updated 2026</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#090100] text-white hover:bg-[#825425] rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
