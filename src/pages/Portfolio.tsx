import { useState } from 'react';
import { Image, Eye } from 'lucide-react';
import { useAdminStore } from '../store';
import { PortfolioCard } from '../components/Cards';

export default function PortfolioPage() {
  const { portfolio } = useAdminStore();
  const [category, setCategory] = useState('all');
  const published = portfolio.filter(p => p.isPublished);
  const categories = ['all', ...new Set(published.map(p => p.category))];
  const filtered = category === 'all' ? published : published.filter(p => p.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Our Portfolio</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Explore our recent work and projects</p>
      </div>

      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${category === cat ? 'gradient-bg text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`} style={{ color: category === cat ? undefined : 'var(--text-secondary)' }}>
            {cat === 'all' ? 'All' : cat.replace('-', ' ')}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => <PortfolioCard key={item.id} item={item} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <Image size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No portfolio items published yet</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Check back soon for our latest work.</p>
        </div>
      )}
    </div>
  );
}
