// Ana sayfa banneri - slayt geçişli geri plan
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RainCanvas } from './RainCanvas';

// Slider slaytları - resimleri, başlıkları ve istatistikleri içerir
const slides = [
  {
    id: 0,
    tag: 'Sezon Koleksiyonu',
    headline: ['Zirveye', 'Hazır'],
    sub: 'Her irtifaya uygun teknik ekipman. Hafif, dayanıklı, güvenilir.',
    cta: 'Koleksiyonu Keşfet',
    ctaSub: 'Kampanyalar',
    bg: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=75',
    overlay: 'rgba(5,18,10,0.58)',
    accent: '#52b788',
    stat: { value: '200+', label: 'Ürün Çeşidi', sub: 'Outdoor ekipman' },
  },
  {
    id: 1,
    tag: 'Yeni Sezon',
    headline: ['Doğada', 'Performans'],
    sub: 'Hafif, nefes alabilir, dayanıklı. Parkur farketmez.',
    cta: 'Yeni Gelenleri Gör',
    ctaSub: 'Filtrele',
    bg: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=75',
    overlay: 'rgba(5,14,8,0.60)',
    accent: '#74c69d',
    stat: { value: '%15', label: 'İlk Sipariş', sub: 'İndirim kodu' },
  },
  {
    id: 2,
    tag: 'Sınırlı Stok',
    headline: ['Son', 'Fırsatlar'],
    sub: 'Stoklar hızla tükeniyor. Kaçırmadan sepete ekle.',
    cta: 'İndirimleri Gör',
    ctaSub: 'Stok Durumu',
    bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=75',
    overlay: 'rgba(8,14,20,0.62)',
    accent: '#90e0ef',
    stat: { value: '%40', label: 'Max İndirim', sub: 'Seçili ürünler' },
  },
];

// Metin animasyon efekti - slaytlar değişirken kaydır
const textV = {
  enter:  (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] as const } },
  exit:   (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.22 } }),
};

export function HeroSlider() {
  // Aktif slayt indeksi ve yön takibi
  const [index,  setIndex]  = useState(0);
  const [dir,    setDir]    = useState(1);
  const [paused, setPaused] = useState(false);

  // Slayt geçiş fonksiyonları
  const next = useCallback(() => { setDir(1);  setIndex(p => (p + 1) % slides.length); }, []);
  const prev = useCallback(() => { setDir(-1); setIndex(p => (p - 1 + slides.length) % slides.length); }, []);
  const goTo = useCallback((i: number) => { setDir(i > index ? 1 : -1); setIndex(i); }, [index]);

  // Her 6 saniyede bir otomatik ilerle
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next]);

  const s = slides[index];

  return (
    <section
      className="relative overflow-hidden select-none"
      style={{ height: 560 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((sl, i) => (
        <div
          key={sl.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            backgroundImage: `url('${sl.bg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}

      <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: s.overlay }} />

      <RainCanvas intensity={90} opacity={0.7} />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-8 lg:px-12 flex items-center justify-between gap-8">

        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={s.id}
            custom={dir}
            variants={textV}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex-1 min-w-0"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] mb-4" style={{ color: s.accent }}>
              {s.tag}
            </p>

            <h1 className="mb-5">
              {s.headline.map((w, i) => (
                <span key={i} className="block text-5xl lg:text-[64px] font-black text-white leading-[1.02] tracking-tight">
                  {w}
                </span>
              ))}
            </h1>

            <p className="text-sm text-white/55 leading-relaxed mb-9 max-w-xs">{s.sub}</p>

            <div className="flex items-center gap-3 flex-wrap">
              <button className="px-7 py-3 rounded-full text-sm font-bold text-stone-900 bg-white hover:bg-stone-50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.97] transition-all duration-150">
                {s.cta}
              </button>
              <button className="px-7 py-3 rounded-full text-sm font-semibold text-white/65 border border-white/18 hover:border-white/45 hover:text-white transition-all duration-150">
                {s.ctaSub}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Statik glass container */}
        <div className="hidden lg:block flex-shrink-0 w-52">
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.11)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`stat-content-${s.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                <span
                  className="block text-5xl font-black text-white mb-1 tabular-nums"
                  style={{ textShadow: `0 0 32px ${s.accent}90` }}
                >
                  {s.stat.value}
                </span>
                <span className="block text-sm font-bold text-white/85 mb-1">{s.stat.label}</span>
                <span className="block text-xs text-white/45">{s.stat.sub}</span>
                <div className="mt-5 mx-auto w-10 h-0.5 rounded-full transition-colors duration-300" style={{ backgroundColor: s.accent }} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <button onClick={prev} aria-label="Önceki"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/12 transition-all">
        <ChevronLeft size={17} />
      </button>
      <button onClick={next} aria-label="Sonraki"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/12 transition-all">
        <ChevronRight size={17} />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
            className="slider-dot"
            style={i === index ? { width: 20, background: 'rgba(255,255,255,0.9)' } : {}}
          />
        ))}
      </div>

      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 h-px z-20" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            key={`prog-${index}`} className="h-full"
            style={{ background: s.accent }}
            initial={{ width: '0%' }} animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
          />
        </div>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.52))' }}
      />
    </section>
  );
}
