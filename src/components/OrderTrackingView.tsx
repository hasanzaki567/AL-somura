import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, MapPin, Check, Truck, Clock, ArrowLeft,
  ChevronRight, Search, RotateCcw, Box, Sparkles,
} from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  {
    id: 'ALS-88391',
    trackingNumber: 'TRK-9842-8812-IN',
    carrier: 'DHL Express Priority',
    status: 'out_for_delivery',
    placedOn: 'Aug 21, 2026',
    total: 49500,
    itemCount: 2,
    estimatedDelivery: 'Today by 6:30 PM',
    shippingAddress: { name: 'Abdur Rahman', line1: '42 Heritage Lane, Bandra West', city: 'Mumbai, MH 400050', phone: '+91 98200 12345' },
    billingAddress:  { name: 'Abdur Rahman', line1: '42 Heritage Lane, Bandra West', city: 'Mumbai, MH 400050', phone: '+91 98200 12345' },
    items: [
      { name: 'Tuscan Cavaliere Briefcase', color: 'Cognac Brown', qty: 1, price: 38500, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&h=120&fit=crop' },
      { name: 'Heritage Bi-Fold Wallet',   color: 'Matte Black',  qty: 1, price: 11000, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=120&h=120&fit=crop' },
    ],
    steps: [
      { label: 'Order Placed',        date: 'Aug 21 • 09:15 AM', done: true,    location: 'Al Sumora Online Storefront' },
      { label: 'Packed & Dispatched', date: 'Aug 21 • 01:40 PM', done: true,    location: 'Mumbai Atelier Hub' },
      { label: 'In Transit',          date: 'Aug 22 • 05:20 AM', done: true,    location: 'Delhi Air Hub – DHL Express' },
      { label: 'Out for Delivery',    date: 'Aug 22 • 08:30 AM', done: false,   location: 'Mumbai Local Route #41', active: true },
      { label: 'Delivered',           date: 'Estimated 6:30 PM', done: false,   location: '42 Heritage Lane' },
    ],
  },
  {
    id: 'ALS-77402',
    trackingNumber: 'TRK-3312-9014-IN',
    carrier: 'Blue Dart Overnight',
    status: 'delivered',
    placedOn: 'Aug 14, 2026',
    total: 62000,
    itemCount: 1,
    estimatedDelivery: 'Delivered on Aug 16, 2026',
    shippingAddress: { name: 'Abdur Rahman', line1: '42 Heritage Lane, Bandra West', city: 'Mumbai, MH 400050', phone: '+91 98200 12345' },
    billingAddress:  { name: 'Abdur Rahman', line1: '42 Heritage Lane, Bandra West', city: 'Mumbai, MH 400050', phone: '+91 98200 12345' },
    items: [
      { name: 'Florentine Leather Jacket', color: 'Deep Mahogany', qty: 1, price: 62000, image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=120&h=120&fit=crop' },
    ],
    steps: [
      { label: 'Order Placed',        date: 'Aug 14 • 10:00 AM', done: true, location: 'Al Sumora Online Storefront' },
      { label: 'Packed & Dispatched', date: 'Aug 14 • 03:00 PM', done: true, location: 'Mumbai Atelier Hub' },
      { label: 'In Transit',          date: 'Aug 15 • 06:00 AM', done: true, location: 'Bangalore Hub – Blue Dart' },
      { label: 'Out for Delivery',    date: 'Aug 16 • 09:00 AM', done: true, location: 'Mumbai Local Route #7' },
      { label: 'Delivered',           date: 'Aug 16 • 02:45 PM', done: true, location: '42 Heritage Lane – Signed by Abdur Rahman' },
    ],
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  out_for_delivery: { label: 'Out for Delivery', color: 'text-amber-700',  bg: 'bg-amber-50  border-amber-200',  dot: 'bg-amber-500' },
  delivered:        { label: 'Delivered',         color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
  in_transit:       { label: 'In Transit',         color: 'text-blue-700',   bg: 'bg-blue-50   border-blue-200',   dot: 'bg-blue-500' },
  processing:       { label: 'Processing',         color: 'text-[#825425]',  bg: 'bg-[#f0eee9] border-[#d3c3be]', dot: 'bg-[#825425]' },
};

// ─── Sub-components ──────────────────────────────────────────────────────────
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.processing;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cfg.bg} ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const StepTimeline: React.FC<{ steps: typeof MOCK_ORDERS[0]['steps'] }> = ({ steps }) => {
  const activeIdx = steps.findIndex(s => s.active) ?? steps.filter(s => s.done).length;
  return (
    <div className="relative flex items-start justify-between gap-0">
      {/* connector line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#d3c3be]/50 mx-8 z-0" />
      <div
        className="absolute top-5 left-0 h-0.5 bg-[#825425] z-0 mx-8 transition-all duration-700"
        style={{ right: `${((steps.length - 1 - Math.max(0, steps.filter(s=>s.done).length - 1)) / (steps.length - 1)) * 100}%` }}
      />
      {steps.map((step, i) => {
        const isDone   = step.done;
        const isActive = step.active;
        return (
          <div key={i} className="flex-1 flex flex-col items-center text-center z-10 px-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all text-sm font-bold shadow-sm
              ${isDone   ? 'bg-[#825425] border-[#825425] text-white' :
                isActive ? 'bg-white border-[#825425] text-[#825425] ring-4 ring-[#825425]/20' :
                           'bg-white border-[#d3c3be] text-[#d3c3be]'}`}>
              {isDone ? <Check className="w-4 h-4" /> : <span>{i + 1}</span>}
            </div>
            <p className={`mt-2 text-[11px] font-semibold leading-tight ${isDone || isActive ? 'text-[#090100]' : 'text-[#b0a09c]'}`}>
              {step.label}
            </p>
            <p className={`text-[10px] mt-0.5 ${isDone || isActive ? 'text-[#827470]' : 'text-[#d3c3be]'}`}>
              {step.date}
            </p>
          </div>
        );
      })}
    </div>
  );
};

// ─── Detail View ─────────────────────────────────────────────────────────────
const OrderDetailView: React.FC<{ order: typeof MOCK_ORDERS[0]; onBack: () => void }> = ({ order, onBack }) => {
  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.processing;
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Back */}
      <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#825425] hover:text-[#090100] transition-colors group cursor-pointer">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        All Orders
      </button>

      {/* Order Header Card */}
      <div className="bg-white rounded-2xl border border-[#d3c3be]/40 shadow-sm overflow-hidden">
        <div className="p-6 flex flex-wrap gap-4 items-center justify-between border-b border-[#d3c3be]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f0eee9] flex items-center justify-center text-[#825425]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg text-[#090100]">{order.id}</span>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-xs text-[#827470] mt-0.5">Placed {order.placedOn} • {order.itemCount} item{order.itemCount > 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#827470] uppercase tracking-wider">Carrier</p>
            <p className="font-semibold text-sm text-[#090100]">{order.carrier}</p>
            <p className="text-xs font-mono text-[#825425] mt-0.5">{order.trackingNumber}</p>
          </div>
        </div>

        {/* ETA Banner */}
        <div className={`px-6 py-4 flex items-center justify-between ${order.status === 'delivered' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-[10px] uppercase tracking-widest font-bold ${order.status === 'delivered' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {order.status === 'delivered' ? 'Delivery Confirmed' : 'Estimated Delivery'}
              </p>
              <p className="font-display font-bold text-xl text-[#090100]">{order.estimatedDelivery}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-[#504440]">
            <MapPin className="w-4 h-4 text-[#825425]" />
            <span>{order.shippingAddress.city.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-[#d3c3be]/40 shadow-sm p-6 overflow-x-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#825425] mb-6">Shipment Progress</p>
        <StepTimeline steps={order.steps} />
      </div>

      {/* Activity History */}
      <div className="bg-white rounded-2xl border border-[#d3c3be]/40 shadow-sm p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#825425] mb-4">Activity History</p>
        <div className="space-y-0">
          {[...order.steps].reverse().map((step, i) => {
            const isFirst = i === 0;
            const isActive = step.active;
            return (
              <div key={i} className={`flex gap-4 pb-5 last:pb-0 ${isFirst && !step.done && !isActive ? 'opacity-40' : ''}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border-2 
                    ${step.done ? 'bg-[#825425] border-[#825425] text-white' :
                      step.active ? 'bg-amber-50 border-amber-400 text-amber-600' :
                                    'bg-[#f5f3ee] border-[#d3c3be] text-[#d3c3be]'}`}>
                    {step.done ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
                  </div>
                  {i < order.steps.length - 1 && <div className="w-px flex-1 bg-[#d3c3be]/50 mt-1 min-h-[28px]" />}
                </div>
                <div className="pt-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${step.done || step.active ? 'text-[#090100]' : 'text-[#b0a09c]'}`}>{step.label}</p>
                    <p className="text-[10px] text-[#827470] font-mono">{step.date}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#825425] flex-shrink-0" />
                    <p className="text-xs text-[#827470]">{step.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Address + Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Addresses */}
        <div className="space-y-4">
          {(['shippingAddress', 'billingAddress'] as const).map((key) => (
            <div key={key} className="bg-white rounded-2xl border border-[#d3c3be]/40 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#825425]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#825425]">
                  {key === 'shippingAddress' ? 'Delivery Address' : 'Billing Address'}
                </p>
              </div>
              <p className="font-semibold text-sm text-[#090100]">{order[key].name}</p>
              <p className="text-xs text-[#504440] mt-1 leading-relaxed">{order[key].line1}</p>
              <p className="text-xs text-[#504440]">{order[key].city}</p>
              <p className="text-xs text-[#827470] mt-1">{order[key].phone}</p>
            </div>
          ))}
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-[#d3c3be]/40 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-[#825425]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#825425]">Items in Shipment</p>
            </div>
            <span className="text-xs text-[#827470]">{order.itemCount} item{order.itemCount > 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-[#e4e2dd]" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#090100] line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-[#827470] mt-0.5">Qty {item.qty} • {item.color}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-emerald-600 font-semibold">Verified Authentic</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-[#825425]">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#f0eee9] flex justify-between items-center">
            <span className="text-xs text-[#827470]">Order Total</span>
            <span className="font-bold text-base text-[#090100]">₹{order.total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Order List Card ──────────────────────────────────────────────────────────
const OrderCard: React.FC<{ order: typeof MOCK_ORDERS[0]; onClick: () => void }> = ({ order, onClick }) => {
  const lastStep = [...order.steps].reverse().find(s => s.done || s.active) ?? order.steps[0];
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl border border-[#d3c3be]/40 shadow-sm hover:shadow-lg hover:border-[#825425]/30 transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f0eee9] flex items-center justify-center text-[#825425] group-hover:bg-[#825425] group-hover:text-white transition-colors">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <p className="font-display font-bold text-[#090100] text-sm">{order.id}</p>
              <p className="text-[10px] text-[#827470]">{order.placedOn}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} />
            <ChevronRight className="w-4 h-4 text-[#d3c3be] group-hover:text-[#825425] group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#827470] border-t border-[#f0eee9] pt-3">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#825425]" />
            <span className="font-mono text-[10px]">{order.trackingNumber}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#504440]">{order.itemCount} item{order.itemCount > 1 ? 's' : ''}</span>
            <span className="font-bold text-[#090100]">₹{order.total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Mini progress bar */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-[#f0eee9] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#825425] rounded-full transition-all duration-500"
              style={{ width: `${(order.steps.filter(s => s.done).length / order.steps.length) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-[#825425] font-semibold whitespace-nowrap">{order.estimatedDelivery}</p>
        </div>
      </div>
    </button>
  );
};

// ─── Main View ────────────────────────────────────────────────────────────────
export const OrderTrackingView: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'in_transit' | 'delivered'>('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MOCK_ORDERS.filter(o => {
    if (activeFilter === 'in_transit' && o.status === 'delivered') return false;
    if (activeFilter === 'delivered' && o.status !== 'delivered') return false;
    if (searchQuery && !o.id.toLowerCase().includes(searchQuery.toLowerCase()) && !o.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const tabs: { key: typeof activeFilter; label: string; count: number }[] = [
    { key: 'all',         label: 'All Orders',   count: MOCK_ORDERS.length },
    { key: 'in_transit',  label: 'In Transit',   count: MOCK_ORDERS.filter(o => o.status !== 'delivered').length },
    { key: 'delivered',   label: 'Delivered',    count: MOCK_ORDERS.filter(o => o.status === 'delivered').length },
  ];

  return (
    <div className="bg-[#fbf9f4] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#090100] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button onClick={() => navigate('/shop')} className="inline-flex items-center gap-1.5 text-[#d3c3be] hover:text-[#fdc087] text-xs uppercase tracking-wider font-semibold transition-colors mb-6 cursor-pointer group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Continue Shopping
          </button>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#825425]/20 border border-[#825425]/30 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#fdc087]" />
                </div>
                <h1 className="font-display font-bold text-3xl tracking-tight">Order Tracking</h1>
              </div>
              <p className="text-[#d3c3be] text-sm">Live updates for all your Al Sumora shipments</p>
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#827470]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Order ID or tracking number…"
                className="w-full pl-9 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-[#827470] focus:outline-none focus:border-[#fdc087]/50 focus:bg-white/15 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedOrder ? (
          <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />
        ) : (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl border border-[#d3c3be]/40 p-1 w-fit shadow-sm">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === tab.key
                      ? 'bg-[#090100] text-white shadow-sm'
                      : 'text-[#504440] hover:text-[#090100]'
                  }`}
                >
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeFilter === tab.key ? 'bg-white/20 text-white' : 'bg-[#f0eee9] text-[#825425]'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Order List */}
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#d3c3be]/40 p-16 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#f0eee9] flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-7 h-7 text-[#d3c3be]" />
                </div>
                <p className="font-display font-bold text-lg text-[#090100] mb-1">No Orders Found</p>
                <p className="text-sm text-[#827470]">Try a different filter or search term.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map(order => (
                  <OrderCard key={order.id} order={order} onClick={() => setSelectedOrder(order)} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
