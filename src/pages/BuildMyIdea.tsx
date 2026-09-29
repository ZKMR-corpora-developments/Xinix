import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lightbulb, Sparkles, Globe, Smartphone, Video, Film, Cpu,
  ArrowRight, CheckCircle, Send, Wand2, Bot, User, Loader2,
  Package, DollarSign, Clock, Star, Zap
} from 'lucide-react';
import { useAdminStore } from '../store';

const suggestions = [
  "I want a website for my clothing business with an online store",
  "I need a mobile app for my restaurant with ordering system",
  "I want AI-generated promotional videos for my startup",
  "I need a 3D interactive portfolio website",
  "I want a complete branding package for my new business",
  "I need video editing for my YouTube channel",
];

export default function BuildMyIdea() {
  const { services } = useAdminStore();
  const [idea, setIdea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  interface AnalysisResult {
    suggestedServices: string[];
    estimatedRange: string;
    timeline: string;
    complexity: string;
    recommendations: string[];
    package: string;
  }

  const analyzeIdea = () => {
    if (!idea.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const lowerIdea = idea.toLowerCase();
      const suggested: string[] = [];
      let complexity = 'Medium';
      let range = '₹15,000 - ₹50,000';
      let timeline = '2-4 weeks';
      let pkg = 'Standard Package';
      const recommendations: string[] = [];

      if (lowerIdea.includes('website') || lowerIdea.includes('web') || lowerIdea.includes('store') || lowerIdea.includes('online')) {
        suggested.push('Website Development');
        recommendations.push('Responsive design for all devices');
        recommendations.push('SEO optimization for better visibility');
        if (lowerIdea.includes('3d') || lowerIdea.includes('interactive')) {
          suggested.push('3D Interactive Elements');
          complexity = 'High';
          range = '₹50,000 - ₹150,000';
          timeline = '4-8 weeks';
          pkg = 'Premium 3D Package';
        }
        if (lowerIdea.includes('store') || lowerIdea.includes('shop') || lowerIdea.includes('ecommerce')) {
          suggested.push('E-Commerce Integration');
          recommendations.push('Payment gateway setup');
          recommendations.push('Inventory management system');
          range = '₹35,000 - ₹120,000';
          pkg = 'E-Commerce Package';
        }
      }
      if (lowerIdea.includes('app') || lowerIdea.includes('mobile') || lowerIdea.includes('android') || lowerIdea.includes('ios')) {
        suggested.push('Mobile App Development');
        recommendations.push('Cross-platform development');
        recommendations.push('Push notification system');
        complexity = 'High';
        range = '₹60,000 - ₹250,000';
        timeline = '4-12 weeks';
        pkg = 'Full App Package';
      }
      if (lowerIdea.includes('video') || lowerIdea.includes('ai') || lowerIdea.includes('animation')) {
        suggested.push('AI Video Production');
        recommendations.push('Custom script writing');
        recommendations.push('Professional voiceover');
        range = '₹8,000 - ₹30,000';
        timeline = '1-2 weeks';
        pkg = 'Standard Video Package';
      }
      if (lowerIdea.includes('edit') || lowerIdea.includes('editing')) {
        suggested.push('Professional Video Editing');
        recommendations.push('Color grading');
        recommendations.push('Motion graphics');
        range = '₹3,000 - ₹20,000';
        timeline = '2-7 days';
        pkg = 'Professional Editing Package';
      }
      if (lowerIdea.includes('logo') || lowerIdea.includes('brand') || lowerIdea.includes('design')) {
        suggested.push('Logo & Brand Identity');
        recommendations.push('Brand guidelines document');
        recommendations.push('Social media kit');
        range = '₹5,000 - ₹25,000';
        timeline = '3-10 days';
        pkg = 'Brand Kit Package';
      }
      if (lowerIdea.includes('seo') || lowerIdea.includes('marketing')) {
        suggested.push('SEO & Digital Marketing');
        recommendations.push('Keyword research & strategy');
        recommendations.push('Monthly performance reports');
        range = '₹10,000 - ₹40,000';
        timeline = 'Ongoing';
        pkg = 'Growth Marketing Package';
      }

      if (suggested.length === 0) {
        suggested.push('Website Development', 'Logo & Brand Identity');
        recommendations.push('Custom solution based on your requirements');
        recommendations.push('Consultation with our team');
        range = '₹20,000 - ₹80,000';
        timeline = '3-6 weeks';
        pkg = 'Custom Package';
      }

      recommendations.push('Maintenance plan recommended');
      recommendations.push('Post-delivery support included');

      setResult({ suggestedServices: suggested, estimatedRange: range, timeline, complexity, recommendations, package: pkg });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-4">
          <Sparkles size={14} /> AI-Powered Service Advisor
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Build My Idea</h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Describe your project and our AI assistant will recommend the perfect services, packages, and estimate for you.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8 shadow-lg">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center shrink-0">
            <Bot size={20} className="text-brand-600" />
          </div>
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Tell us about your project</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Be as detailed as possible for better recommendations</p>
          </div>
        </div>
        <textarea
          value={idea}
          onChange={e => setIdea(e.target.value)}
          rows={4}
          placeholder="Example: I want a website for my clothing business with an online store and 3D product previews..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-sm resize-none mb-4"
          style={{ color: 'var(--text-primary)' }}
        />
        <button
          onClick={analyzeIdea}
          disabled={!idea.trim() || isAnalyzing}
          className="w-full sm:w-auto px-8 py-3 rounded-xl gradient-bg text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isAnalyzing ? <><Loader2 size={18} className="animate-spin" /> Analyzing...</> : <><Wand2 size={18} /> Analyze My Idea</>}
        </button>

        {/* Quick Suggestions */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button key={s} onClick={() => setIdea(s)} className="px-3 py-1.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                {s.slice(0, 50)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-brand-200 dark:border-brand-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>AI Recommendations</h2>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Based on your project description</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <DollarSign size={20} className="mx-auto mb-1 text-green-600" />
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Estimated Range</p>
                <p className="font-bold text-green-600">{result.estimatedRange}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <Clock size={20} className="mx-auto mb-1 text-blue-600" />
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Timeline</p>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{result.timeline}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                <Zap size={20} className="mx-auto mb-1 text-amber-600" />
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Complexity</p>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{result.complexity}</p>
              </div>
            </div>
          </div>

          {/* Suggested Services */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Recommended Services</h3>
            <div className="space-y-3">
              {result.suggestedServices.map(s => (
                <div key={s} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <CheckCircle size={18} className="text-green-500 shrink-0" />
                  <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Our Recommendations</h3>
            <div className="space-y-2">
              {result.recommendations.map(r => (
                <div key={r} className="flex items-start gap-2">
                  <Star size={14} className="text-amber-500 mt-0.5 shrink-0" />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              <strong>Disclaimer:</strong> These are AI-generated estimates based on your description. Final pricing may vary after detailed project review. Contact our team for an accurate quote.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link to="/services" className="px-6 py-3 rounded-xl gradient-bg text-white font-semibold flex items-center gap-2 hover:opacity-90">
              <Package size={18} /> Browse Services
            </Link>
            <Link to="/contact" className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-semibold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800" style={{ color: 'var(--text-primary)' }}>
              Talk to Support
            </Link>
            <Link to="/calculator" className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 font-semibold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800" style={{ color: 'var(--text-primary)' }}>
              <DollarSign size={18} /> Price Calculator
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
