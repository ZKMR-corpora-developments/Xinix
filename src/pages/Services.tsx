import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, Star, Clock, Heart, ShoppingCart,
  Eye, Monitor, Smartphone, Tablet, CheckCircle, Zap, Shield,
  Package, MessageCircle, ArrowRight, Globe, Video, Film, Cpu, Palette, TrendingUp
} from 'lucide-react';
import { useAdminStore, useWishlistStore, useCartStore, useReviewStore } from '../store';
import { ServiceCard, BookingModal } from '../components/Cards';

const categories = [
  { id: 'all', label: 'All Services', icon: Package },
  { id: 'websites', label: 'Websites', icon: Globe },
  { id: 'apps', label: 'Apps', icon: Smartphone },
  { id: 'ai-videos', label: 'AI Videos', icon: Video },
  { id: 'editing', label: 'Editing', icon: Film },
  { id: 'simulators', label: 'Simulators', icon: Cpu },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp },
];

export default function ServicesPage() {
  const [searchParams] = useSearchParams();
  const { services } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = useMemo(() => {
    let result = [...services];
    if (selectedCategory !== 'all') result = result.filter(s => s.category === selectedCategory);
    if (searchQuery) result = result.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()) || s.tags.some(t => t.includes(searchQuery.toLowerCase())));
    result = result.filter(s => s.basePrice >= priceRange[0] && s.basePrice <= priceRange[1]);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.basePrice - b.basePrice); break;
      case 'price-high': result.sort((a, b) => b.basePrice - a.basePrice); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'featured': result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)); break;
    }
    return result;
  }, [services, selectedCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Services Marketplace</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Browse our complete range of digital services</p>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" style={{ color: 'var(--text-primary)' }}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
        <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Price Range</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" placeholder="Min" style={{ color: 'var(--text-primary)' }} />
                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                    <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" placeholder="Max" style={{ color: 'var(--text-primary)' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'gradient-bg text-white shadow-md' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-300'}`}
            style={{ color: selectedCategory === cat.id ? undefined : 'var(--text-secondary)' }}
          >
            <cat.icon size={16} /> {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{filteredServices.length} services found</p>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No services found</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}

// Service Detail Page
export function ServiceDetailPage() {
  const { id } = useParams();
  const { services } = useAdminStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { getApprovedReviews, getAverageRating } = useReviewStore();
  const [showBooking, setShowBooking] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'reviews' | 'preview'>('overview');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const service = services.find(s => s.id === id);
  if (!service) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Service Not Found</h2>
      <Link to="/services" className="text-brand-600 hover:underline">← Back to Services</Link>
    </div>
  );

  const inWishlist = isInWishlist(service.id);
  const reviews = getApprovedReviews(service.name);
  const avgRating = getAverageRating(service.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        <Link to="/services" className="hover:text-brand-600">Services</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{service.name}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero */}
          <div className="relative h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 flex items-center justify-center mb-6 overflow-hidden">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-white font-bold">
                  {service.category === 'websites' ? '🌐' : service.category === 'apps' ? '📱' : service.category === 'ai-videos' ? '🎬' : service.category === 'editing' ? '🎞️' : service.category === 'simulators' ? '🖥️' : '💼'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{service.name}</h1>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
            {(['overview', 'packages', 'preview', 'reviews'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-brand-600 text-brand-600' : 'border-transparent'}`} style={{ color: activeTab === tab ? undefined : 'var(--text-secondary)' }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'reviews' && reviews.length > 0 && <span className="ml-1.5 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px]">{reviews.length}</span>}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>About This Service</h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Features Included</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {service.features.map(f => (
                    <div key={f} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <CheckCircle size={16} className="text-green-500 shrink-0" />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-center">
                  <Clock size={20} className="mx-auto mb-1 text-blue-600" />
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Delivery</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{service.deliveryEstimate}</p>
                </div>
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-center">
                  <Zap size={20} className="mx-auto mb-1 text-green-600" />
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Revisions</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{service.revisions} included</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-center">
                  <Shield size={20} className="mx-auto mb-1 text-purple-600" />
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Support</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Dedicated</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-center">
                  <Star size={20} className="mx-auto mb-1 text-amber-600" />
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Rating</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{avgRating > 0 ? avgRating.toFixed(1) : 'No reviews'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="space-y-4">
              {service.packages.map(pkg => (
                <div key={pkg.id} className={`p-6 rounded-2xl border-2 transition-all ${pkg.isPopular ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/10' : 'border-gray-200 dark:border-gray-700'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{pkg.name}</h3>
                      {pkg.isPopular && <span className="text-xs text-brand-600 font-medium">Most Popular</span>}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-brand-600">₹{pkg.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 mb-4">
                    {pkg.features.map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1"><Clock size={12} /> {pkg.deliveryDays} days delivery</span>
                    <span className="flex items-center gap-1"><Zap size={12} /> {pkg.revisions} revisions</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'preview' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-lg ${previewMode === 'desktop' ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600' : 'bg-gray-100 dark:bg-gray-800'}`}><Monitor size={18} /></button>
                <button onClick={() => setPreviewMode('tablet')} className={`p-2 rounded-lg ${previewMode === 'tablet' ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600' : 'bg-gray-100 dark:bg-gray-800'}`}><Tablet size={18} /></button>
                <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-lg ${previewMode === 'mobile' ? 'bg-brand-100 dark:bg-brand-900/40 text-brand-600' : 'bg-gray-100 dark:bg-gray-800'}`}><Smartphone size={18} /></button>
              </div>
              <div className={`mx-auto rounded-2xl border-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden transition-all ${previewMode === 'desktop' ? 'w-full h-96' : previewMode === 'tablet' ? 'w-3/4 h-96' : 'w-64 h-[500px] rounded-[2rem]'}`}>
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20">
                  <div className="text-center p-4">
                    <Eye size={40} className="mx-auto mb-3 text-brand-400" />
                    <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Preview: {service.name}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>This is a demonstration of the {previewMode} view. The actual deliverable will be a fully functional {service.type}.</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--text-muted)' }}>This preview demonstrates the style and quality you can expect. Actual deliverables will be custom-built to your requirements.</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <Star size={40} className="mx-auto mb-3 text-gray-300" />
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>No reviews yet</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Be the first verified customer to review this service.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center">
                          <span className="text-xs font-medium text-brand-600">{review.userName.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{review.userName}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />)}</div>
                            {review.isVerified && <span className="text-[10px] text-green-600 flex items-center gap-0.5"><CheckCircle size={10} /> Verified Purchase</span>}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{review.review}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Price Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
              <div className="mb-4">
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Starting at</p>
                <p className="text-3xl font-bold text-brand-600">₹{service.basePrice.toLocaleString()}</p>
                {service.maintenanceCost && (
                  <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-300">Maintenance Cost: ₹{service.maintenanceCost.toLocaleString()}</p>
                    <p className="text-[10px] text-amber-600 dark:text-amber-400">Separate from development price</p>
                  </div>
                )}
              </div>
              <button onClick={() => setShowBooking(true)} className="w-full py-3 rounded-xl gradient-bg text-white font-semibold mb-3 hover:opacity-90 transition-opacity">
                Book This Service
              </button>
              <button onClick={() => addItem({ id: `cart-${service.id}`, serviceId: service.id, name: service.name, type: 'service', price: service.basePrice, quantity: 1, maintenanceCost: service.maintenanceCost || 0 })} className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700" style={{ color: 'var(--text-primary)' }}>
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button onClick={() => toggleItem(service.id)} className={`w-full py-3 rounded-xl border font-medium text-sm flex items-center justify-center gap-2 mt-2 ${inWishlist ? 'border-red-300 bg-red-50 dark:bg-red-900/20 text-red-600' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`} style={{ color: inWishlist ? undefined : 'var(--text-secondary)' }}>
                <Heart size={16} className={inWishlist ? 'fill-red-500' : ''} /> {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Quick Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Delivery</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{service.deliveryEstimate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Revisions</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{service.revisions} included</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Type</span>
                <span className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>{service.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Category</span>
                <span className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>{service.category.replace('-', ' ')}</span>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Need help deciding?</p>
              <Link to="/contact" className="w-full py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" style={{ color: 'var(--text-primary)' }}>
                <MessageCircle size={16} /> Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && <BookingModal service={service} onClose={() => setShowBooking(false)} />}
      </AnimatePresence>
    </div>
  );
}
