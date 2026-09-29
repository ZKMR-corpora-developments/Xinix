import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Clock, ArrowRight, Eye, ChevronRight, Zap, Shield, Package as PackageIcon } from 'lucide-react';
import { Service, Product, PortfolioItem, useWishlistStore, useCartStore, useAuthStore, useBookingStore, useNotificationStore } from '../store';

// Service Card
export function ServiceCard({ service }: { service: Service }) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(service.id);
  const categoryColors: Record<string, string> = {
    websites: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    apps: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'ai-videos': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    editing: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    simulators: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    branding: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    marketing: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  };

  const categoryIcons: Record<string, string> = {
    websites: '🌐', apps: '📱', 'ai-videos': '🎬', editing: '🎞️', simulators: '🖥️', branding: '🎨', marketing: '📈'
  };

  return (
    <motion.div whileHover={{ y: -4 }} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300" style={{ boxShadow: 'var(--card-shadow)' }}>
      {/* Image Area */}
      <div className="relative h-44 bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 flex items-center justify-center overflow-hidden">
        <span className="text-5xl">{categoryIcons[service.category] || '💼'}</span>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {service.isFeatured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-semibold rounded-full">Featured</span>}
          {service.isTrending && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-semibold rounded-full">Trending</span>}
          {service.isNew && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full">New</span>}
        </div>
        {/* Wishlist */}
        <button onClick={(e) => { e.preventDefault(); toggleItem(service.id); }} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur hover:bg-white dark:hover:bg-gray-700 transition-colors">
          <Heart size={16} className={inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${categoryColors[service.category] || 'bg-gray-100 text-gray-600'}`}>
            {service.category.replace('-', ' ')}
          </span>
          <span className="text-[10px] flex items-center gap-0.5" style={{ color: 'var(--text-muted)' }}>
            <Clock size={10} /> {service.deliveryEstimate}
          </span>
        </div>
        <Link to={`/service/${service.id}`}>
          <h3 className="font-semibold text-base mb-1.5 line-clamp-2 group-hover:text-brand-600 transition-colors" style={{ color: 'var(--text-primary)' }}>{service.name}</h3>
        </Link>
        <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>

        {/* Features Preview */}
        <div className="flex flex-wrap gap-1 mb-3">
          {service.features.slice(0, 3).map(f => (
            <span key={f} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px]" style={{ color: 'var(--text-secondary)' }}>{f}</span>
          ))}
          {service.features.length > 3 && <span className="px-2 py-0.5 text-[10px]" style={{ color: 'var(--text-muted)' }}>+{service.features.length - 3}</span>}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Starting at</span>
            <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>₹{service.basePrice.toLocaleString()}</p>
          </div>
          <Link to={`/service/${service.id}`} className="flex items-center gap-1 px-3 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity">
            View <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Product Card
export function ProductCard({ product }: { product: Product }) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const inWishlist = isInWishlist(product.id);
  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <motion.div whileHover={{ y: -4 }} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300" style={{ boxShadow: 'var(--card-shadow)' }}>
      <div className="relative h-40 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 flex items-center justify-center">
        <PackageIcon size={40} className="text-emerald-400" />
        {product.discount && (
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-red-500 text-white text-[10px] font-semibold rounded-full">{product.discount}% OFF</span>
        )}
        <button onClick={() => toggleItem(product.id)} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <Heart size={16} className={inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
        </button>
      </div>
      <div className="p-4">
        <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">{product.category}</span>
        <h3 className="font-semibold text-sm mt-1 mb-1 line-clamp-2" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
        <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>₹{Math.round(finalPrice).toLocaleString()}</span>
            {product.discount && <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>₹{product.price.toLocaleString()}</span>}
          </div>
          <button onClick={() => addItem({ id: product.id, productId: product.id, name: product.name, type: 'product', price: finalPrice, quantity: 1, maintenanceCost: 0 })} className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Portfolio Card
export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const categoryIcons: Record<string, string> = {
    websites: '🌐', apps: '📱', 'ai-videos': '🎬', editing: '🎞️', branding: '🎨'
  };

  return (
    <motion.div whileHover={{ y: -4 }} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <span className="text-5xl">{categoryIcons[item.category] || '✨'}</span>
        {item.isFeatured && <span className="absolute top-3 left-3 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-semibold rounded-full">Featured</span>}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-900 flex items-center gap-1"><Eye size={14} /> View Project</span>
        </div>
      </div>
      <div className="p-4">
        <span className="text-[10px] font-medium text-violet-600 dark:text-violet-400">{item.category}</span>
        <h3 className="font-semibold mt-1 mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
        <p className="text-sm line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
        <div className="flex flex-wrap gap-1">
          {item.technologies.slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px]" style={{ color: 'var(--text-secondary)' }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Booking Modal
export function BookingModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const { user, isAuthenticated } = useAuthStore();
  const { createBooking } = useBookingStore();
  const { addNotification } = useNotificationStore();
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(service.packages[0]);
  const [formData, setFormData] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '',
    description: '', deadline: '', referenceLinks: '', instructions: '',
    maintenanceCost: service.maintenanceCost || 0
  });
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const subtotal = selectedPackage.price;
  const maintenance = formData.maintenanceCost;
  const total = subtotal + maintenance;

  const handleSubmit = () => {
    if (!isAuthenticated) { onClose(); return; }
    const booking = createBooking({
      userId: user!.id,
      serviceId: service.id,
      serviceName: service.name,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      quantity: 1,
      basePrice: selectedPackage.price,
      maintenanceCost: maintenance,
      discount: 0,
      estimatedTotal: total,
      status: 'new',
      paymentStatus: 'unpaid',
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      projectDescription: formData.description,
      deadline: formData.deadline,
      referenceLinks: formData.referenceLinks ? formData.referenceLinks.split('\n') : [],
      additionalInstructions: formData.instructions
    });
    setBookingId(booking.id);
    if (user) {
      addNotification({ userId: user.id, title: 'Booking Confirmed', message: `Your booking for ${service.name} has been received. Booking ID: ${booking.id}`, type: 'booking' });
    }
    setBookingComplete(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {bookingComplete ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <Shield size={28} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Booking Confirmed!</h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Your booking has been submitted successfully.</p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-left mb-4">
              <p className="text-sm"><strong>Booking ID:</strong> {bookingId}</p>
              <p className="text-sm"><strong>Service:</strong> {service.name}</p>
              <p className="text-sm"><strong>Package:</strong> {selectedPackage.name}</p>
              <p className="text-sm"><strong>Estimated Total:</strong> ₹{total.toLocaleString()}</p>
              <p className="text-sm"><strong>Estimated Delivery:</strong> {selectedPackage.deliveryDays} working days</p>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>A confirmation email will be sent to {formData.email}. Our team will contact you within 24 hours.</p>
            <button onClick={onClose} className="px-6 py-2.5 rounded-lg gradient-bg text-white font-medium">Done</button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Book: {service.name}</h2>
                <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><span className="text-xl">×</span></button>
              </div>
              {/* Steps */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= step ? 'bg-brand-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                ))}
              </div>
            </div>

            <div className="p-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Select Package</h3>
                  <div className="grid gap-3">
                    {service.packages.map(pkg => (
                      <button key={pkg.id} onClick={() => setSelectedPackage(pkg)} className={`p-4 rounded-xl border-2 text-left transition-all ${selectedPackage.id === pkg.id ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{pkg.name}</span>
                          {pkg.isPopular && <span className="px-2 py-0.5 bg-brand-100 text-brand-700 text-[10px] font-semibold rounded-full">Popular</span>}
                        </div>
                        <p className="text-xl font-bold text-brand-600">₹{pkg.price.toLocaleString()}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {pkg.features.slice(0, 4).map(f => <span key={f} className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded" style={{ color: 'var(--text-secondary)' }}>{f}</span>)}
                        </div>
                        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Delivery: {pkg.deliveryDays} days • {pkg.revisions} revisions</p>
                      </button>
                    ))}
                  </div>
                  {service.maintenanceCost !== undefined && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Maintenance Cost (Optional)</p>
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">₹{service.maintenanceCost.toLocaleString()} — Covers updates, bug fixes, and minor changes after delivery.</p>
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Your Details</h3>
                  {!isAuthenticated && <p className="text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">Please login to proceed with booking.</p>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
                      <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Email *</label>
                      <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Phone *</label>
                      <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Deadline</label>
                      <input type="date" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Project Description *</label>
                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm resize-none" style={{ color: 'var(--text-primary)' }} placeholder="Describe your project requirements..." />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Reference Links (one per line)</label>
                    <textarea value={formData.referenceLinks} onChange={e => setFormData({ ...formData, referenceLinks: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm resize-none" style={{ color: 'var(--text-primary)' }} placeholder="https://example.com/inspiration" />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Additional Instructions</label>
                    <textarea value={formData.instructions} onChange={e => setFormData({ ...formData, instructions: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm resize-none" style={{ color: 'var(--text-primary)' }} />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Order Summary</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between text-sm"><span style={{ color: 'var(--text-secondary)' }}>Service</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>{service.name}</span></div>
                    <div className="flex justify-between text-sm"><span style={{ color: 'var(--text-secondary)' }}>Package</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>{selectedPackage.name}</span></div>
                    <div className="flex justify-between text-sm"><span style={{ color: 'var(--text-secondary)' }}>Development Price</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{selectedPackage.price.toLocaleString()}</span></div>
                    {maintenance > 0 && <div className="flex justify-between text-sm"><span style={{ color: 'var(--text-secondary)' }}>Maintenance Cost</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{maintenance.toLocaleString()}</span></div>}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between"><span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Estimated Total</span><span className="font-bold text-lg text-brand-600">₹{total.toLocaleString()}</span></div>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Zap size={16} className="text-blue-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-blue-700 dark:text-blue-300">Estimated delivery: {selectedPackage.deliveryDays} working days. Final price may change after project review.</p>
                  </div>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>By confirming, you agree to our booking policy. A confirmation email will be sent to your registered email.</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Back</button>
              ) : <div />}
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="px-6 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium flex items-center gap-1">
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!isAuthenticated || !formData.name || !formData.email || !formData.description} className="px-6 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
                  Confirm Booking <Shield size={16} />
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}


