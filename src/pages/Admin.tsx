import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, Image, Star, Users,
  CreditCard, Tag, Settings, Bell, FileText, BarChart3,
  Plus, Edit, Trash2, Eye, EyeOff, Check, X, Search,
  TrendingUp, Clock, DollarSign, AlertCircle
} from 'lucide-react';
import { useAuthStore, useAdminStore, useBookingStore, useReviewStore } from '../store';

export default function AdminPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { services, products, portfolio, coupons, settings, updateService, deleteService, addCoupon, updateCoupon, deleteCoupon, updateSettings } = useAdminStore();
  const { bookings, updateBookingStatus } = useBookingStore();
  const { reviews, approveReview, rejectReview, deleteReview } = useReviewStore();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Access Denied</h2>
        <p className="mb-4" style={{ color: 'var(--text-muted)' }}>You need admin privileges to access this page.</p>
        <Link to="/auth" className="text-brand-600 hover:underline">Login as Admin</Link>
      </div>
    );
  }

  const adminNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'portfolio', label: 'Portfolio', icon: Image },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const totalRevenue = bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.estimatedTotal, 0);
  const pendingBookings = bookings.filter(b => ['new', 'pending'].includes(b.status)).length;
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Admin Panel</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage your platform</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-medium">DEMO MODE</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto hide-scrollbar">
            {adminNav.map(item => (
              <button key={item.id} onClick={() => setActiveSection(item.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeSection === item.id ? 'gradient-bg text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`} style={{ color: activeSection === item.id ? undefined : 'var(--text-secondary)' }}>
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Dashboard */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center gap-2 mb-2"><DollarSign size={18} className="text-green-600" /><span className="text-xs" style={{ color: 'var(--text-muted)' }}>Revenue</span></div>
                  <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>₹{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center gap-2 mb-2"><ShoppingBag size={18} className="text-blue-600" /><span className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Bookings</span></div>
                  <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{bookings.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center gap-2 mb-2"><Clock size={18} className="text-amber-600" /><span className="text-xs" style={{ color: 'var(--text-muted)' }}>Pending</span></div>
                  <p className="text-xl font-bold text-amber-600">{pendingBookings}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center gap-2 mb-2"><Star size={18} className="text-purple-600" /><span className="text-xs" style={{ color: 'var(--text-muted)' }}>Pending Reviews</span></div>
                  <p className="text-xl font-bold text-purple-600">{pendingReviews}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Bookings</h3>
                {bookings.length === 0 ? (
                  <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>No bookings yet. Bookings will appear here when customers place orders.</p>
                ) : (
                  <div className="space-y-2">
                    {bookings.slice(-5).reverse().map(b => (
                      <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{b.serviceName}</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{b.customerName} • {b.id}</p>
                        </div>
                        <span className="text-sm font-medium text-brand-600">₹{b.estimatedTotal.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Services Management */}
          {activeSection === 'services' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Manage Services ({services.length})</h2>
              </div>
              <div className="space-y-2">
                {services.map(service => (
                  <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{service.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{service.category} • ₹{service.basePrice.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateService(service.id, { isFeatured: !service.isFeatured })} className={`p-1.5 rounded ${service.isFeatured ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                        <Star size={14} />
                      </button>
                      <Link to={`/service/${service.id}`} className="p-1.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500"><Eye size={14} /></Link>
                      <button onClick={() => deleteService(service.id)} className="p-1.5 rounded bg-red-50 dark:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Management */}
          {activeSection === 'bookings' && (
            <div>
              <h2 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Manage Bookings ({bookings.length})</h2>
              {bookings.length === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>No bookings yet.</p>
              ) : (
                <div className="space-y-3">
                  {bookings.map(booking => (
                    <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{booking.serviceName}</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{booking.customerName} • {booking.customerEmail} • {booking.id}</p>
                        </div>
                        <select value={booking.status} onChange={e => updateBookingStatus(booking.id, e.target.value as any)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-xs bg-transparent" style={{ color: 'var(--text-primary)' }}>
                          <option value="new">New</option>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span>₹{booking.estimatedTotal.toLocaleString()}</span>
                        <span>{booking.paymentStatus}</span>
                        <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reviews Management */}
          {activeSection === 'reviews' && (
            <div>
              <h2 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Moderate Reviews ({reviews.length})</h2>
              {reviews.length === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>No reviews to moderate.</p>
              ) : (
                <div className="space-y-3">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{review.userName} — {review.serviceName}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />)}
                            {review.isVerified && <span className="text-[10px] text-green-600 ml-1">✓ Verified</span>}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${review.status === 'approved' ? 'bg-green-100 text-green-700' : review.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{review.status}</span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{review.review}</p>
                      {review.status === 'pending' && (
                        <div className="flex gap-2">
                          <button onClick={() => approveReview(review.id)} className="px-3 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium flex items-center gap-1"><Check size={12} /> Approve</button>
                          <button onClick={() => rejectReview(review.id)} className="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-1"><X size={12} /> Reject</button>
                          <button onClick={() => deleteReview(review.id)} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 text-xs font-medium flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Coupons Management */}
          {activeSection === 'coupons' && (
            <div>
              <h2 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Manage Coupons ({coupons.length})</h2>
              <div className="space-y-2">
                {coupons.map(coupon => (
                  <div key={coupon.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-mono font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{coupon.code}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{coupon.type === 'percentage' ? `${coupon.value}% off` : `₹${coupon.value} off`} • Expires: {coupon.expiryDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{coupon.isActive ? 'Active' : 'Inactive'}</span>
                      <button onClick={() => updateCoupon(coupon.id, { isActive: !coupon.isActive })} className="p-1.5 rounded bg-gray-100 dark:bg-gray-700"><Edit size={12} /></button>
                      <button onClick={() => deleteCoupon(coupon.id)} className="p-1.5 rounded bg-red-50 dark:bg-red-900/20 text-red-500"><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeSection === 'settings' && (
            <div className="space-y-6">
              <h2 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Platform Settings</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Company Name</label>
                    <input value={settings.companyName} onChange={e => updateSettings({ companyName: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Email</label>
                    <input value={settings.companyEmail} onChange={e => updateSettings({ companyEmail: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Phone 1</label>
                    <input value={settings.companyPhone1} onChange={e => updateSettings({ companyPhone1: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Phone 2</label>
                    <input value={settings.companyPhone2} onChange={e => updateSettings({ companyPhone2: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Maintenance Costs (comma-separated)</label>
                  <input value={settings.maintenanceCosts.join(', ')} onChange={e => updateSettings({ maintenanceCosts: e.target.value.split(',').map(Number).filter(n => !isNaN(n)) })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.enablePayments} onChange={e => updateSettings({ enablePayments: e.target.checked })} className="rounded" /> Enable Payments</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.enableWhatsApp} onChange={e => updateSettings({ enableWhatsApp: e.target.checked })} className="rounded" /> Enable WhatsApp</label>
                </div>
              </div>
            </div>
          )}

          {/* Products & Portfolio - placeholder */}
          {(activeSection === 'products' || activeSection === 'portfolio') && (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Package size={40} className="mx-auto mb-3 text-gray-300" />
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{activeSection === 'products' ? 'Products' : 'Portfolio'} Management</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Admin can add, edit, and manage {activeSection} from here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
