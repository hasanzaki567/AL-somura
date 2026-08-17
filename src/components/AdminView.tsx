import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Users, Package, LayoutDashboard, Settings, LogOut, ArrowRight } from 'lucide-react';

import { AdminProductsTab } from './AdminProductsTab';

export const AdminView: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
      return;
    }
    
    // Fetch summary data
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({ orderStatus: status })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-[#f5f3ee] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-[#d3c3be]/40 flex flex-col">
        <div className="p-6 border-b border-[#d3c3be]/40">
          <h2 className="font-display font-bold text-xl text-[#090100]">Admin Panel</h2>
          <p className="text-xs text-[#827470] uppercase tracking-wider mt-1">Al Sumora</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'products', label: 'Products', icon: Settings },
            { id: 'customers', label: 'Customers', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-[#825425] text-white' : 'text-[#504440] hover:bg-[#f0eee9]'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-[#d3c3be]/40">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#504440] hover:text-red-600 hover:bg-red-50 rounded text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="font-display text-3xl font-bold mb-8 capitalize text-[#090100]">
          {activeTab}
        </h1>

        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-[#d3c3be]/40 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-[#d3c3be]/40 rounded"></div>
                <div className="h-4 bg-[#d3c3be]/40 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#d3c3be]/40">
                  <h3 className="text-[#827470] text-xs font-semibold uppercase tracking-wider mb-2">Total Orders</h3>
                  <p className="text-3xl font-bold text-[#090100]">{orders.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#d3c3be]/40">
                  <h3 className="text-[#827470] text-xs font-semibold uppercase tracking-wider mb-2">Revenue</h3>
                  <p className="text-3xl font-bold text-[#090100]">
                    ₹{orders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#d3c3be]/40">
                  <h3 className="text-[#827470] text-xs font-semibold uppercase tracking-wider mb-2">Pending Orders</h3>
                  <p className="text-3xl font-bold text-[#825425]">
                    {orders.filter(o => o.orderStatus === 'Pending').length}
                  </p>
                </div>
              </div>
            )}

            {(activeTab === 'orders' || activeTab === 'dashboard') && (
              <div className="bg-white rounded-xl shadow-sm border border-[#d3c3be]/40 overflow-hidden">
                <div className="p-6 border-b border-[#d3c3be]/40">
                  <h3 className="font-display text-lg font-bold">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#f0eee9] text-[#504440] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Order ID</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Customer</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d3c3be]/40">
                      {orders.map(order => (
                        <tr key={order._id} className="hover:bg-[#fbf9f4]">
                          <td className="px-6 py-4 font-medium">{order._id.slice(-8).toUpperCase()}</td>
                          <td className="px-6 py-4 text-[#827470]">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-[#1b1c19]">{order.customerInfo?.name}</p>
                            <p className="text-[#827470] text-xs">{order.customerInfo?.email}</p>
                          </td>
                          <td className="px-6 py-4 font-medium">₹{order.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                              order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                              order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <select 
                              value={order.orderStatus}
                              onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                              className="text-xs border border-[#d3c3be] rounded px-2 py-1 focus:outline-none focus:border-[#825425]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <AdminProductsTab />
            )}

            {activeTab === 'customers' && (
              <div className="bg-white p-12 text-center rounded-xl border border-[#d3c3be]/40">
                <Users className="w-12 h-12 text-[#d3c3be] mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold mb-2">Customer Management</h3>
                <p className="text-sm text-[#827470] mb-6">View registered customers and their LTV.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
