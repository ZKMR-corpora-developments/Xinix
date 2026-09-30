import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Globe, Smartphone, Video, Film, Cpu, Palette,
  CheckCircle, Star, Users, Clock, Shield, Zap, TrendingUp,
  Sparkles, Code, Layers, Monitor, ChevronRight, Play,
  MessageCircle, Phone, Mail, Heart, Target, Lightbulb,
  Package, Tag, Calculator, GitCompare, Award
} from 'lucide-react';
import { useAdminStore, useReviewStore } from '../store';
import { ServiceCard } from '../components/Cards';

const heroPreviews = [
  { icon: Globe, label: 'Websites', color: 'from-blue-500 to-cyan-500' },
  { icon: Smartphone, label: 'Apps', color: 'from-purple-500 to-pink-500' },
  { icon: Video, label: 'AI Videos', color: 'from-pink-500 to-rose-500' },
  { icon: Film, label: 'Editing', color: 'from-orange-500 to-amber-500' },
  { icon: Cpu, label: 'Simulators', color: 'from-green-500 to-emerald-500' },
  { icon: Palette, label: 'Design', color: 'from-indigo-500 to-violet-500' },
];

const floatingCards = [
  { text: 'Custom UI Design', icon: Layers },
  { text: '2D & 3D Experiences', icon: Monitor },
  { text: 'AI-Powered Solutions', icon: Sparkles },
  { text: 'Professional Development', icon: Code },
];

const processSteps = [
  { step: '01', title: 'Share Your Idea', desc: 'Tell us what you need. We listen and understand your vision.' },
  { step: '02', title: 'We Plan & Design', desc: 'Our team creates a detailed plan and design mockups for your review.' },
  { step: '03', title: 'Development', desc: 'We build your project with precision, keeping you updated throughout.' },
  { step: '04', title: 'Review & Deliver', desc: 'You review the work, request changes, and we deliver the final product.' },
];

const comboPackages = [
  { name: 'Website + Logo', items: ['Business Website', 'Logo Design', 'Brand Colors'], price: 18000, save: 2000, icon: '🌐' },
  { name: 'Website + Logo + SEO', items: ['Business Website', 'Logo Design', 'SEO Setup'], price: 28000, save: 5000, icon: '🚀' },
  { name: 'Website + AI Video', items: ['Business Website', 'AI Promo Video', 'Social Media Kit'], price: 25000, save: 3000, icon: '🎬' },
  { name: 'Complete Business', items: ['Website', 'App', 'Logo', 'Marketing', 'AI Video'], price: 150000, save: 30000, icon: '💼' },
];

