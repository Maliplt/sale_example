// Ürün detay modali - sepete eklemek için
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Minus, Plus, ShoppingCart, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product, ProductOption } from '../../types';

interface Props { product: Product | null; onClose: () => void; }

// Modal açılış/kapanış animasyonları
const modalV = {
  hidden:  { opacity: 0, scale: 0.88, y: 32 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const } },
  exit:    { opacity: 0, scale: 0.9,  y: 24, transition: { duration: 0.22, ease: 'easeIn' as const } },
};

export function ProductModal({ product, onClose }: Props) {
  const navigate = useNavigate();
  
  // Ürün satın alırken adet ve seçili özellikleri takip et
  const [qty,      setQty]      = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>({});

  // Renk ve beden seçeneklerini ayır
  const colorOpts: ProductOption[] = product?.options?.filter(o => o.type === 'color') ?? [];
  const sizeOpts:  ProductOption[] = product?.options?.filter(o => o.type === 'size')  ?? [];
  
  // İndirimli fiyatı hesapla
  const discounted = product ? product.price * (1 - product.discountPercentage / 100) : 0;
  const handleBuy  = () => { onClose(); navigate('/checkout'); };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Modal arka planı - yarı saydam */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{ backdropFilter: 'blur(8px)' }}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            {/* Ana modal kutusu */}
            <motion.div
              className="pointer-events-auto w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
              variants={modalV} initial="hidden" animate="visible" exit="exit"
              style={{
                background: 'linear-gradient(135deg, rgba(28,43,30,0.65) 0%, rgba(17,26,18,0.72) 60%, rgba(13,26,20,0.68) 100%)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.10)',
              }}
            >
              {/* Sol: ürün görseli | Sağ: ürün detayları */}
              <div className="flex flex-col md:flex-row min-h-[420px]">

                {/* Sol taraf - Ürün Görseli */}
                <div
                  className="md:w-5/12 flex-shrink-0 flex flex-col items-center justify-center p-8 rounded-tl-2xl rounded-bl-2xl relative overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(82,183,136,0.12) 0%, transparent 70%)' }}
                  />

                  {/* İndirim rozeti */}
                  {product.discountPercentage > 0 && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                      -{Math.round(product.discountPercentage)}% indirim
                    </span>
                  )}

                  {/* Ürün resmi */}
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="relative z-10 w-52 h-52 object-contain"
                    style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.5))' }}
                  />

                  {/* Stok durumu göstergesi */}
                  <div className="mt-5 flex items-center gap-1.5 bg-white/6 border border-white/10 rounded-full px-3 py-1.5">
                    <Package size={11} className="text-emerald-400" />
                    <span className="text-[11px] text-white/60">
                      {product.stock < 5
                        ? <span className="text-amber-400 font-semibold">Son {product.stock} adet</span>
                        : <>{product.stock} adet stokta</>
                      }
                    </span>
                  </div>
                </div>

                {/* Sağ taraf - Ürün Bilgileri */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Kapat butonu */}
                  <div className="flex justify-end mb-3">
                    <button
                      onClick={onClose}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* Marka adı */}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/80 mb-1">
                    {product.brand}
                  </span>

                  {/* Ürün başlığı */}
                  <h2 className="text-xl font-black text-white leading-tight mb-2">{product.title}</h2>

                  {/* Yıldız puanı */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13}
                          className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-white/15 text-white/15'} />
                      ))}
                    </div>
                    <span className="text-xs text-white/50 font-medium">{product.rating} / 5</span>
                  </div>

                  {/* Ürün açıklaması */}
                  <p className="text-xs text-white/50 leading-relaxed mb-4">{product.description}</p>

                  {/* Fiyat gösterimi */}
                  <div className="flex items-baseline gap-2.5 mb-5">
                    <span className="text-3xl font-black text-white">${discounted.toFixed(2)}</span>
                    {product.discountPercentage > 0 && (
                      <span className="text-base text-white/30 line-through">${product.price.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Renk seçeneği */}
                  {colorOpts.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Renk</p>
                      <div className="flex flex-wrap gap-2">
                        {colorOpts.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => setSelected(p => ({ ...p, color: opt.value }))}
                            title={opt.label}
                            className="w-7 h-7 rounded-full border-2 transition-all"
                            style={{
                              backgroundColor: opt.value,
                              borderColor: selected.color === opt.value ? '#52b788' : 'rgba(255,255,255,0.15)',
                              boxShadow: selected.color === opt.value ? '0 0 0 3px rgba(82,183,136,0.25)' : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Beden seçeneği */}
                  {sizeOpts.length > 0 && (
                    <div className="mb-5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Beden</p>
                      <div className="flex flex-wrap gap-1.5">
                        {sizeOpts.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => setSelected(p => ({ ...p, size: opt.value }))}
                            className={`min-w-[40px] px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              selected.size === opt.value
                                ? 'bg-emerald-700 text-white border-emerald-600'
                                : 'bg-white/5 text-white/60 border-white/12 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Adet sayacı */}
                  <div className="flex items-center gap-4 mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Adet</p>
                    <div className="flex items-center rounded-lg overflow-hidden border border-white/12">
                      <button
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-9 h-9 flex items-center justify-center text-white/50 hover:bg-white/8 hover:text-white transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-white">{qty}</span>
                      <button
                        onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                        className="w-9 h-9 flex items-center justify-center text-white/50 hover:bg-white/8 hover:text-white transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Satın al butonu */}
                  <button
                    onClick={handleBuy}
                    className="mt-auto w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #2d6a4f, #1b4332)',
                      boxShadow: '0 8px 24px rgba(45,106,79,0.35)',
                    }}
                  >
                    <ShoppingCart size={15} />
                    Satın Al — ${(discounted * qty).toFixed(2)}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
