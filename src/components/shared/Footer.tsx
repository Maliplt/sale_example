// Alt kısım - tüm sayfalarda görüntülenen
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Marka bilgisi */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-green-700 flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M3 17l4-8 4 4 4-6 4 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-base font-bold text-white">SummitGear</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              Outdoor tutkunları için seçilmiş ekipman ve giyim. Her irtifaya hazırız.
            </p>
          </div>

          {/* Hızlı linkler */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
              Keşfet
            </h4>
            <ul className="space-y-2.5">
              {['Koleksiyon', 'Kampanyalar', 'Yeni Gelenler', 'Markalar'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-stone-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hesap */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
              Hesap
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/login" className="text-sm text-stone-400 hover:text-white transition-colors">
                  Yönetici Girişi
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-stone-400 hover:text-white transition-colors">
                  Yönetim Paneli
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} SummitGear. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-stone-600">
            Outdoor ekipman mağazası örneği
          </p>
        </div>
      </div>
    </footer>
  );
}