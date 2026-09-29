import { useState, useMemo } from 'react';
import { Search, Package, Filter } from 'lucide-react';
import { useAdminStore } from '../store';
import { ProductCard } from '../components/Cards';

export default function ProductsPage() {
  const { products } = useAdminStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    return result;
  }, [products, category, search]);

  const productCategories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Products & Materials</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Templates, design assets, and digital products</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" style={{ color: 'var(--text-primary)' }} />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm" style={{ color: 'var(--text-primary)' }}>
          {productCategories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c.replace('-', ' ')}</option>)}
        </select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No products found</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
