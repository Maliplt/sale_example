// Anasayfa - hero slider, ürün koleksiyonu ve footer
import { useState, useEffect } from 'react';
import { ProductCard } from '../components/ui/ProductCard';
import type { Product } from '../types';
import { mockProducts } from '../data/mockData';
import { ProductModal } from '../components/ui/ProductModal';
import { Spinner }       from '../components/ui/Spinner';
import { Footer }        from '../components/shared/Footer';
import { HeroSlider }    from '../components/ui/HeroSlider';

// Arka plan görüntüsü ön yükle
const MOUNTAIN_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=75';

export default function Home() {
  // Ürün listesi ve seçili ürün
  const [products, setProducts]   = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected]   = useState<Product | null>(null);

  // Sahte veri yükle (API isteği simülasyonu)
  useEffect(() => {
    const t = setTimeout(() => { setProducts(mockProducts); setIsLoading(false); }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col">
      <HeroSlider />

      {/* Ürünler bölümü - dağ arka planı */}
      <section
        className="relative"
        style={{
          backgroundImage: `url('${MOUNTAIN_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
        }}
      >
        <div className="absolute inset-0 bg-black/42" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-14">
          {/* Başlık */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">
                Bu Hafta
              </p>
              <h2 className="text-3xl font-black text-white tracking-tight">
                Ekipman Koleksiyonu
              </h2>
            </div>
            <button className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              Tüm Ürünler
            </button>
          </div>

          {/* Izgara */}
          {isLoading ? (
            <div className="flex justify-center py-16"><Spinner /></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  onClick={() => setSelected(product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}