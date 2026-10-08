import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============ 3D WEBSITE - Real 3D Interactive Scene ============
export function Preview3D() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMouseX((e.clientX - r.left) / r.width - 0.5);
    setMouseY((e.clientY - r.top) / r.height - 0.5);
  };

  const products = [
    { name: 'Premium Chair', color: 'from-amber-400 to-orange-600', price: '₹12,999' },
    { name: 'Designer Lamp', color: 'from-cyan-400 to-blue-600', price: '₹4,999' },
    { name: 'Smart Speaker', color: 'from-purple-400 to-pink-600', price: '₹8,999' },
  ];

  return (
    <div ref={ref} onMouseMove={handleMove} className="w-full h-full relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 cursor-crosshair select-none">
      {/* Stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="absolute w-0.5 h-0.5 bg-white rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%`, opacity: Math.random() * 0.8 + 0.2 }} />
      ))}

      {/* 3D Floor Grid */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ perspective: '600px' }}>
        <div className="w-full h-full origin-bottom" style={{ transform: 'rotateX(60deg)', transformStyle: 'preserve-3d' }}>
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: `translateX(${mouseX * 20}px)`,
          }} />
        </div>
      </div>

      {/* 3D Rotating Product */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: mouseX * 40 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {/* Product - 3D Box */}
          <div className="relative w-28 h-28" style={{ transformStyle: 'preserve-3d', transform: `translateY(${mouseY * -20}px)` }}>
            {/* Front */}
            <div className={`absolute inset-0 bg-gradient-to-br ${products[activeProduct].color} rounded-lg shadow-2xl flex items-center justify-center`} style={{ transform: 'translateZ(40px)' }}>
              <div className="text-white text-center">
                <div className="text-2xl mb-1">{['🪑', '💡', '🔊'][activeProduct]}</div>
                <div className="text-[8px] font-bold">{products[activeProduct].name}</div>
              </div>
            </div>
            {/* Back */}
            <div className={`absolute inset-0 bg-gradient-to-br ${products[activeProduct].color} rounded-lg opacity-70`} style={{ transform: 'translateZ(-40px) rotateY(180deg)' }} />
            {/* Right */}
            <div className={`absolute inset-0 bg-gradient-to-b ${products[activeProduct].color} rounded-lg opacity-80`} style={{ transform: 'rotateY(90deg) translateZ(40px)', filter: 'brightness(0.8)' }} />
            {/* Left */}
            <div className={`absolute inset-0 bg-gradient-to-b ${products[activeProduct].color} rounded-lg opacity-80`} style={{ transform: 'rotateY(-90deg) translateZ(40px)', filter: 'brightness(0.6)' }} />
            {/* Top */}
            <div className={`absolute inset-0 bg-gradient-to-r ${products[activeProduct].color} rounded-lg`} style={{ transform: 'rotateX(90deg) translateZ(40px)', filter: 'brightness(1.2)' }} />
            {/* Bottom */}
            <div className="absolute inset-0 bg-black/50 rounded-lg" style={{ transform: 'rotateX(-90deg) translateZ(40px)' }} />
          </div>

          {/* Shadow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-4 bg-indigo-500/20 rounded-full blur-md" />
        </motion.div>
      </div>

      {/* Product Selector */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((p, i) => (
          <button key={i} onClick={() => setActiveProduct(i)} className={`px-2 py-1 rounded-lg text-[9px] font-medium transition-all ${activeProduct === i ? 'bg-white text-slate-900' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
            {p.name}
          </button>
        ))}
      </div>

      {/* Price Tag */}
      <motion.div
        className="absolute top-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5"
        animate={{ y: mouseY * -5 }}
      >
        <p className="text-[9px] text-white/60">Starting from</p>
        <p className="text-sm font-bold text-white">{products[activeProduct].price}</p>
      </motion.div>

      {/* UI Overlay */}
      <div className="absolute top-3 left-3">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center"><span className="text-[8px]">3D</span></div>
          <span className="text-[10px] text-white/80 font-medium">Interactive 3D Viewer</span>
        </div>
        <p className="text-[8px] text-white/50">Move mouse to rotate • Click products below</p>
      </div>
    </div>
  );
}

// ============ 2D ANIMATED WEBSITE - Real Landing Page ============
export function Preview2D() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setScrollY(s => (s + 0.5) % 200), 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="w-full h-full relative overflow-hidden bg-white dark:bg-slate-900">
      {/* Browser Chrome */}
      <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 flex items-center gap-1.5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white dark:bg-gray-700 rounded px-2 py-0.5 text-[8px] text-gray-400">creativestudio.com</div>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100%-20px)] overflow-hidden relative">
        <div style={{ transform: `translateY(${-scrollY * 0.3}px)` }}>
          {/* Nav */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-400 to-pink-500" />
              <span className="text-[9px] font-bold text-gray-800 dark:text-white">Studio</span>
            </div>
            <div className="flex gap-2">
              {['Work', 'About', 'Contact'].map(l => (
                <span key={l} className="text-[7px] text-gray-500">{l}</span>
              ))}
            </div>
          </div>

          {/* Hero with SVG illustration */}
          <div className="px-3 py-3">
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <h1 className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">We Create<br /><span className="text-orange-500">Beautiful</span> Things</h1>
              <p className="text-[7px] text-gray-500 mt-1">Award-winning design studio</p>
              <div className="flex gap-1 mt-2">
                <div className="px-2 py-0.5 bg-orange-500 rounded text-[7px] text-white font-medium">Our Work</div>
                <div className="px-2 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-[7px] text-gray-600 dark:text-gray-300">Contact</div>
              </div>
            </motion.div>
          </div>

          {/* Animated SVG Illustration */}
          <div className="px-3 relative h-20">
            <svg viewBox="0 0 200 80" className="w-full h-full">
              {/* Hills */}
              <motion.path d="M0 60 Q50 30 100 50 Q150 70 200 40 L200 80 L0 80 Z" fill="#fed7aa" animate={{ d: ['M0 60 Q50 30 100 50 Q150 70 200 40 L200 80 L0 80 Z', 'M0 55 Q50 35 100 45 Q150 65 200 45 L200 80 L0 80 Z', 'M0 60 Q50 30 100 50 Q150 70 200 40 L200 80 L0 80 Z'] }} transition={{ duration: 4, repeat: Infinity }} />
              {/* Sun */}
              <motion.circle cx="160" cy="20" r="10" fill="#fb923c" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              {/* Clouds */}
              <motion.g animate={{ x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }}>
                <ellipse cx="40" cy="15" rx="12" ry="5" fill="#e5e7eb" opacity="0.7" />
                <ellipse cx="48" cy="13" rx="8" ry="4" fill="#e5e7eb" opacity="0.5" />
              </motion.g>
              {/* House */}
              <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <rect x="80" y="40" width="20" height="15" fill="#fbbf24" />
                <polygon points="78,40 90,30 102,40" fill="#ef4444" />
                <rect x="87" y="47" width="6" height="8" fill="#92400e" />
              </motion.g>
              {/* Tree */}
              <motion.g animate={{ rotate: [-2, 2, -2] }} style={{ transformOrigin: '140px 55px' }} transition={{ duration: 3, repeat: Infinity }}>
                <rect x="138" y="45" width="4" height="10" fill="#92400e" />
                <circle cx="140" cy="40" r="8" fill="#22c55e" />
              </motion.g>
              {/* Birds */}
              <motion.g animate={{ x: [0, 30, 0], y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
                <path d="M20 25 Q22 22 24 25" stroke="#374151" strokeWidth="1" fill="none" />
                <path d="M28 22 Q30 19 32 22" stroke="#374151" strokeWidth="1" fill="none" />
              </motion.g>
            </svg>
          </div>

          {/* Feature Cards */}
          <div className="px-3 grid grid-cols-3 gap-1.5 mt-2">
            {[
              { icon: '🎨', title: 'Design', color: 'bg-pink-50 dark:bg-pink-900/20' },
              { icon: '💻', title: 'Develop', color: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: '🚀', title: 'Launch', color: 'bg-green-50 dark:bg-green-900/20' },
            ].map((f, i) => (
              <motion.div key={i} className={`${f.color} rounded-lg p-2 text-center`} whileHover={{ y: -2 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
                <div className="text-sm">{f.icon}</div>
                <div className="text-[7px] font-medium text-gray-700 dark:text-gray-200 mt-0.5">{f.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ MOTION WEBSITE - Real Motion-Driven Site ============
export function PreviewMotion() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPhase(p => (p + 1) % 4), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {/* Phase 0: Text Reveal */}
        {phase === 0 && (
          <motion.div key="p0" className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900 to-indigo-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="text-center px-4">
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                <h1 className="text-xl font-black text-white">MOTION</h1>
              </motion.div>
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">DESIGN</h1>
              </motion.div>
              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.8, delay: 0.5 }} className="h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400 mt-2 mx-auto" />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-[9px] text-white/60 mt-2">Scroll-triggered animations</motion.p>
            </div>
          </motion.div>
        )}

        {/* Phase 1: Parallax Cards */}
        {phase === 1 && (
          <motion.div key="p1" className="absolute inset-0 bg-gradient-to-b from-slate-900 to-purple-900 flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="w-full px-3">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 mb-2"
                  initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${['from-pink-400 to-rose-500', 'from-cyan-400 to-blue-500', 'from-amber-400 to-orange-500'][i]} flex items-center justify-center`}>
                      <span className="text-white text-sm">{['✨', '🎬', '🚀'][i]}</span>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-white">{['Smooth Transitions', 'Parallax Effects', 'Micro-interactions'][i]}</div>
                      <div className="text-[7px] text-white/50">{['Seamless page flows', 'Depth & dimension', 'Delightful details'][i]}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase 2: Video-like Scene */}
        {phase === 2 && (
          <motion.div key="p2" className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-pink-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Animated shapes */}
            <motion.div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-yellow-400/30" animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity }} />
            <motion.div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-pink-400/30" animate={{ scale: [1.5, 1, 1.5], rotate: [360, 180, 0] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
              <div className="w-32 h-32 border-2 border-white/20 rounded-full" />
              <div className="absolute inset-2 border border-white/10 rounded-full" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[5px] border-y-transparent ml-1" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Phase 3: Scrolling Text */}
        {phase === 3 && (
          <motion.div key="p3" className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-teal-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute top-1/4 left-0 right-0" animate={{ x: ['100%', '-100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
              <span className="text-3xl font-black text-white/10 whitespace-nowrap">MOTION • DESIGN • CREATE • INSPIRE •</span>
            </motion.div>
            <motion.div className="absolute top-1/2 left-0 right-0" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>
              <span className="text-2xl font-black text-white/10 whitespace-nowrap">ANIMATE • BUILD • DREAM • LAUNCH •</span>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <div className="text-center">
                  <div className="text-2xl font-black text-white">100+</div>
                  <div className="text-[9px] text-white/60">Animations Delivered</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${phase === i ? 'bg-white w-4' : 'bg-white/30'}`} />
        ))}
      </div>
    </div>
  );
}

// ============ CURSOR INTERACTIVE - Real Interactive Site ============
export function PreviewCursor() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const [clicks, setClicks] = useState<{ x: number; y: number; id: number }[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setClicks(prev => [...prev.slice(-5), { x: e.clientX - r.left, y: e.clientY - r.top, id: Date.now() }]);
  };

  const eyeX = (pos.x - 0.5) * 6;
  const eyeY = (pos.y - 0.5) * 6;

  return (
    <div ref={ref} onMouseMove={handleMove} onClick={handleClick} className="w-full h-full relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 cursor-none select-none">
      {/* Cursor Glow */}
      <div className="absolute w-40 h-40 rounded-full pointer-events-none" style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%`, transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)' }} />

      {/* Custom Cursor */}
      <div className="absolute w-4 h-4 rounded-full border-2 border-white pointer-events-none mix-blend-difference" style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%`, transform: 'translate(-50%, -50%)' }} />

      {/* Main Character - Face that follows cursor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="relative" animate={{ x: (pos.x - 0.5) * 15, y: (pos.y - 0.5) * 15 }} transition={{ type: 'spring', stiffness: 150 }}>
          {/* Face */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 relative shadow-2xl shadow-purple-500/30">
            {/* Eyes */}
            <div className="absolute top-7 left-4 w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <motion.div className="w-2.5 h-2.5 bg-slate-900 rounded-full relative" animate={{ x: eyeX, y: eyeY }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
              </motion.div>
            </div>
            <div className="absolute top-7 right-4 w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <motion.div className="w-2.5 h-2.5 bg-slate-900 rounded-full relative" animate={{ x: eyeX, y: eyeY }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
              </motion.div>
            </div>
            {/* Mouth - smiles when cursor is near */}
            <motion.div className="absolute bottom-5 left-1/2 -translate-x-1/2 h-2 bg-white rounded-full" animate={{ width: Math.abs(pos.x - 0.5) < 0.2 && Math.abs(pos.y - 0.5) < 0.2 ? 20 : 12 }} />
          </div>
        </motion.div>
      </div>

      {/* Floating Interactive Elements */}
      {['React', 'Three.js', 'GSAP', 'Framer', 'Canvas', 'WebGL'].map((tech, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const r = 80;
        return (
          <motion.div
            key={tech}
            className="absolute px-2 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-[8px] text-white font-medium cursor-pointer hover:bg-white/20 hover:scale-110 transition-colors"
            style={{ left: `${50 + Math.cos(angle) * 35}%`, top: `${50 + Math.sin(angle) * 35}%`, transform: 'translate(-50%, -50%)' }}
            animate={{ x: (pos.x - 0.5) * (15 + i * 5), y: (pos.y - 0.5) * (15 + i * 5) }}
            transition={{ type: 'spring', stiffness: 50 + i * 10 }}
          >
            {tech}
          </motion.div>
        );
      })}

      {/* Click Ripples */}
      {clicks.map(click => (
        <motion.div
          key={click.id}
          className="absolute w-4 h-4 border-2 border-white/50 rounded-full pointer-events-none"
          style={{ left: click.x, top: click.y, transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => setClicks(prev => prev.filter(c => c.id !== click.id))}
        />
      ))}

      {/* Info */}
      <div className="absolute bottom-2 left-2 text-[8px] text-white/50">Move cursor • Click anywhere</div>
    </div>
  );
}

// ============ HYPER-REALISTIC - Real Product Viewer ============
export function PreviewHyperRealistic() {
  const [rotateY, setRotateY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => setRotateY(r => (r + 0.5) % 360), 30);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setAutoRotate(false);
    const r = ref.current.getBoundingClientRect();
    setRotateY(((e.clientX - r.left) / r.width) * 360);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={() => setAutoRotate(true)} className="w-full h-full relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 cursor-grab select-none">
      {/* Studio Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-radial from-white/40 to-transparent rounded-full blur-xl" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-300/50 to-transparent dark:from-gray-700/50" />

      {/* 3D Product - Sneaker */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
        <div style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotateY}deg)` }}>
          <div className="relative w-36 h-20">
            {/* Shoe body */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-[20px] shadow-2xl" style={{ transform: 'translateZ(12px)' }}>
              <div className="absolute inset-1 bg-gradient-to-br from-red-400 to-red-700 rounded-[18px]">
                {/* Swoosh */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
                  <path d="M20 40 Q50 20 80 35 Q60 30 20 40" fill="white" opacity="0.9" />
                </svg>
                {/* Laces area */}
                <div className="absolute top-2 left-6 right-6 flex justify-between">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-3 bg-white/60 rounded-full" />)}
                </div>
              </div>
            </div>
            {/* Sole */}
            <div className="absolute bottom-0 left-1 right-1 h-4 bg-white rounded-b-[15px] shadow-lg" style={{ transform: 'translateZ(12px)' }}>
              <div className="absolute inset-x-2 top-1 h-0.5 bg-gray-200 rounded" />
            </div>
            {/* Side */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-700 to-red-900 rounded-[20px]" style={{ transform: 'rotateY(90deg) translateZ(25px)', filter: 'brightness(0.7)' }} />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="absolute top-3 left-3">
        <p className="text-[8px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Limited Edition</p>
        <p className="text-xs font-bold text-gray-900 dark:text-white">Air Max Pro</p>
        <p className="text-sm font-bold text-red-600">₹14,999</p>
      </div>

      {/* Color Options */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {['bg-red-500', 'bg-blue-500', 'bg-black', 'bg-white'].map((c, i) => (
          <div key={i} className={`w-4 h-4 rounded-full ${c} border-2 ${i === 0 ? 'border-gray-900 dark:border-white' : 'border-gray-300'} cursor-pointer`} />
        ))}
      </div>

      <div className="absolute bottom-3 right-3 text-[7px] text-gray-400">Drag to rotate</div>
    </div>
  );
}

// ============ NORMAL WEBSITE - Real Business Site ============
export function PreviewWebsite() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white dark:bg-slate-900">
      {/* Browser */}
      <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 flex items-center gap-1.5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-yellow-400" /><div className="w-2 h-2 rounded-full bg-green-400" /></div>
        <div className="flex-1 bg-white dark:bg-gray-700 rounded px-2 py-0.5 text-[8px] text-gray-400 flex items-center gap-1">🔒 yourbusiness.com</div>
      </div>

      <div className="h-[calc(100%-20px)] overflow-hidden">
        {/* Nav */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center"><span className="text-[6px] text-white font-bold">B</span></div>
            <span className="text-[9px] font-bold text-gray-800 dark:text-white">BizPro</span>
          </div>
          <div className="flex gap-2">
            {['Home', 'Services', 'About', 'Contact'].map(l => (
              <span key={l} className="text-[7px] text-gray-600 dark:text-gray-300 hover:text-blue-600 cursor-pointer">{l}</span>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-4">
          <h2 className="text-[11px] font-bold text-white leading-tight">Grow Your Business<br />With Us</h2>
          <p className="text-[7px] text-blue-100 mt-1">Professional solutions for modern businesses</p>
          <div className="flex gap-1.5 mt-2">
            <div className="px-2 py-0.5 bg-white text-blue-700 rounded text-[7px] font-medium">Get Started</div>
            <div className="px-2 py-0.5 border border-white/50 text-white rounded text-[7px]">Learn More</div>
          </div>
        </div>

        {/* Features */}
        <div className="px-3 py-3">
          <div className="text-[8px] font-bold text-gray-800 dark:text-white mb-2 text-center">Our Services</div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { icon: '📊', title: 'Analytics', desc: 'Data insights' },
              { icon: '🎯', title: 'Marketing', desc: 'Grow reach' },
              { icon: '💡', title: 'Strategy', desc: 'Plan ahead' },
            ].map((f, i) => (
              <div key={i} className="text-center p-1.5 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="text-sm">{f.icon}</div>
                <div className="text-[7px] font-semibold text-gray-800 dark:text-white">{f.title}</div>
                <div className="text-[6px] text-gray-500">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="px-3 flex justify-around py-2 bg-gray-50 dark:bg-gray-800/50">
          {[{ n: '500+', l: 'Clients' }, { n: '98%', l: 'Satisfaction' }, { n: '24/7', l: 'Support' }].map(s => (
            <div key={s.l} className="text-center">
              <div className="text-[10px] font-bold text-blue-600">{s.n}</div>
              <div className="text-[6px] text-gray-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ E-COMMERCE WEBSITE ============
export function PreviewEcommerce() {
  const [cart, setCart] = useState(0);

  return (
    <div className="w-full h-full relative overflow-hidden bg-white dark:bg-slate-900">
      <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 flex items-center gap-1.5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-yellow-400" /><div className="w-2 h-2 rounded-full bg-green-400" /></div>
        <div className="flex-1 bg-white dark:bg-gray-700 rounded px-2 py-0.5 text-[8px] text-gray-400">🛍️ fashionstore.com</div>
      </div>

      <div className="h-[calc(100%-20px)] overflow-hidden">
        {/* Nav with cart */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-[9px] font-bold text-gray-800 dark:text-white">FashionHub</span>
          <div className="flex items-center gap-2">
            <span className="text-[7px] text-gray-500">Search...</span>
            <div className="relative">
              <span className="text-[9px]">🛒</span>
              {cart > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 text-white text-[5px] rounded-full flex items-center justify-center">{cart}</span>}
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="mx-2 mt-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg p-2">
          <p className="text-[7px] text-white/80">Summer Sale</p>
          <p className="text-[10px] font-bold text-white">Up to 50% Off</p>
        </div>

        {/* Products */}
        <div className="px-2 mt-2 grid grid-cols-2 gap-1.5">
          {[
            { name: 'Casual Tee', price: '₹799', old: '₹1,299', color: 'bg-blue-100 dark:bg-blue-900/30', emoji: '👕' },
            { name: 'Denim Jeans', price: '₹1,499', old: '₹2,499', color: 'bg-indigo-100 dark:bg-indigo-900/30', emoji: '👖' },
            { name: 'Sneakers', price: '₹2,999', old: '₹4,999', color: 'bg-gray-100 dark:bg-gray-800', emoji: '👟' },
            { name: 'Backpack', price: '₹999', old: '₹1,799', color: 'bg-amber-100 dark:bg-amber-900/30', emoji: '🎒' },
          ].map((p, i) => (
            <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className={`${p.color} h-12 flex items-center justify-center text-lg`}>{p.emoji}</div>
              <div className="p-1.5">
                <p className="text-[7px] font-medium text-gray-800 dark:text-white truncate">{p.name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] font-bold text-gray-900 dark:text-white">{p.price}</span>
                  <span className="text-[6px] line-through text-gray-400">{p.old}</span>
                </div>
                <button onClick={() => setCart(c => c + 1)} className="mt-1 w-full py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded text-[6px] font-medium">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ APP PREVIEW - Real Mobile App ============
export function PreviewApp() {
  const [tab, setTab] = useState(0);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center p-2">
      {/* Phone */}
      <div className="w-32 h-56 bg-black rounded-[20px] p-1 shadow-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-black rounded-b-lg z-10" />
        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[17px] overflow-hidden">
          {/* Status */}
          <div className="bg-gradient-to-r from-brand-500 to-purple-600 px-2 py-0.5 flex justify-between">
            <span className="text-[5px] text-white">9:41</span>
            <span className="text-[5px] text-white">📶 🔋</span>
          </div>

          {/* App Header */}
          <div className="bg-gradient-to-r from-brand-500 to-purple-600 px-2 pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-white/20" />
              <div>
                <p className="text-[6px] text-white/70">Welcome back</p>
                <p className="text-[8px] text-white font-bold">John Doe</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-2 space-y-1.5">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-brand-500 to-purple-600 rounded-lg p-2 text-white">
              <p className="text-[5px] opacity-70">Total Balance</p>
              <p className="text-[11px] font-bold">₹45,230</p>
              <div className="flex gap-1 mt-1">
                <div className="px-1.5 py-0.5 bg-white/20 rounded text-[5px]">Send</div>
                <div className="px-1.5 py-0.5 bg-white/20 rounded text-[5px]">Receive</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-1">
              {['💸', '📊', '🎯', '⚙️'].map((icon, i) => (
                <div key={i} className="text-center p-1 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="text-[8px]">{icon}</div>
                  <div className="text-[4px] text-gray-500">{['Pay', 'Stats', 'Goals', 'More'][i]}</div>
                </div>
              ))}
            </div>

            {/* Transactions */}
            <p className="text-[7px] font-bold text-gray-800 dark:text-white">Recent</p>
            {[
              { name: 'Netflix', amount: '-₹649', icon: '🎬' },
              { name: 'Salary', amount: '+₹45,000', icon: '💰' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 p-1 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-[6px]">{t.icon}</div>
                <div className="flex-1">
                  <p className="text-[6px] font-medium text-gray-800 dark:text-white">{t.name}</p>
                </div>
                <span className={`text-[6px] font-bold ${t.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{t.amount}</span>
              </div>
            ))}
          </div>

          {/* Bottom Nav */}
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-around py-1">
            {['🏠', '💳', '📈', '👤'].map((icon, i) => (
              <button key={i} onClick={() => setTab(i)} className={`text-[9px] ${tab === i ? 'opacity-100' : 'opacity-40'}`}>{icon}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ EDITING PREVIEW - Real Video Editor ============
export function PreviewEditing() {
  const [playhead, setPlayhead] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPlayhead(p => (p + 0.5) % 100), 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-900 flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 px-2 py-1 flex items-center gap-2 border-b border-gray-700">
        <div className="flex gap-1">
          {['✂️', '🎨', '🔊', '📝', '✨'].map((icon, i) => (
            <div key={i} className="w-4 h-4 bg-gray-700 rounded flex items-center justify-center text-[7px] hover:bg-gray-600 cursor-pointer">{icon}</div>
          ))}
        </div>
        <div className="flex-1" />
        <div className="text-[7px] text-gray-400">00:{String(Math.floor(playhead / 5)).padStart(2, '0')}:00</div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden">
        <motion.div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500" animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity }} />
        {/* Effects overlay */}
        <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity }} />
        {/* Text overlay */}
        <motion.div className="absolute bottom-4 left-4 right-4" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="bg-black/50 backdrop-blur rounded px-2 py-1">
            <div className="w-full h-1 bg-white/80 rounded" />
            <div className="w-2/3 h-1 bg-white/50 rounded mt-0.5" />
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-800 border-t border-gray-700">
        {/* Time ruler */}
        <div className="h-3 bg-gray-750 border-b border-gray-700 flex items-center px-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="w-px h-1.5 bg-gray-600 mx-auto" />
              <span className="text-[5px] text-gray-500">{i * 5}s</span>
            </div>
          ))}
        </div>
        {/* Tracks */}
        <div className="p-1 space-y-0.5">
          {/* Video track */}
          <div className="flex gap-0.5 h-4">
            <div className="w-1/4 bg-purple-600/80 rounded-sm" />
            <div className="w-1/3 bg-blue-600/80 rounded-sm" />
            <div className="w-1/5 bg-pink-600/80 rounded-sm" />
            <div className="flex-1 bg-indigo-600/80 rounded-sm" />
          </div>
          {/* Audio track */}
          <div className="flex gap-0.5 h-3">
            <div className="flex-1 bg-green-600/60 rounded-sm flex items-center px-0.5 gap-px">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="flex-1 h-full bg-green-400/50 rounded-sm" style={{ height: `${20 + Math.random() * 80}%` }} />
              ))}
            </div>
          </div>
        </div>
        {/* Playhead */}
        <div className="absolute left-0 right-0 pointer-events-none" style={{ left: `${playhead}%` }}>
          <div className="w-px h-full bg-red-500 relative">
            <div className="absolute -top-0.5 -left-1 w-2 h-2 bg-red-500 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ AI VIDEO PREVIEW ============
export function PreviewAIVideo() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      {/* AI Neural Network Background */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={`${10 + Math.random() * 80}%`}
            cy={`${10 + Math.random() * 80}%`}
            r="2"
            fill="#818cf8"
            animate={{ opacity: [0.3, 1, 0.3], r: [2, 4, 2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.line
            key={`l-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="#818cf8"
            strokeWidth="0.5"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>

      {/* AI Character Being Generated */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="relative" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          {/* Face being generated */}
          <div className="w-20 h-24 relative">
            <motion.div className="absolute inset-0 bg-gradient-to-b from-purple-400/50 to-pink-500/50 rounded-full blur-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full" animate={{ borderRadius: ['50%', '45% 55% 50% 50%', '50%'] }} transition={{ duration: 3, repeat: Infinity }} />
            {/* Eyes */}
            <motion.div className="absolute top-8 left-4 w-3 h-3 bg-white rounded-full" animate={{ scale: [1, 0.9, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="absolute top-8 right-4 w-3 h-3 bg-white rounded-full" animate={{ scale: [1, 0.9, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
            {/* Mouth */}
            <motion.div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-white/70 rounded-full" animate={{ width: [20, 12, 20] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>

          {/* Generation particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{ left: '50%', top: '50%' }}
              animate={{
                x: [0, Math.cos(i * 36 * Math.PI / 180) * 50],
                y: [0, Math.sin(i * 36 * Math.PI / 180) * 50],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </div>

      {/* AI Status */}
      <div className="absolute top-2 left-2 flex items-center gap-1">
        <motion.div className="w-1.5 h-1.5 bg-red-500 rounded-full" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        <span className="text-[7px] text-white/70 font-medium">AI GENERATING</span>
      </div>

      {/* Progress */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[7px] text-white/50">Generating scene...</span>
          <span className="text-[7px] text-white/50">67%</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" animate={{ width: ['0%', '100%'] }} transition={{ duration: 5, repeat: Infinity }} />
        </div>
      </div>
    </div>
  );
}

// ============ SIMULATOR PREVIEW ============
export function PreviewSimulator() {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setScreen(s => (s + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-teal-900 to-emerald-900 flex items-center justify-center">
      {/* Phone */}
      <div className="w-28 h-48 bg-black rounded-[16px] p-1 shadow-2xl">
        <div className="w-full h-full bg-gradient-to-b from-teal-400 to-emerald-500 rounded-[13px] overflow-hidden relative">
          {/* Status */}
          <div className="px-1.5 py-0.5 flex justify-between text-[4px] text-white/80">
            <span>12:00</span><span>100%🔋</span>
          </div>

          <AnimatePresence mode="wait">
            {screen === 0 && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-1.5">
                <p className="text-[6px] text-white font-bold">Home</p>
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {['📱', '💬', '📷', '🎵', '⚙️', '📧', '🗺️', '📅'].map((icon, i) => (
                    <motion.div key={i} className="w-4 h-4 bg-white/20 rounded flex items-center justify-center text-[6px]" whileTap={{ scale: 0.8 }}>{icon}</motion.div>
                  ))}
                </div>
                <div className="mt-1.5 bg-white/10 rounded p-1">
                  <div className="w-full h-1 bg-white/30 rounded" />
                  <div className="w-2/3 h-1 bg-white/20 rounded mt-0.5" />
                </div>
              </motion.div>
            )}
            {screen === 1 && (
              <motion.div key="apps" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="p-1.5">
                <p className="text-[6px] text-white font-bold">Apps</p>
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-white/20 rounded" />
                  ))}
                </div>
              </motion.div>
            )}
            {screen === 2 && (
              <motion.div key="settings" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="p-1.5">
                <p className="text-[6px] text-white font-bold">Settings</p>
                {['WiFi', 'Bluetooth', 'Display'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/10 rounded px-1 py-0.5 mt-0.5">
                    <span className="text-[5px] text-white">{item}</span>
                    <div className={`w-3 h-1.5 rounded-full ${i < 2 ? 'bg-green-400' : 'bg-gray-400'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-white ${i < 2 ? 'ml-1.5' : ''}`} />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Home indicator */}
          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ============ ADVANCED WEBSITE ============
export function PreviewAdvanced() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white dark:bg-slate-900">
      <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 flex items-center gap-1.5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-yellow-400" /><div className="w-2 h-2 rounded-full bg-green-400" /></div>
        <div className="flex-1 bg-white dark:bg-gray-700 rounded px-2 py-0.5 text-[8px] text-gray-400">🔒 dashboard.app.com</div>
      </div>
      <div className="h-[calc(100%-20px)] flex">
        {/* Sidebar */}
        <div className="w-12 bg-gray-900 p-1.5 space-y-2">
          <div className="w-3 h-3 rounded bg-brand-500" />
          {['📊', '📁', '👥', '⚙️'].map((i, idx) => (
            <div key={idx} className={`w-6 h-6 rounded ${idx === 0 ? 'bg-white/10' : ''} flex items-center justify-center text-[8px]`}>{i}</div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-2 overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-bold text-gray-800 dark:text-white">Dashboard</span>
            <div className="w-4 h-4 rounded-full bg-brand-100 dark:bg-brand-900" />
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-1 mb-2">
            {[{ l: 'Revenue', v: '₹2.4L', c: 'text-green-600' }, { l: 'Users', v: '1,234', c: 'text-blue-600' }, { l: 'Orders', v: '567', c: 'text-purple-600' }].map(s => (
              <div key={s.l} className="bg-gray-50 dark:bg-gray-800 rounded p-1">
                <p className="text-[5px] text-gray-500">{s.l}</p>
                <p className={`text-[8px] font-bold ${s.c}`}>{s.v}</p>
              </div>
            ))}
          </div>
          {/* Chart */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded p-1.5 h-16">
            <svg viewBox="0 0 100 40" className="w-full h-full">
              <motion.path d="M0 35 L20 25 L40 30 L60 15 L80 20 L100 10" fill="none" stroke="#4f46e5" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.path d="M0 35 L20 25 L40 30 L60 15 L80 20 L100 10 L100 40 L0 40 Z" fill="url(#grad)" opacity="0.3" />
              <defs><linearGradient id="grad"><stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Map of preview components
export const previewComponents: Record<string, React.FC> = {
  '3d': Preview3D,
  'hyper-realistic': PreviewHyperRealistic,
  'cursor-interactive': PreviewCursor,
  'motion': PreviewMotion,
  '2d': Preview2D,
  'normal': PreviewWebsite,
  'advanced': PreviewAdvanced,
  'ecommerce': PreviewEcommerce,
  'apps': PreviewApp,
  'android': PreviewApp,
  'ios': PreviewApp,
  'business': PreviewApp,
  'cross-platform': PreviewApp,
  'ai-videos': PreviewAIVideo,
  'ai-generated': PreviewAIVideo,
  'youtube': PreviewAIVideo,
  'shorts': PreviewAIVideo,
  'promotional': PreviewAIVideo,
  'explainer': PreviewAIVideo,
  'cinematic': PreviewAIVideo,
  'educational': PreviewAIVideo,
  'editing': PreviewEditing,
  'video': PreviewEditing,
  'simulators': PreviewSimulator,
  'concept': PreviewSimulator,
  'default': PreviewWebsite,
};