export default function HomePage() {
  const { services } = useAdminStore();
  const { getApprovedReviews, getAverageRating } = useReviewStore();
  const [activePreview, setActivePreview] = useState(0);
  const featuredServices = services.filter(s => s.isFeatured).slice(0, 6);
  const trendingServices = services.filter(s => s.isTrending).slice(0, 4);
  const approvedReviews = getApprovedReviews();
  const avgRating = getAverageRating();
  const totalEditingServices = services.filter(s => s.category === 'editing').length;

  useEffect(() => {
    const interval = setInterval(() => setActivePreview(p => (p + 1) % heroPreviews.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg-subtle" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/30 dark:bg-brand-800/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-100/20 dark:bg-cyan-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
                <Sparkles size={14} /> Premium Digital Services Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
                Your Ideas.<br />
                <span className="gradient-text">Our Technology.</span>
              </h1>
              <p className="text-lg sm:text-xl mb-8 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
                Websites, apps, AI videos, editing, simulators and digital solutions — all in one place.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/services" className="px-6 py-3 rounded-xl gradient-bg text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-brand-500/25">
                  Explore Services <ArrowRight size={18} />
                </Link>
                <Link to="/build" className="px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold flex items-center gap-2 hover:shadow-md transition-all" style={{ color: 'var(--text-primary)' }}>
                  <Lightbulb size={18} /> Build My Idea
                </Link>
                <Link to="/portfolio" className="hidden sm:flex px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold items-center gap-2 hover:shadow-md transition-all" style={{ color: 'var(--text-primary)' }}>
                  View Our Work
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Shield, text: 'Secure Platform' },
                  { icon: Clock, text: 'On-Time Delivery' },
                  { icon: Users, text: 'Dedicated Support' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon size={16} className="text-brand-600" />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interactive Preview */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-12 rounded-full bg-white dark:bg-gray-800 shadow-2xl flex items-center justify-center z-10">
                  <div className="text-center">
                    {(() => {
                      const Icon = heroPreviews[activePreview].icon;
                      return <Icon size={48} className="mx-auto mb-2 text-brand-600" />;
                    })()}
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{heroPreviews[activePreview].label}</p>
                  </div>
                </div>

                {heroPreviews.map((preview, i) => {
                  const angle = (i / heroPreviews.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 42;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  return (
                    <motion.div
                      key={i}
                      className={`absolute w-14 h-14 rounded-2xl bg-gradient-to-br ${preview.color} flex items-center justify-center shadow-lg cursor-pointer ${activePreview === i ? 'scale-125 z-20' : 'scale-100'}`}
                      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                      animate={{ scale: activePreview === i ? 1.25 : 1 }}
                      onClick={() => setActivePreview(i)}
                    >
                      <preview.icon size={22} className="text-white" />
                    </motion.div>
                  );
                })}

                {floatingCards.map((card, i) => (
                  <motion.div
                    key={card.text}
                    className="absolute glass rounded-xl px-3 py-2 shadow-lg flex items-center gap-2 z-20"
                    style={{
                      top: `${[5, 85, 15, 75][i]}%`,
                      left: `${[-5, 85, 90, -8][i]}%`,
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <card.icon size={14} className="text-brand-600" />
                    <span className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>{card.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our Services</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Everything you need to build your digital presence, all under one roof.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Globe, label: 'Websites', path: '/services?cat=websites', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600', count: services.filter(s => s.category === 'websites').length },
              { icon: Smartphone, label: 'Apps', path: '/services?cat=apps', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600', count: services.filter(s => s.category === 'apps').length },
              { icon: Video, label: 'AI Videos', path: '/services?cat=ai-videos', color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600', count: services.filter(s => s.category === 'ai-videos').length },
              { icon: Film, label: 'Editing', path: '/services?cat=editing', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600', count: totalEditingServices },
              { icon: Cpu, label: 'Simulators', path: '/services?cat=simulators', color: 'bg-green-100 dark:bg-green-900/30 text-green-600', count: services.filter(s => s.category === 'simulators').length },
              { icon: Palette, label: 'Branding', path: '/services?cat=branding', color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600', count: services.filter(s => s.category === 'branding').length },
            ].map(cat => (
              <Link key={cat.label} to={cat.path} className="group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center mx-auto mb-3`}>
                  <cat.icon size={24} />
                </div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{cat.label}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{cat.count}+ services</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Featured Services</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Our most popular and trending services</p>
            </div>
            <Link to="/services" className="hidden sm:flex items-center gap-1 text-brand-600 font-medium text-sm hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tools Section */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Calculator, title: 'Price Calculator', desc: 'Get instant price estimates', path: '/calculator', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
              { icon: GitCompare, title: 'Compare Services', desc: 'Side-by-side comparison', path: '/compare', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
              { icon: Lightbulb, title: 'Build My Idea', desc: 'AI-powered suggestions', path: '/build', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
              { icon: Tag, title: 'Offers & Deals', desc: 'Save on packages', path: '/offers', color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600' },
            ].map(tool => (
              <Link key={tool.title} to={tool.path} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center shrink-0`}>
                  <tool.icon size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{tool.title}</h4>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{tool.desc}</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Combo Packages */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Combo Packages</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Save more with our bundled service packages</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comboPackages.map(pkg => (
              <div key={pkg.name} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">{pkg.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{pkg.name}</h3>
                <ul className="space-y-1 mb-4">
                  {pkg.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <CheckCircle size={12} className="text-green-500 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>₹{pkg.price.toLocaleString()}</span>
                    <span className="text-xs text-green-600 font-medium">Save ₹{pkg.save.toLocaleString()}</span>
                  </div>
                  <Link to="/build" className="mt-3 block text-center py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity">
                    Customize & Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 gradient-bg-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>How It Works</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>From idea to delivery in 4 simple steps</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <span className="text-4xl font-bold text-brand-100 dark:text-brand-900/40">{item.step}</span>
                <h3 className="font-semibold text-lg mt-2 mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                {i < 3 && <ChevronRight size={20} className="absolute -right-3 top-1/2 -translate-y-1/2 text-brand-300 hidden lg:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Customer Reviews</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Real feedback from verified customers</p>
          </div>
          
          {approvedReviews.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <Star size={40} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>No reviews yet</h3>
              <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                Be the first verified customer to review our services. Complete a booking to leave a review.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="text-center">
                  <p className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{avgRating.toFixed(1)}</p>
                  <div className="flex items-center gap-0.5 my-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={16} className={s <= Math.round(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{approvedReviews.length} verified reviews</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvedReviews.slice(0, 6).map(review => (
                  <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{review.userName.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{review.userName}</p>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={10} className={s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                          ))}
                          {review.isVerified && <span className="text-[9px] text-green-600 font-medium ml-1">✓ Verified</span>}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-brand-600 dark:text-brand-400 mb-2">{review.serviceName}</p>
                    <p className="text-sm line-clamp-3" style={{ color: 'var(--text-secondary)' }}>{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Why Choose Us?</h2>
              <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>We combine creativity with technology to deliver exceptional digital solutions.</p>
              <div className="space-y-4">
                {[
                  { icon: Target, title: 'Result-Oriented', desc: 'Every project is designed to achieve your business goals.' },
                  { icon: Zap, title: 'Fast Delivery', desc: 'We respect deadlines and deliver on time, every time.' },
                  { icon: Shield, title: 'Quality Assured', desc: 'Rigorous testing and review process for every deliverable.' },
                  { icon: MessageCircle, title: '24/7 Support', desc: 'Our team is always available to help you.' },
                  { icon: Layers, title: 'Full-Service', desc: 'From design to development to marketing — all under one roof.' },
                  { icon: TrendingUp, title: 'Scalable Solutions', desc: 'Built to grow with your business needs.' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-brand-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
                <div className="space-y-4">
                  {['Custom Solutions', 'Transparent Pricing', 'Real-Time Updates', 'Post-Delivery Support', 'Revision Included', 'Secure & Reliable'].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                      <CheckCircle size={20} className="text-green-500 shrink-0" />
                      <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl gradient-bg p-8 sm:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Build Your Idea?</h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">Let's turn your vision into reality. Get started today with our premium digital services.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/build" className="px-8 py-3 rounded-xl bg-white text-brand-700 font-semibold hover:shadow-lg transition-all">
                  Build My Idea
                </Link>
                <Link to="/contact" className="px-8 py-3 rounded-xl bg-white/10 text-white border border-white/30 font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
                  <Phone size={18} /> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
