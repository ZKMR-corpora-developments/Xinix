import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (success) navigate('/dashboard');
      else setError('Invalid credentials. Try any email to create a demo account.');
    } else {
      if (!formData.name || !formData.email || !formData.password) { setError('Please fill all required fields.'); return; }
      const success = register(formData);
      if (success) navigate('/dashboard');
      else setError('An account with this email already exists.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">ZK</span>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{isLogin ? 'Login to access your dashboard' : 'Join us to book services and track projects'}</p>
          </div>

          {error && <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} placeholder="John Doe" />
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Email *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} placeholder="you@example.com" />
              </div>
            </div>
            {!isLogin && (
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} placeholder="+91 9876543210" />
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm" style={{ color: 'var(--text-primary)' }} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl gradient-bg text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              {isLogin ? 'Login' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)'}}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="ml-1 text-brand-600 font-medium hover:underline">
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Demo:</strong> Use <code>admin@zkr.com</code> for admin access, or any email to create a customer account.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
