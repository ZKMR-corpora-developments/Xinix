import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// ============ 3D PREVIEW - Rotating Building/Robot Scene ============
export function Preview3D() {
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(-15);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotateY(prev => (prev + 0.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 40);
    setRotateX(-y * 20 - 10);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full relative overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 cursor-grab"
      style={{ perspective: '1200px' }}
    >
      {/* Sky with clouds */}
      <div className="absolute top-4 left-8 w-16 h-6 bg-white/60 rounded-full blur-sm animate-pulse" />
      <div className="absolute top-8 right-12 w-20 h-7 bg-white/50 rounded-full blur-sm" style={{ animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute top-12 left-1/3 w-12 h-5 bg-white/40 rounded-full blur-sm" style={{ animation: 'float 6s ease-in-out infinite 1s' }} />

      {/* Sun */}
      <div className="absolute top-4 right-6 w-10 h-10 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/50" />

      {/* 3D Scene */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Ground */}
        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-green-300 to-green-500 dark:from-green-900 dark:to-green-800 rounded-lg"
          style={{
            transform: 'rotateX(90deg) translateZ(-60px)',
            boxShadow: '0 0 40px rgba(0,100,0,0.2)'
          }}
        />

        {/* Main Building */}
        <div style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
          {/* Front face */}
          <div className="absolute w-24 h-32 bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 rounded-t-sm" style={{ transform: 'translateX(-48px) translateY(-80px) translateZ(20px)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)' }}>
            <div className="grid grid-cols-3 gap-1 p-2 pt-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-yellow-200/80 rounded-sm" style={{ animation: `pulse 2s ease-in-out infinite ${i * 0.2}s` }} />
              ))}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-10 bg-amber-800 rounded-t-sm" />
          </div>
          {/* Right face */}
          <div className="absolute w-20 h-32 bg-gradient-to-b from-blue-500 to-blue-700 dark:from-blue-800 dark:to-blue-950" style={{ transform: 'translateX(-8px) translateY(-80px) rotateY(90deg) translateZ(20px)' }}>
            <div className="grid grid-cols-2 gap-1 p-2 pt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-yellow-100/60 rounded-sm" />
              ))}
            </div>
          </div>
          {/* Roof */}
          <div className="absolute w-28 h-24 bg-gradient-to-b from-red-500 to-red-700" style={{ transform: 'translateX(-52px) translateY(-104px) translateZ(20px) rotateX(-20deg)', clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
        </div>

        {/* Robot */}
        <div style={{ transformStyle: 'preserve-3d', transform: 'translateX(60px) translateZ(30px)' }}>
          {/* Body */}
          <div className="absolute w-12 h-16 bg-gradient-to-b from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-800 rounded-lg" style={{ transform: 'translateY(-40px)' }}>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 bg-green-400 rounded-full" style={{ animation: 'pulse 1s infinite' }} />
          </div>
          {/* Head */}
          <div className="absolute w-10 h-10 bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-500 dark:to-gray-700 rounded-lg" style={{ transform: 'translateY(-60px) translateX(2px)' }}>
            <div className="flex justify-center gap-1 pt-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="w-4 h-1 bg-cyan-300 rounded mx-auto mt-1" />
          </div>
          {/* Antenna */}
          <div className="absolute w-0.5 h-4 bg-gray-400" style={{ transform: 'translateY(-68px) translateX(6px)' }}>
            <div className="absolute -top-1 -left-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </div>
        </div>

        {/* Tree */}
        <div style={{ transform: 'translateX(-80px) translateZ(10px)' }}>
          <div className="absolute w-3 h-10 bg-amber-800 rounded" style={{ transform: 'translateY(-20px) translateX(8px)' }} />
          <div className="absolute w-16 h-16 bg-green-500 rounded-full" style={{ transform: 'translateY(-50px)', boxShadow: '0 4px 12px rgba(0,80,0,0.3)' }} />
          <div className="absolute w-12 h-12 bg-green-400 rounded-full" style={{ transform: 'translateY(-60px) translateX(4px)' }} />
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        🏢 3D Interactive • Move mouse to rotate
      </div>
    </div>
  );
}

