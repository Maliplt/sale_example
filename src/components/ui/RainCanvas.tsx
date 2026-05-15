// canvas üzerine yağmur animasyonu çizen bileşen
import { useEffect, useRef } from 'react';

// yağmur damlası tiplemesi
interface Drop { x: number; y: number; speed: number; length: number; }

// yağmur açısını hesaplamak için sin/cos değerleri
const SIN_A = Math.sin(Math.PI * 0.06);
const COS_A = Math.cos(Math.PI * 0.06);

// Rastgele yağmur damlası oluştur
function makeDrop(w: number, h: number, scatter = false): Drop {
  return {
    x: Math.random() * (w + 100) - 50,
    y: scatter ? Math.random() * h : -Math.random() * 100,
    speed: 9 + Math.random() * 7,
    length: 18 + Math.random() * 28,
  };
}

interface Props { intensity?: number; opacity?: number; }

export function RainCanvas({ intensity = 90, opacity = 1 }: Props) {
  const ref     = useRef<HTMLCanvasElement>(null);
  const visible = useRef(true);  // Kaynıysa canvas görünüyor mu
  const raf     = useRef(0);     // Animasyon frame ID'si

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let drops: Drop[] = [];
    let last = 0;

    // canvas pencereye gore
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drops = Array.from({ length: intensity }, () =>
        makeDrop(canvas.width, canvas.height, true)
      );
    };
    resize();

    // boyut icin resize
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    //c anvas görünür olduğunda animasyon stop
    const io = new IntersectionObserver(
      ([e]) => { visible.current = e.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    // one layer katman 
    const tick = (now: number) => {
      raf.current = requestAnimationFrame(tick); // Animasyon döngüsü

      if (!visible.current) return;
      const dt = now - last;
      if (dt < 14) return; // FPS sınırı (70fps civarı)
      last = now;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(180,215,255,0.2)';
      ctx.lineWidth   = 0.7;
      ctx.beginPath();

      // Her damlayı hareket ettir ve çiz
      for (const d of drops) {
        d.x += SIN_A * d.speed * (dt / 16);
        d.y += COS_A * d.speed * (dt / 16);

        // Eğer damla ekranın altında kayboldu, yenisini oluştur
        if (d.y > H + d.length) {
          const nd = makeDrop(W, H);
          d.x = nd.x; d.y = nd.y; d.speed = nd.speed; d.length = nd.length;
        }
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - SIN_A * d.length, d.y - COS_A * d.length);
      }
      ctx.stroke();
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      io.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity, mixBlendMode: 'screen' }}
    />
  );
}
