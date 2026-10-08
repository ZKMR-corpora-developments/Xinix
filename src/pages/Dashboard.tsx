import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Package, Clock, CheckCircle, XCircle, CreditCard,
  MessageCircle, FileText, Bell, Heart, Settings, LogOut,
  ChevronRight, Star, Eye, Edit, Trash2, AlertCircle, Loader2
} from 'lucide-react';
import { useAuthStore, useBookingStore, useWishlistStore, useNotificationStore, useReviewStore } from '../store';

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  in_progress: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const { bookings, getBookingsByUser } = useBookingStore();
  const { items: wishlistItems } = useWishlistStore();
  const { notifications, markAsRead, markAllAsRead, getUnreadCount } = useNotificationStore();
  const { addReview, getApprovedReviews } = useReviewStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState({ rating: 5, review: '' });

  if (!user) { navigate('/auth'); return null; }

  const userBookings = getBookingsByUser(user.id);
  const userNotifications = notifications.filter(n => n.userId === user.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const unreadCount = getUnreadCount(user.id);

  const handleLogout = () => { logout(); navigate('/'); };

  const handleReviewSubmit = (bookingId: string) => {
    const booking = userBookings.find(b => b.id === bookingId);
    if (!booking) return;
    addReview({
      userId: user.id,
      userName: user.name,
      bookingId,
      serviceName: booking.serviceName,
      rating: reviewData.rating,
      review: reviewData.review,
      isVerified: booking.status === 'completed',
      status: 'pending'
    });
    setShowReviewForm(null);
    setReviewData({ rating: 5, review: '' });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'bookings', label: 'Bookings', icon: Package },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Welcome, {user.name}</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage your bookings, projects, and account</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800" style={{ color: 'var(--text-secondary)' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto hide-scrollbar border-b border-gray-200 dark:border-gray-700 mb-6">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-brand-600 text-brand-600' : 'border-transparent'}`} style={{ color: activeTab === tab.id ? undefined : 'var(--text-secondary)' }}>
            <tab.icon size={16} /> {tab.label}
            {tab.badge && tab.badge > 0 && <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full">{tab.badge}</span>}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Bookings</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{userBookings.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Active Projects</p>
              <p className="text-2xl font-bold text-blue-600">{userBookings.filter(b => ['new', 'pending', 'confirmed', 'in_progress'].includes(b.status)).length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Completed</p>
              <p className="text-2xl font-bold text-green-600">{userBookings.filter(b => b.status === 'completed').length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Wishlist</p>
              <p className="text-2xl font-bold text-pink-600">{wishlistItems.length}</p>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Bookings</h3>
            {userBookings.length === 0 ? (
              <div className="text-center py-8">
                <Package size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>No bookings yet</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Browse our services and book your first project.</p>
                <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-brand-600 font-medium text-sm hover:underline">
                  Explore Services <ChevronRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {userBookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{booking.serviceName}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>ID: {booking.id} • {new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[booking.status]}`}>{booking.status.replace('_', ' ')}</span>
                      {booking.status === 'completed' && (
                        <button onClick={() => setShowReviewForm(booking.id)} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                          <Star size={14} className="text-amber-500" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {userBookings.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Package size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No bookings yet</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Start by exploring our services.</p>
              <Link to="/services" className="px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium">Browse Services</Link>
            </div>
          ) : (
            userBookings.map(booking => (
              <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{booking.serviceName}</h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Booking ID: {booking.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>{booking.status.replace('_', ' ')}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div><span style={{ color: 'var(--text-muted)' }}>Package:</span> <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{booking.packageName || 'N/A'}</span></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Total:</span> <span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{booking.estimatedTotal.toLocaleString()}</span></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Payment:</span> <span className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>{booking.paymentStatus.replace('_', ' ')}</span></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Date:</span> <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{new Date(booking.createdAt).toLocaleDateString()}</span></div>
                </div>
                {/* Project Stages */}
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Project Status</p>
                  <div className="flex items-center gap-1">
                    {['Request', 'Planning', 'Design', 'Development', 'Testing', 'Review', 'Delivered'].map((stage, i) => {
                      const stageIndex = ['new', 'pending', 'confirmed', 'in_progress', 'in_progress', 'completed', 'completed'].indexOf(booking.status);
                      const isActive = i <= stageIndex;
                      return (
                        <div key={stage} className="flex-1">
                          <div className={`h-1.5 rounded-full ${isActive ? 'bg-brand-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                          <p className={`text-[9px] mt-1 ${isActive ? 'text-brand-600 font-medium' : ''}`} style={{ color: isActive ? undefined : 'var(--text-muted)' }}>{stage}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {booking.status === 'completed' && (
                  <button onClick={() => setShowReviewForm(booking.id)} className="mt-3 px-4 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm font-medium flex items-center gap-1">
                    <Star size={14} /> Leave a Review
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div>
          {userNotifications.length > 0 && (
            <button onClick={() => markAllAsRead(user.id)} className="mb-4 text-sm text-brand-600 font-medium hover:underline">Mark all as read</button>
          )}
          {userNotifications.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Bell size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>No notifications</p>
            </div>
          ) : (
            <div className="space-y-2">
              {userNotifications.map(notif => (
                <div key={notif.id} onClick={() => markAsRead(notif.id)} className={`p-4 rounded-xl border cursor-pointer transition-all ${notif.isRead ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-brand-50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-800'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{notif.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{notif.message}</p>
                    </div>
                    {!notif.isRead && <div className="w-2 h-2 rounded-full bg-brand-600 mt-1.5" />}
                  </div>
                  <p className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>{new Date(notif.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Heart size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Your wishlist is empty</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Save services and products you're interested in.</p>
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{wishlistItems.length} items in your wishlist</p>
          )}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 max-w-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white text-xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{user.name}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
              <span className="text-xs px-2 py-0.5 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 rounded-full capitalize">{user.role}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span style={{ color: 'var(--text-muted)' }}>Phone</span><span style={{ color: 'var(--text-primary)' }}>{user.phone || 'Not set'}</span></div>
            <div className="flex justify-between text-sm"><span style={{ color: 'var(--text-muted)' }}>Member Since</span><span style={{ color: 'var(--text-primary)' }}>{new Date(user.createdAt).toLocaleDateString()}</span></div>
            <div className="flex justify-between text-sm"><span style={{ color: 'var(--text-muted)' }}>Total Bookings</span><span style={{ color: 'var(--text-primary)' }}>{userBookings.length}</span></div>
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowReviewForm(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Leave a Review</h3>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} onClick={() => setReviewData({ ...reviewData, rating: star })}>
                    <Star size={24} className={star <= reviewData.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Your Review</label>
              <textarea value={reviewData.review} onChange={e => setReviewData({ ...reviewData, review: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm resize-none" style={{ color: 'var(--text-primary)' }} placeholder="Share your experience..." />
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Your review will be visible after admin approval.</p>
            <div className="flex gap-2">
              <button onClick={() => setShowReviewForm(null)} className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Cancel</button>
              <button onClick={() => handleReviewSubmit(showReviewForm)} disabled={!reviewData.review} className="flex-1 py-2 rounded-lg gradient-bg text-white text-sm font-medium disabled:opacity-50">Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
