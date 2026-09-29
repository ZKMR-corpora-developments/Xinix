import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Search, Heart, ShoppingCart, Bell, User, Moon, Sun,
  Phone, Mail, MapPin, ChevronDown, Home, Briefcase, Globe,
  Smartphone, Video, Film, Cpu, Package, Image, Lightbulb,
  Tag, Info, MessageCircle, ChevronRight, ExternalLink, ArrowRight
} from 'lucide-react';
import { useAuthStore, useCartStore, useWishlistStore, useNotificationStore, useAdminStore } from '../store';

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Services', path: '/services', icon: Briefcase },
  { label: 'Websites', path: '/services?cat=websites', icon: Globe },
  { label: 'Apps', path: '/services?cat=apps', icon: Smartphone },
  { label: 'AI Videos', path: '/services?cat=ai-videos', icon: Video },
  { label: 'Editing', path: '/services?cat=editing', icon: Film },
  { label: 'Simulators', path: '/services?cat=simulators', icon: Cpu },
  { label: 'Products', path: '/products', icon: Package },
  { label: 'Portfolio', path: '/portfolio', icon: Image },
  { label: 'Build My Idea', path: '/build', icon: Lightbulb },
  { label: 'Offers', path: '/offers', icon: Tag },
  { label: 'About', path: '/about', icon: Info },
  { label: 'Contact', path: '/contact', icon: MessageCircle },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { notifications } = useNotificationStore();
  const { settings } = useAdminStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  const unreadNotifications = notifications.filter(n => !n.isRead && n.userId === user?.id).length;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ZK</span>
              </div>
              <span className="font-bold text-lg hidden sm:block" style={{ color: 'var(--text-primary)' }}>{settings.companyName}</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.slice(0, 8).map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  style={{ color: location.pathname === item.path ? undefined : 'var(--text-secondary)' }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="relative group">
                <button className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: 'var(--text-secondary)' }}>
                  More <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 min-w-[180px]">
                    {navItems.slice(8).map(item => (
                      <Link key={item.path} to={item.path} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700" style={{ color: 'var(--text-secondary)' }}>
                        <item.icon size={16} /> {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: 'var(--text-secondary)' }}>
                <Search size={20} />
              </button>
              <Link to="/wishlist" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
                <Heart size={20} />
                {wishlistItems.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{wishlistItems.length}</span>}
              </Link>
              <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative" style={{ color: 'var(--text-secondary)' }}>
                <ShoppingCart size={20} />
                {cartItems.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-600 text-white text-[10px] rounded-full flex items-center justify-center">{cartItems.length}</span>}
              </Link>
              {isAuthenticated && (
                <Link to="/notifications" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
                  <Bell size={20} />
                  {unreadNotifications > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center">{unreadNotifications}</span>}
                </Link>
              )}
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: 'var(--text-secondary)' }}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {isAuthenticated ? (
                <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{user?.name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                </Link>
              ) : (
                <Link to="/auth" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  <User size={16} /> Login
                </Link>
              )}
              <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 xl:hidden" style={{ color: 'var(--text-primary)' }}>
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/50" onClick={() => setIsMenuOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X size={20} /></button>
              </div>
              <nav className="p-4 space-y-1">
                {navItems.map(item => (
                  <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === item.path ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`} style={{ color: location.pathname === item.path ? undefined : 'var(--text-secondary)' }}>
                    <item.icon size={18} /> {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                {!isAuthenticated ? (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gradient-bg text-white font-medium">
                    <User size={18} /> Login / Register
                  </Link>
                ) : (
                  <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gradient-bg text-white font-medium">
                    <User size={18} /> {user?.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/50 flex items-start justify-center pt-20 px-4" onClick={() => setIsSearchOpen(false)}>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services, products, portfolio..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && searchQuery) { navigate(`/search?q=${searchQuery}`); setIsSearchOpen(false); } }}
                  className="flex-1 bg-transparent outline-none text-lg"
                  style={{ color: 'var(--text-primary)' }}
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18} /></button>
              </div>
              <div className="p-4">
                <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['3D Website', 'AI Video', 'Mobile App', 'Logo Design', 'Video Editing', 'E-Commerce'].map(term => (
                    <button key={term} onClick={() => { navigate(`/search?q=${term}`); setIsSearchOpen(false); }} className="px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-800 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  const { settings } = useAdminStore();
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ZK</span>
              </div>
              <span className="font-bold text-lg text-white">{settings.companyName}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Your Ideas. Our Technology. Premium digital services marketplace for websites, apps, AI videos, editing, and more.</p>
            <div className="space-y-2 text-sm">
              <a href={`tel:${settings.companyPhone1}`} className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={14} /> {settings.companyPhone1}</a>
              <a href={`tel:${settings.companyPhone2}`} className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={14} /> {settings.companyPhone2}</a>
              <a href={`mailto:${settings.companyEmail}`} className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={14} /> {settings.companyEmail}</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {['Website Development', 'App Development', 'AI Video Production', 'Video Editing', 'Simulator Development', 'Logo & Branding', 'SEO & Marketing', 'UI/UX Design'].map(s => (
                <li key={s}><Link to="/services" className="hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Build My Idea', path: '/build' },
                { label: 'Portfolio', path: '/portfolio' },
                { label: 'Price Calculator', path: '/calculator' },
                { label: 'Compare Services', path: '/compare' },
                { label: 'Offers & Deals', path: '/offers' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
                { label: 'FAQ', path: '/faq' },
              ].map(l => (
                <li key={l.label}><Link to={l.path} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* QR Code & Policies */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Connect</h3>
            <div className="bg-gray-800 rounded-xl p-4 mb-4 text-center">
              <div className="w-24 h-24 mx-auto bg-white rounded-lg flex items-center justify-center mb-2">
                <div className="text-gray-900 text-xs text-center p-2">
                  <ExternalLink size={24} className="mx-auto mb-1" />
                  <span className="font-medium">Scan to Connect</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">Book your service, explore our work, or contact us instantly.</p>
            </div>
            <div className="space-y-2 text-sm">
              <Link to="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="block hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/refund-policy" className="block hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</p>
          <p className="text-xs text-gray-600">DEMO PLATFORM — All data shown is for demonstration purposes.</p>
        </div>
      </div>
    </footer>
  );
}

export function MobileBottomNav() {
  const location = useLocation();
  const { items: cartItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const bottomItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Services', path: '/services', icon: Briefcase },
    { label: 'Build', path: '/build', icon: Lightbulb },
    { label: 'Cart', path: '/cart', icon: ShoppingCart, badge: cartItems.length },
    { label: 'Account', path: isAuthenticated ? '/dashboard' : '/auth', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-bottom">
      <div className="flex items-center justify-around py-2">
        {bottomItems.map(item => (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg relative ${location.pathname === item.path ? 'text-brand-600' : ''}`} style={{ color: location.pathname === item.path ? undefined : 'var(--text-muted)' }}>
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
            {item.badge && item.badge > 0 ? <span className="absolute -top-0.5 right-1 w-4 h-4 bg-brand-600 text-white text-[9px] rounded-full flex items-center justify-center">{item.badge}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Header />
      <main className="flex-1 pt-16 lg:pt-18 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
