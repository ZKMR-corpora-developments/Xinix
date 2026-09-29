import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GitCompare, Plus, X, CheckCircle, XCircle, Star, Clock,
  Zap, Shield, DollarSign, ArrowRight, Minus
} from 'lucide-react';
import { useAdminStore } from '../store';

export default function ComparePage() {
  const { services } = useAdminStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const toggleService = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else if (selected.length < 4) {
      setSelected([...selected, id]);
    }
  };

  const selectedServices = selected.map(id => services.find(s => s.id === id)).filter(Boolean) as typeof services;

  const comparisonRows = [
    { label: 'Base Price', key: 'basePrice', format: (v: any) => `₹${Number(v).toLocaleString()}` },
    { label: 'Category', key: 'category', format: (v: any) => String(v).replace('-', ' ') },
    { label: 'Delivery', key: 'deliveryEstimate', format: (v: any) => String(v) },
    { label: 'Revisions', key: 'revisions', format: (v: any) => `${v} included` },
    { label: 'Maintenance', key: 'maintenanceCost', format: (v: any) => v ? `₹${Number(v).toLocaleString()}` : 'N/A' },
    { label: 'Type', key: 'type', format: (v: any) => String(v).charAt(0).toUpperCase() + String(v).slice(1) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Compare Services</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Select 2-4 services to compare side by side</p>
      </div>

      {/* Selection Area */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {selectedServices.map(service => (
          <div key={service.id} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800">
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{service.name}</span>
            <button onClick={() => toggleService(service.id)} className="p-0.5 rounded hover:bg-brand-200 dark:hover:bg-brand-800"><X size={14} className="text-brand-600" /></button>
          </div>
        ))}
        {selected.length < 4 && (
          <button onClick={() => setShowPicker(true)} className="flex items-center gap-1 px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium hover:border-brand-400 transition-colors" style={{ color: 'var(--text-muted)' }}>
            <Plus size={16} /> Add Service
          </button>
        )}
      </div>

      {/* Comparison Table */}
      {selectedServices.length >= 2 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 text-left text-sm font-medium w-40" style={{ color: 'var(--text-muted)' }}>Feature</th>
                  {selectedServices.map(s => (
                    <th key={s.id} className="p-4 text-center min-w-[200px]">
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{s.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.category.replace('-', ' ')}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}>
                    <td className="p-4 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{row.label}</td>
                    {selectedServices.map(s => (
                      <td key={s.id} className="p-4 text-center text-sm" style={{ color: 'var(--text-primary)' }}>
                        {row.format((s as any)[row.key])}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Features */}
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-4 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Features</td>
                  {selectedServices.map(s => (
                    <td key={s.id} className="p-4">
                      <div className="space-y-1">
                        {s.features.map(f => (
                          <div key={f} className="flex items-center gap-1 text-xs justify-center">
                            <CheckCircle size={12} className="text-green-500 shrink-0" />
                            <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Packages */}
                <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                  <td className="p-4 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Packages</td>
                  {selectedServices.map(s => (
                    <td key={s.id} className="p-4">
                      <div className="space-y-2">
                        {s.packages.map(pkg => (
                          <div key={pkg.id} className="text-xs text-center">
                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{pkg.name}</span>
                            <span className="text-brand-600 ml-1">₹{pkg.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                {/* Actions */}
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-4" />
                  {selectedServices.map(s => (
                    <td key={s.id} className="p-4 text-center">
                      <Link to={`/service/${s.id}`} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90">
                        View <ArrowRight size={14} />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <GitCompare size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Select at least 2 services to compare</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Click "Add Service" above to select services for comparison.</p>
        </div>
      )}

      {/* Service Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowPicker(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg max-h-[70vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Select a Service</h3>
              <button onClick={() => setShowPicker(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18} /></button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[50vh] space-y-2">
              {services.filter(s => !selected.includes(s.id)).map(service => (
                <button key={service.id} onClick={() => { toggleService(service.id); if (selected.length >= 3) setShowPicker(false); }} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-left hover:border-brand-400 transition-colors">
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{service.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{service.category.replace('-', ' ')} • ₹{service.basePrice.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
