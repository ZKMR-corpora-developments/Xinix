import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Send, MessageCircle, Clock, Shield,
  CheckCircle, Users, Target, Heart, Award, HelpCircle,
  ChevronDown, ChevronUp, Tag, Percent, Timer, ArrowRight,
  ShoppingCart, Trash2, Plus, Minus, Heart as HeartIcon,
  Calculator as CalcIcon, DollarSign, X, Search as SearchIcon
} from 'lucide-react';
import { useAdminStore, useCartStore, useWishlistStore, useAuthStore, useNotificationStore } from '../store';
import { ServiceCard, ProductCard } from '../components/Cards';

// Contact Page
export function ContactPage() {
  const { settings } = useAdminStore();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Get In Touch</h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Have a question or want to discuss a project? We'd love to hear from you.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
              <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Message Sent!</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Name *</label>
                  <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Email *</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Phone</label>
                  <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                  <input value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Message *</label>
                <textarea required rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm resize-none" style={{ color: 'var(--text-primary)' }} />
              </div>
              <button type="submit" className="px-8 py-3 rounded-xl gradient-bg text-white font-semibold flex items-center gap-2 hover:opacity-90">
                <Send size={18} /> Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Contact Information</h3>
            <div className="space-y-4">
              <a href={`tel:${settings.companyPhone1}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Phone size={18} className="text-brand-600" />
                <div><p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{settings.companyPhone1}</p><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tap to call</p></div>
              </a>
              <a href={`tel:${settings.companyPhone2}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Phone size={18} className="text-brand-600" />
                <div><p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{settings.companyPhone2}</p><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tap to call</p></div>
              </a>
              <a href={`mailto:${settings.companyEmail}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Mail size={18} className="text-brand-600" />
                <div><p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{settings.companyEmail}</p><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tap to email</p></div>
              </a>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Response Time</h3>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Clock size={16} className="text-brand-600" /> We typically respond within 24 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// About Page
export function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>About Us</h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>We are a premium digital services company dedicated to turning your ideas into reality.</p>
      </div>

      <div className="space-y-12">
        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our Mission</h2>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>To provide accessible, high-quality digital services that empower businesses and individuals to establish their online presence. We believe every idea deserves professional execution, regardless of scale.</p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our Process</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { step: '1', title: 'Consultation', desc: 'We understand your needs, goals, and vision for the project.' },
              { step: '2', title: 'Planning & Design', desc: 'Our team creates detailed plans and design mockups for your approval.' },
              { step: '3', title: 'Development', desc: 'We build your project with regular updates and progress reports.' },
              { step: '4', title: 'Delivery & Support', desc: 'We deliver the final product and provide ongoing support.' },
            ].map(item => (
              <div key={item.step} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold mb-2">{item.step}</div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Why Choose Us?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Target, title: 'Result-Oriented', desc: 'Every project is designed to achieve your specific business goals.' },
              { icon: Shield, title: 'Quality Guaranteed', desc: 'Rigorous testing and review process for every deliverable.' },
              { icon: Clock, title: 'On-Time Delivery', desc: 'We respect deadlines and keep you updated throughout.' },
              { icon: Heart, title: 'Customer-First', desc: 'Your satisfaction is our priority. We work until you are happy.' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <item.icon size={20} className="text-brand-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Offers Page
export function OffersPage() {
  const { coupons } = useAdminStore();
  const activeCoupons = coupons.filter(c => c.isActive && new Date(c.expiryDate) > new Date());

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Offers & Deals</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Save more with our exclusive offers and coupons</p>
      </div>

      {activeCoupons.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Tag size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No active offers</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Check back soon for new deals and discounts.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {activeCoupons.map(coupon => (
            <div key={coupon.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 gradient-bg opacity-10 rounded-bl-full" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center">
                  {coupon.type === 'percentage' ? <Percent size={20} className="text-brand-600" /> : <DollarSign size={20} className="text-brand-600" />}
                </div>
                <div>
                  <p className="font-bold text-lg font-mono" style={{ color: 'var(--text-primary)' }}>{coupon.code}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{coupon.type === 'percentage' ? `${coupon.value}% Off` : `₹${coupon.value} Off`}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                {coupon.minOrder && <p>Minimum order: ₹{coupon.minOrder.toLocaleString()}</p>}
                {coupon.maxDiscount && <p>Maximum discount: ₹{coupon.maxDiscount.toLocaleString()}</p>}
                <p>Valid until: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
              </div>
              <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm text-brand-600 font-medium hover:underline">
                Use Now <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Combo Packages */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Combo Packages</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Website + Logo', price: 18000, original: 20000, items: ['Business Website', 'Logo Design', 'Brand Colors'] },
            { name: 'Website + SEO', price: 22000, original: 25000, items: ['Business Website', 'SEO Setup', '3 Months Optimization'] },
            { name: 'Complete Business', price: 45000, original: 55000, items: ['Website', 'Logo', 'SEO', 'AI Video', 'Social Media Kit'] },
          ].map(combo => (
            <div key={combo.name} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{combo.name}</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-brand-600">₹{combo.price.toLocaleString()}</span>
                <span className="text-sm line-through" style={{ color: 'var(--text-muted)' }}>₹{combo.original.toLocaleString()}</span>
              </div>
              <div className="space-y-1.5 mb-4">
                {combo.items.map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle size={14} className="text-green-500" /><span style={{ color: 'var(--text-secondary)' }}>{item}</span></div>
                ))}
              </div>
              <Link to="/services" className="w-full py-2.5 rounded-xl gradient-bg text-white text-sm font-medium text-center block hover:opacity-90">Book This Package</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Cart Page
export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, applyCoupon, appliedCoupon } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMaintenance = items.reduce((sum, item) => sum + item.maintenanceCost * item.quantity, 0);
  const couponDiscount = appliedCoupon ? (appliedCoupon.type === 'percentage' ? subtotal * appliedCoupon.value / 100 : appliedCoupon.value) : 0;
  const total = subtotal + totalMaintenance - couponDiscount;

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    setCouponMessage(result.message);
    if (result.success) setCouponCode('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Cart / Bookings</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Your cart is empty</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Browse our services and add items to your cart.</p>
          <Link to="/services" className="px-6 py-2.5 rounded-xl gradient-bg text-white font-medium inline-flex items-center gap-2">
            Explore Services <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                  <span className="text-xl">{item.type === 'product' ? '📦' : '💼'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.type} {item.packageName ? `• ${item.packageName}` : ''}</p>
                  <p className="text-sm font-semibold text-brand-600">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-1 rounded bg-gray-100 dark:bg-gray-700"><Minus size={14} /></button>
                  <span className="text-sm font-medium w-6 text-center" style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded bg-gray-100 dark:bg-gray-700"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 h-fit sticky top-24">
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span style={{ color: 'var(--text-secondary)' }}>Subtotal</span><span style={{ color: 'var(--text-primary)' }}>₹{subtotal.toLocaleString()}</span></div>
              {totalMaintenance > 0 && <div className="flex justify-between"><span style={{ color: 'var(--text-secondary)' }}>Maintenance</span><span style={{ color: 'var(--text-primary)' }}>₹{totalMaintenance.toLocaleString()}</span></div>}
              {couponDiscount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{couponDiscount.toLocaleString()}</span></div>}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold"><span style={{ color: 'var(--text-primary)' }}>Total</span><span className="text-brand-600">₹{total.toLocaleString()}</span></div>
            </div>

            {/* Coupon */}
            <div className="mb-4">
              <div className="flex gap-2">
                <input value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="Coupon code" className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} />
                <button onClick={handleApplyCoupon} className="px-3 py-2 rounded-lg bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium">Apply</button>
              </div>
              {couponMessage && <p className={`text-xs mt-1 ${couponMessage.includes('Invalid') || couponMessage.includes('expired') || couponMessage.includes('no longer') || couponMessage.includes('Minimum') ? 'text-red-500' : 'text-green-600'}`}>{couponMessage}</p>}
            </div>

            {isAuthenticated ? (
              <button className="w-full py-3 rounded-xl gradient-bg text-white font-semibold hover:opacity-90">Proceed to Checkout</button>
            ) : (
              <Link to="/auth" className="w-full py-3 rounded-xl gradient-bg text-white font-semibold text-center block hover:opacity-90">Login to Checkout</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Wishlist Page
export function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const { services } = useAdminStore();
  const wishlistServices = services.filter(s => items.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>My Wishlist</h1>
        {items.length > 0 && <button onClick={clearWishlist} className="text-sm text-red-500 hover:underline">Clear All</button>}
      </div>
      {wishlistServices.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <HeartIcon size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Your wishlist is empty</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Save services you're interested in.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistServices.map(service => <ServiceCard key={service.id} service={service} />)}
        </div>
      )}
    </div>
  );
}

// Price Calculator Page
export function CalculatorPage() {
  const { services, settings } = useAdminStore();
  const [selectedService, setSelectedService] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [pages, setPages] = useState(5);
  const [animations, setAnimations] = useState(false);
  const [is3D, setIs3D] = useState(false);
  const [maintenance, setMaintenance] = useState(settings.maintenanceCosts[0] || 3000);

  const service = services.find(s => s.id === selectedService);
  const basePrice = service ? service.packages[selectedPackage]?.price || service.basePrice : 0;
  let addons = 0;
  if (pages > 5) addons += (pages - 5) * 1000;
  if (animations) addons += 5000;
  if (is3D) addons += 15000;
  const subtotal = basePrice + addons;
  const total = subtotal + maintenance;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Price Calculator</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Estimate the cost of your project</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Select Service</label>
            <select value={selectedService} onChange={e => { setSelectedService(e.target.value); setSelectedPackage(0); }} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" style={{ color: 'var(--text-primary)' }}>
              <option value="">Choose a service...</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          {service && (
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Select Package</label>
              <div className="space-y-2">
                {service.packages.map((pkg, i) => (
                  <button key={pkg.id} onClick={() => setSelectedPackage(i)} className={`w-full p-3 rounded-xl border-2 text-left transition-all ${selectedPackage === i ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                    <div className="flex justify-between">
                      <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{pkg.name}</span>
                      <span className="font-bold text-brand-600">₹{pkg.price.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Number of Pages: {pages}</label>
            <input type="range" min="1" max="50" value={pages} onChange={e => setPages(+e.target.value)} className="w-full" />
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={animations} onChange={e => setAnimations(e.target.checked)} className="rounded" /> Custom Animations (+₹5,000)</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={is3D} onChange={e => setIs3D(e.target.checked)} className="rounded" /> 3D Elements (+₹15,000)</label>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Maintenance Plan</label>
            <div className="flex flex-wrap gap-2">
              {settings.maintenanceCosts.map(cost => (
                <button key={cost} onClick={() => setMaintenance(cost)} className={`px-4 py-2 rounded-xl text-sm font-medium border-2 ${maintenance === cost ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-600' : 'border-gray-200 dark:border-gray-700'}`} style={{ color: maintenance === cost ? undefined : 'var(--text-secondary)' }}>
                  ₹{cost.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Estimated Cost</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span style={{ color: 'var(--text-secondary)' }}>Base Price</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{basePrice.toLocaleString()}</span></div>
            {addons > 0 && <div className="flex justify-between"><span style={{ color: 'var(--text-secondary)' }}>Add-ons</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{addons.toLocaleString()}</span></div>}
            <div className="flex justify-between"><span style={{ color: 'var(--text-secondary)' }}>Development Subtotal</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--text-secondary)' }}>Maintenance Cost</span><span className="font-medium" style={{ color: 'var(--text-primary)' }}>₹{maintenance.toLocaleString()}</span></div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Estimated Total</span>
              <span className="font-bold text-xl text-brand-600">₹{total.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-700 dark:text-amber-300">
            Final price may change after project review. This is an estimate only.
          </p>
          <Link to="/services" className="mt-4 w-full py-3 rounded-xl gradient-bg text-white font-semibold text-center block hover:opacity-90">Book This Service</Link>
        </div>
      </div>
    </div>
  );
}

// Search Results Page
export function SearchPage() {
  const [params] = useState(new URLSearchParams(window.location.search));
  const query = params.get('q') || '';
  const { services, products, portfolio } = useAdminStore();

  const matchedServices = services.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase()) || s.tags.some(t => t.includes(query.toLowerCase())));
  const matchedProducts = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
  const matchedPortfolio = portfolio.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Search Results for "{query}"</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{matchedServices.length + matchedProducts.length + matchedPortfolio.length} results found</p>

      {matchedServices.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Services ({matchedServices.length})</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedServices.map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
        </section>
      )}

      {matchedProducts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Products ({matchedProducts.length})</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {matchedServices.length === 0 && matchedProducts.length === 0 && (
        <div className="text-center py-16">
          <SearchIcon size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No results found</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Try different keywords or browse our services.</p>
        </div>
      )}
    </div>
  );
}

// FAQ Page
export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'How do I book a service?', a: 'Browse our services, select the one you need, choose a package, and click "Book This Service". Fill in your details and confirm.' },
    { q: 'What is the maintenance cost?', a: 'Maintenance cost is separate from development cost. It covers updates, bug fixes, and minor changes after delivery. Plans range from ₹3,000 to ₹8,000.' },
    { q: 'How long does delivery take?', a: 'Delivery time varies by service and package. Each service shows estimated delivery time. Complex projects may take longer.' },
    { q: 'Can I request revisions?', a: 'Yes! Each package includes a specific number of revisions. You can request changes within the revision limit.' },
    { q: 'Do you offer refunds?', a: 'Refund requests must be made within 7 days of booking. Refunds are subject to project progress review. See our Refund Policy for details.' },
    { q: 'How do payments work?', a: 'Payment options and methods will be configured based on your project. We support multiple payment methods.' },
    { q: 'Can I customize a package?', a: 'Yes, you can customize any package to fit your specific needs. Contact our team for custom pricing.' },
    { q: 'Do you provide source code?', a: 'Yes, full source code and documentation are provided upon project completion.' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Frequently Asked Questions</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Find answers to common questions</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full p-4 flex items-center justify-between text-left">
              <span className="font-medium text-sm pr-4" style={{ color: 'var(--text-primary)' }}>{faq.q}</span>
              {openIndex === i ? <ChevronUp size={18} className="text-brand-600 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
            </button>
            {openIndex === i && <div className="px-4 pb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Legal Pages
export function LegalPage({ type }: { type: 'privacy' | 'terms' | 'refund' }) {
  const titles = { privacy: 'Privacy Policy', terms: 'Terms & Conditions', refund: 'Refund & Cancellation Policy' };
  const contents = {
    privacy: 'We collect only the information necessary to provide our services. Your personal data is stored securely and never shared with third parties without your consent. We use your information to process bookings, communicate project updates, and improve our services. You can request data deletion at any time by contacting us.',
    terms: 'By using our platform and services, you agree to these terms. All bookings are subject to confirmation and availability. Prices are in Indian Rupees (₹) and may vary based on project requirements. We reserve the right to modify services and pricing. Intellectual property rights are transferred upon full payment.',
    refund: 'Refund requests must be submitted within 7 days of booking. If work has not commenced, a full refund will be processed. If work is in progress, refunds are calculated based on work completed. Custom work that has been delivered and approved is non-refundable. Processing time for refunds is 5-10 business days.'
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>{titles[type]}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{contents[type]}</p>
        <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
