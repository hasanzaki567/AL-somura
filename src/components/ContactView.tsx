import React, { useState } from 'react';
import { Send, CheckCircle2, Instagram, Facebook, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'Bespoke Consultation', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#825425]">
          Maison Concierge Desk
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#090100]">
          Connect with the Maison
        </h1>
        <p className="text-xs sm:text-sm text-[#504440] leading-relaxed">
          Whether inquiring about a bespoke leather commission or seeking product advice, our concierges are at your service.
        </p>
      </div>

      {/* Social & Contact Direct Communication Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/442079460912"
          target="_blank"
          rel="noreferrer"
          className="p-5 bg-white rounded-xl border border-[#d3c3be]/40 hover:border-[#825425] shadow-xs hover:shadow-md transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f0eee9] group-hover:bg-[#090100] group-hover:text-[#fdc087] flex items-center justify-center text-[#825425] transition-colors shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#090100] group-hover:text-[#825425] transition-colors">
              WhatsApp Concierge
            </div>
            <div className="text-[10px] text-[#827470]">Instant Client Support</div>
          </div>
        </a>

        {/* Telephone Call */}
        <a
          href="tel:+442079460912"
          className="p-5 bg-white rounded-xl border border-[#d3c3be]/40 hover:border-[#825425] shadow-xs hover:shadow-md transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f0eee9] group-hover:bg-[#090100] group-hover:text-[#fdc087] flex items-center justify-center text-[#825425] transition-colors shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#090100] group-hover:text-[#825425] transition-colors">
              Direct Phone Line
            </div>
            <div className="text-[10px] text-[#827470]">+44 20 7946 0912</div>
          </div>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="p-5 bg-white rounded-xl border border-[#d3c3be]/40 hover:border-[#825425] shadow-xs hover:shadow-md transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f0eee9] group-hover:bg-[#090100] group-hover:text-[#fdc087] flex items-center justify-center text-[#825425] transition-colors shrink-0">
            <Instagram className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#090100] group-hover:text-[#825425] transition-colors">
              Instagram Maison
            </div>
            <div className="text-[10px] text-[#827470]">@alsumora.official</div>
          </div>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="p-5 bg-white rounded-xl border border-[#d3c3be]/40 hover:border-[#825425] shadow-xs hover:shadow-md transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f0eee9] group-hover:bg-[#090100] group-hover:text-[#fdc087] flex items-center justify-center text-[#825425] transition-colors shrink-0">
            <Facebook className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#090100] group-hover:text-[#825425] transition-colors">
              Facebook Page
            </div>
            <div className="text-[10px] text-[#827470]">Al Sumora Heritage</div>
          </div>
        </a>
      </div>

      {/* Contact / Private Appointment Form */}
      <section className="bg-white rounded-2xl border border-[#d3c3be]/40 p-8 sm:p-12 shadow-sm max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#825425]">
            Concierge Desk
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#090100] mt-1">
            Private Inquiry & Appointments
          </h2>
        </div>

        {isSubmitted ? (
          <div className="p-8 bg-[#f0eee9] text-center rounded-xl space-y-4 border border-[#825425]/30">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#090100]">Inquiry Submitted</h3>
            <p className="text-xs text-[#504440] max-w-md mx-auto">
              Thank you, {formData.name || 'valued guest'}. A Maison concierge will reach out to you within 24 business hours.
            </p>
            <button
              onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: 'Bespoke Consultation', message: '' }); }}
              className="text-xs font-semibold text-[#825425] underline cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-[#090100] uppercase block mb-1">Your Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Lord Sterling"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#fbf9f4] border border-[#d3c3be] rounded p-2.5 text-xs text-[#090100] focus:outline-none focus:border-[#825425]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#090100] uppercase block mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="sterling@mayfair.co.uk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#fbf9f4] border border-[#d3c3be] rounded p-2.5 text-xs text-[#090100] focus:outline-none focus:border-[#825425]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-[#090100] uppercase block mb-1">Telephone Number</label>
                <input
                  type="tel"
                  placeholder="+44 20 7946 0912"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#fbf9f4] border border-[#d3c3be] rounded p-2.5 text-xs text-[#090100] focus:outline-none focus:border-[#825425]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#090100] uppercase block mb-1">Inquiry Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#fbf9f4] border border-[#d3c3be] rounded p-2.5 text-xs text-[#090100] focus:outline-none focus:border-[#825425] cursor-pointer"
                >
                  <option value="Bespoke Consultation">Bespoke Monogram Commission</option>
                  <option value="Private Salon Visit">Private Consultation Appointment</option>
                  <option value="Product Inquiry">Product & Availability Question</option>
                  <option value="Corporate Order">Corporate Luxury Gifting</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#090100] uppercase block mb-1">Inquiry Details</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your request or preferred appointment date..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#fbf9f4] border border-[#d3c3be] rounded p-2.5 text-xs text-[#090100] focus:outline-none focus:border-[#825425]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#090100] hover:bg-[#825425] text-white py-3.5 px-6 rounded text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4 text-[#fdc087]" />
              <span>Submit Inquiry to Concierge</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
