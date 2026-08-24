import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Package, User as UserIcon, LogOut, Truck } from 'lucide-react';

export const AccountView: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-xl border border-[#d3c3be]/40 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center gap-4 border-b border-[#d3c3be]/40 pb-6">
              <div className="w-12 h-12 rounded-full bg-[#f0eee9] flex items-center justify-center text-[#825425]">
                <UserIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg">{user.name}</h2>
                <p className="text-xs text-[#827470]">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2 text-sm font-medium">
              <button className="w-full flex items-center justify-between p-3 bg-[#f5f3ee] text-[#825425] rounded transition-colors text-left">
                <span className="flex items-center gap-2"><Package className="w-4 h-4" /> Order History</span>
                <span className="bg-[#825425] text-white text-[10px] px-2 py-0.5 rounded-full">{orders.length}</span>
              </button>
              <button
                onClick={() => navigate('/track')}
                className="w-full flex items-center gap-2 p-3 text-[#504440] hover:bg-[#f5f3ee] hover:text-[#825425] rounded transition-colors text-left"
              >
                <Truck className="w-4 h-4" /> Track Orders
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-3 text-[#504440] hover:bg-red-50 hover:text-red-600 rounded transition-colors text-left"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <h1 className="font-display text-2xl font-bold mb-8">Order History</h1>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-white border border-[#d3c3be]/40 rounded-xl"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-[#d3c3be]/40 shadow-sm">
              <Package className="w-12 h-12 text-[#d3c3be] mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">No Orders Yet</h3>
              <p className="text-sm text-[#827470] mb-6">You haven't placed any orders with us yet.</p>
              <button 
                onClick={() => navigate('/shop')}
                className="bg-[#090100] text-white px-6 py-2.5 rounded text-sm uppercase tracking-wider font-semibold hover:bg-[#825425] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order._id} className="bg-white rounded-xl border border-[#d3c3be]/40 overflow-hidden shadow-sm">
                  {/* Order Header */}
                  <div className="bg-[#f5f3ee] p-4 flex flex-wrap gap-6 justify-between items-center text-sm border-b border-[#d3c3be]/40">
                    <div>
                      <p className="text-[#827470] text-xs uppercase tracking-wider mb-1">Order Placed</p>
                      <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[#827470] text-xs uppercase tracking-wider mb-1">Total</p>
                      <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#827470] text-xs uppercase tracking-wider mb-1">Order #</p>
                      <p className="font-semibold">{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 space-y-6">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-[#090100]">{item.productNameSnapshot}</h4>
                          <div className="text-sm text-[#504440] mt-1 space-y-0.5">
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ₹{item.priceSnapshot.toLocaleString()}</p>
                            {item.selectedColor && <p>Color: {item.selectedColor.name}</p>}
                            {item.monogram && (
                              <p className="text-[#825425] font-semibold">
                                Monogram: {item.monogram.initials} ({item.monogram.finish})
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