// ============ 2D PREVIEW - Animated Scene ============
export function Preview2D() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-orange-100 via-amber-50 to-yellow-50 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-900">
      {/* Animated Sun */}
      <motion.div
        className="absolute top-6 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ boxShadow: '0 0 40px rgba(255,200,0,0.5)' }}
      />

      {/* Animated Clouds */}
      <motion.div
        className="absolute top-8 left-0"
        animate={{ x: ['-10%', '110%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-20 h-8 bg-white/70 rounded-full" />
        <div className="w-14 h-6 bg-white/60 rounded-full -mt-3 ml-3" />
      </motion.div>
      <motion.div
        className="absolute top-16 left-0"
        animate={{ x: ['-20%', '120%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 5 }}
      >
        <div className="w-16 h-6 bg-white/50 rounded-full" />
      </motion.div>

      {/* Hills */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 400 120" fill="none">
        <path d="M0 80 Q100 20 200 60 Q300 100 400 50 L400 120 L0 120 Z" fill="rgb(34,197,94)" opacity="0.6" />
        <path d="M0 100 Q80 50 180 80 Q280 110 400 70 L400 120 L0 120 Z" fill="rgb(22,163,74)" opacity="0.8" />
      </svg>

      {/* Animated House */}
      <motion.div
        className="absolute bottom-12 left-1/4"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="relative">
          {/* House body */}
          <div className="w-16 h-12 bg-gradient-to-b from-amber-200 to-amber-300 dark:from-amber-700 dark:to-amber-800 rounded-t-sm">
            <div className="absolute top-2 left-2 w-4 h-4 bg-sky-300 rounded-sm" />
            <div className="absolute top-2 right-2 w-4 h-4 bg-sky-300 rounded-sm" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-6 bg-amber-800 rounded-t" />
          </div>
          {/* Roof */}
          <div className="absolute -top-5 left-0 w-0 h-0 border-l-[36px] border-r-[36px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-500" />
          {/* Chimney with smoke */}
          <div className="absolute -top-8 right-2 w-3 h-5 bg-red-700 rounded-t-sm" />
          <motion.div
            className="absolute -top-12 right-2 w-2 h-2 bg-gray-400/60 rounded-full"
            animate={{ y: [-5, -20], opacity: [0.8, 0], scale: [1, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Animated Car */}
      <motion.div
        className="absolute bottom-8"
        animate={{ x: ['-50px', '450px'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div className="relative">
          <div className="w-12 h-5 bg-red-500 rounded-t-lg" />
          <div className="w-16 h-4 bg-red-600 rounded-b-lg -mt-0.5 -ml-2" />
          <div className="absolute -bottom-1 left-0 w-3 h-3 bg-gray-800 rounded-full" />
          <div className="absolute -bottom-1 right-0 w-3 h-3 bg-gray-800 rounded-full" />
        </div>
      </motion.div>

      {/* Flying Birds */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute text-lg"
          style={{ top: `${20 + i * 12}%` }}
          animate={{ x: ['-20px', '420px'], y: [0, -10, 0, 10, 0] }}
          transition={{ duration: 10 + i * 3, repeat: Infinity, ease: 'linear', delay: i * 2 }}
        >
          🐦
        </motion.div>
      ))}

      {/* Animated Tree */}
      <motion.div
        className="absolute bottom-10 right-1/4"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <div className="w-2 h-10 bg-amber-800 mx-auto rounded" />
        <motion.div
          className="w-14 h-14 bg-green-500 rounded-full -mt-4 mx-auto"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Label */}
      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        🎨 2D Animated Scene • Live Elements
      </div>
    </div>
  );
}

// ============ MOTION PREVIEW - Everything Moving ============
export function PreviewMotion() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900">
      {/* Floating Orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            background: `radial-gradient(circle, ${['#f472b6', '#818cf8', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa', '#2dd4bf'][i]}88, transparent)`,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Moving Text Lines */}
      <motion.div
        className="absolute top-8 left-0 right-0 flex gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        {['DESIGN', '•', 'CREATE', '•', 'ANIMATE', '•', 'INSPIRE', '•', 'DESIGN', '•', 'CREATE', '•'].map((word, i) => (
          <span key={i} className="text-3xl font-black text-white/20 whitespace-nowrap">{word}</span>
        ))}
      </motion.div>

      {/* Rotating Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-48 h-48 rounded-full border-2 border-white/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-pink-400 rounded-full" />
        </motion.div>
        <motion.div
          className="absolute w-36 h-36 rounded-full border-2 border-white/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
        </motion.div>
        <motion.div
          className="absolute w-24 h-24 rounded-full border-2 border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-yellow-400 rounded-full" />
        </motion.div>
      </div>

      {/* Sliding Cards */}
      <motion.div
        className="absolute bottom-16 left-0 right-0 flex gap-3 px-4"
        animate={{ x: ['100%', '-100%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-24 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
            <span className="text-2xl">{['🎬', '✨', '🎨', '🚀'][i - 1]}</span>
          </div>
        ))}
      </motion.div>

      {/* Pulsing Center Element */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-2xl shadow-purple-500/50">
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ▶
          </motion.span>
        </div>
      </motion.div>

      {/* Particle Trail */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: '50%', top: '50%' }}
          animate={{
            x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
            y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      {/* Label */}
      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        🎬 Motion Design • Everything in Motion
      </div>
    </div>
  );
}

// ============ CURSOR INTERACTIVE - Eyes Follow Mouse ============
export function PreviewCursor() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const eyeOffsetX = (mousePos.x - 0.5) * 8;
  const eyeOffsetY = (mousePos.y - 0.5) * 8;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 cursor-none"
    >
      {/* Custom Cursor Glow */}
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main Face */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Face Circle */}
          <motion.div
            className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center"
            animate={{
              x: (mousePos.x - 0.5) * 10,
              y: (mousePos.y - 0.5) * 10,
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {/* Eyes */}
            <div className="flex gap-6 -mt-2">
              {/* Left Eye */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className="w-5 h-5 bg-slate-900 rounded-full"
                  animate={{ x: eyeOffsetX, y: eyeOffsetY }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div className="w-2 h-2 bg-white rounded-full mt-0.5 ml-0.5" />
                </motion.div>
              </div>
              {/* Right Eye */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className="w-5 h-5 bg-slate-900 rounded-full"
                  animate={{ x: eyeOffsetX, y: eyeOffsetY }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <div className="w-2 h-2 bg-white rounded-full mt-0.5 ml-0.5" />
                </motion.div>
              </div>
            </div>
            {/* Mouth */}
            <motion.div
              className="absolute bottom-8 w-12 h-4 border-b-3 border-white rounded-b-full"
              animate={{ width: 40 + Math.abs(mousePos.x - 0.5) * 30 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Floating Interactive Elements */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 120;
        const baseX = 50 + radius * Math.cos(angle) * 0.3;
        const baseY = 50 + radius * Math.sin(angle) * 0.3;
        return (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20"
            style={{ left: `${baseX}%`, top: `${baseY}%` }}
            animate={{
              x: (mousePos.x - 0.5) * (20 + i * 5),
              y: (mousePos.y - 0.5) * (20 + i * 5),
              rotate: (mousePos.x - 0.5) * 30,
            }}
            transition={{ type: 'spring', stiffness: 50 + i * 10 }}
            whileHover={{ scale: 1.3 }}
          >
            <span className="text-sm">{['✨', '🎯', '💫', '🌟', '⚡', '🎨'][i]}</span>
          </motion.div>
        );
      })}

      {/* Trail Dots */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute w-2 h-2 rounded-full bg-indigo-400/50 pointer-events-none"
          style={{
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
          }}
          animate={{
            x: [0, -10 * (i + 1)],
            y: [0, -5 * (i + 1)],
            opacity: [0.8 - i * 0.15, 0],
            scale: [1 - i * 0.15, 0.3],
          }}
          transition={{ duration: 0.5, delay: i * 0.05, repeat: Infinity }}
        />
      ))}

      {/* Label */}
      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        👆 Cursor Interactive • Move your mouse
      </div>
    </div>
  );
}

// ============ HYPER-REALISTIC PREVIEW ============
export function PreviewHyperRealistic() {
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setRotateY(prev => (prev + 0.3) % 360), 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900" style={{ perspective: '1000px' }}>
      {/* Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full" />

      {/* 3D Product - Sneaker-like shape */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ rotateY }}
          transition={{ duration: 0.03 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Product base */}
          <div className="relative w-32 h-20">
            {/* Main body */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-2xl shadow-2xl" style={{ transform: 'translateZ(15px)' }}>
              <div className="absolute inset-2 bg-gradient-to-br from-red-400 to-red-700 rounded-xl" />
              <div className="absolute bottom-2 left-2 right-2 h-3 bg-white/90 rounded-full" />
            </div>
            {/* Side */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-700 to-red-900 rounded-2xl" style={{ transform: 'rotateY(90deg) translateZ(30px) translateX(-15px)' }} />
            {/* Shadow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-28 h-4 bg-black/30 rounded-full blur-md" />
          </div>
        </motion.div>
      </div>

      {/* Floating specs */}
      {['Premium Material', 'Handcrafted', 'Limited Edition'].map((text, i) => (
        <motion.div
          key={text}
          className="absolute px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-[10px] font-medium"
          style={{ top: `${25 + i * 20}%`, left: i % 2 === 0 ? '10%' : 'auto', right: i % 2 !== 0 ? '10%' : 'auto' }}
          animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        >
          {text}
        </motion.div>
      ))}

      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        💎 Hyper-Realistic 3D • Auto-rotating
      </div>
    </div>
  );
}

// ============ WEBSITE PREVIEW (Normal) ============
export function PreviewWebsite() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Browser Chrome */}
      <div className="bg-gray-200 dark:bg-gray-800 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white dark:bg-gray-700 rounded px-2 py-0.5 text-[10px] text-gray-500 truncate">www.yourbusiness.com</div>
      </div>

      {/* Website Content */}
      <div className="p-3 space-y-2">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-3 bg-brand-500 rounded" />
          <div className="flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="w-8 h-2 bg-gray-300 dark:bg-gray-600 rounded" />)}
          </div>
        </div>
        {/* Hero */}
        <div className="bg-gradient-to-r from-brand-500 to-purple-500 rounded-lg p-3 text-white">
          <div className="w-20 h-2 bg-white/80 rounded mb-1" />
          <div className="w-28 h-1.5 bg-white/60 rounded mb-2" />
          <div className="w-12 h-3 bg-white rounded" />
        </div>
        {/* Cards */}
        <div className="grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded p-1.5 border border-gray-200 dark:border-gray-700">
              <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
              <div className="w-full h-1.5 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        🌐 Professional Website • Responsive
      </div>
    </div>
  );
}

// ============ APP PREVIEW ============
export function PreviewApp() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      {/* Phone Frame */}
      <div className="w-36 h-64 bg-black rounded-[24px] p-1.5 shadow-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-b-lg z-10" />
        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[20px] overflow-hidden">
          {/* Status bar */}
          <div className="bg-brand-500 px-2 py-1 flex justify-between items-center">
            <span className="text-[6px] text-white">9:41</span>
            <div className="flex gap-0.5">
              <div className="w-2 h-1 bg-white/80 rounded-sm" />
              <div className="w-2 h-1 bg-white/80 rounded-sm" />
            </div>
          </div>
          {/* App content */}
          <div className="p-2 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900" />
              <div className="flex-1">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded mt-0.5" />
              </div>
            </div>
            <div className="bg-brand-50 dark:bg-brand-900/30 rounded-lg p-1.5">
              <div className="w-full h-1.5 bg-brand-200 dark:bg-brand-800 rounded" />
              <div className="w-3/4 h-1 bg-brand-100 dark:bg-brand-800/50 rounded mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded p-1">
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-0.5" />
                  <div className="w-2/3 h-1 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              ))}
            </div>
          </div>
          {/* Bottom nav */}
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-2 py-1.5 flex justify-around">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating notifications */}
      <motion.div
        className="absolute top-8 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700"
        animate={{ x: [20, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-green-400" />
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </motion.div>

      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        📱 Mobile App • Native Quality
      </div>
    </div>
  );
}

// ============ EDITING PREVIEW ============
export function PreviewEditing() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-900">
      {/* Timeline */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 p-2">
        <div className="flex gap-0.5 h-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                background: ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b'][i % 5],
                opacity: 0.6 + Math.random() * 0.4,
              }}
              animate={{ scaleY: [1, 0.7, 1] }}
              transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
        {/* Playhead */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500"
          animate={{ left: ['5%', '95%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-red-500 rounded-sm" />
        </motion.div>
      </div>

      {/* Video Preview Area */}
      <div className="absolute top-4 left-4 right-4 bottom-16 bg-black rounded-lg overflow-hidden flex items-center justify-center">
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {/* Effects overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Tools panel */}
      <div className="absolute top-4 right-4 space-y-1">
        {['🎨', '✂️', '🎵', '📝'].map((icon, i) => (
          <motion.div
            key={i}
            className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center text-xs"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-18 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        🎞️ Video Editing • Timeline Active
      </div>
    </div>
  );
}

// ============ SIMULATOR PREVIEW ============
export function PreviewSimulator() {
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = ['home', 'apps', 'settings'];

  useEffect(() => {
    const interval = setInterval(() => setActiveScreen(s => (s + 1) % screens.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-teal-900 to-emerald-900 flex items-center justify-center">
      {/* Phone Simulator */}
      <div className="w-32 h-56 bg-black rounded-[20px] p-1 shadow-2xl">
        <div className="w-full h-full bg-gradient-to-b from-teal-500 to-emerald-600 rounded-[16px] overflow-hidden relative">
          {/* Status bar */}
          <div className="px-2 py-0.5 flex justify-between text-[5px] text-white/80">
            <span>12:00</span>
            <span>100%</span>
          </div>

          {/* Screen content */}
          {activeScreen === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2">
              <div className="text-[8px] text-white font-bold mb-1">Good Morning</div>
              <div className="grid grid-cols-4 gap-1">
                {['📱', '💬', '📷', '🎵', '⚙️', '📧', '🗺️', '📅'].map((icon, i) => (
                  <motion.div
                    key={i}
                    className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center text-[8px]"
                    whileHover={{ scale: 1.2 }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
              <div className="mt-2 bg-white/10 rounded-lg p-1.5">
                <div className="w-full h-1 bg-white/30 rounded" />
                <div className="w-2/3 h-1 bg-white/20 rounded mt-1" />
              </div>
            </motion.div>
          )}

          {activeScreen === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-2">
              <div className="text-[8px] text-white font-bold mb-1">All Apps</div>
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-white/20 rounded-md" />
                ))}
              </div>
            </motion.div>
          )}

          {activeScreen === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-2">
              <div className="text-[8px] text-white font-bold mb-1">Settings</div>
              {['WiFi', 'Bluetooth', 'Display', 'Sound'].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white/10 rounded px-1 py-0.5 mb-0.5">
                  <span className="text-[6px] text-white">{item}</span>
                  <div className={`w-4 h-2 rounded-full ${i < 2 ? 'bg-green-400' : 'bg-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full bg-white ${i < 2 ? 'ml-2' : ''}`} />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white/50 rounded-full" />
        </div>
      </div>

      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        🖥️ OS Simulator • Interactive Demo
      </div>
    </div>
  );
}

// ============ AI VIDEO PREVIEW ============
export function PreviewAIVideo() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      {/* AI Generated Visual */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              left: `${20 + i * 10}%`,
              top: `${10 + i * 15}%`,
              background: `radial-gradient(circle, ${['#f472b6', '#818cf8', '#34d399', '#fbbf24', '#60a5fa'][i]}44, transparent)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* AI Face/Character */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="relative">
          <div className="w-20 h-24 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full relative">
            <div className="flex gap-3 pt-6 justify-center">
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>
            <motion.div
              className="w-6 h-2 bg-white/80 rounded-full mx-auto mt-3"
              animate={{ width: [24, 16, 24] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          {/* AI particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 50}%`,
                top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 50}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Recording indicator */}
      <motion.div
        className="absolute top-4 left-4 flex items-center gap-1.5"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span className="text-[10px] text-white font-medium">AI GENERATING</span>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-4 right-4">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
      </div>

      <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
        🎬 AI Video • Generating in Real-time
      </div>
    </div>
  );
}

// Export all previews
export const previewComponents: Record<string, React.FC> = {
  '3d': Preview3D,
  'hyper-realistic': PreviewHyperRealistic,
  'cursor-interactive': PreviewCursor,
  'motion': PreviewMotion,
  '2d': Preview2D,
  'normal': PreviewWebsite,
  'advanced': PreviewWebsite,
  'ecommerce': PreviewWebsite,
  'apps': PreviewApp,
  'android': PreviewApp,
  'ios': PreviewApp,
  'business': PreviewApp,
  'ai-videos': PreviewAIVideo,
  'editing': PreviewEditing,
  'simulators': PreviewSimulator,
};
