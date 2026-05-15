// Ürün kartı - koleksiyonda görüntülenen ürün öğesi
import { Star } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  index?: number;  // Animasyon sıralaması için
  onClick: () => void;
}

export function ProductCard({ product, index = 0, onClick }: ProductCardProps) {
  // İndirimli fiyatı hesapla
  const discounted = product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-card group"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Kayan ışık efekti - hover sırasında görülür */}
      <span className="glass-card__shine" aria-hidden="true" />

      {/* İndirim yüzdesi göstergesi */}
      {hasDiscount && (
        <span className="glass-card__discount">
          %{Math.round(product.discountPercentage)}
          <span className="glass-card__discount-label">İNDİRİM</span>
        </span>
      )}

      {/* Ürün görseli */}
      <div className="glass-card__img-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="glass-card__img"
        />
      </div>

      {/* Marka + Yıldızlar */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/45">
          {product.brand}
        </span>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={10}
              className={
                i < Math.floor(product.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-white/15 text-white/15'
              }
            />
          ))}
        </div>
      </div>

      {/* Başlık */}
      <h3 className="text-sm font-bold text-white leading-snug mb-2 line-clamp-1 group-hover:text-white/95">
        {product.title}
      </h3>

      {/* Fiyat */}
      <div className="flex items-baseline gap-2">
        <span className="text-base font-black text-white">${discounted.toFixed(2)}</span>
        {hasDiscount && (
          <span className="text-xs text-white/30 line-through">${product.price.toFixed(2)}</span>
        )}
      </div>
    </button>
  );
}