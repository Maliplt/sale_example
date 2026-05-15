import { useLocation, Link } from 'react-router-dom';

// Navbar - login ve admin sayfalarında gizlenir
export function Navbar() {
  const { pathname } = useLocation();
  if (pathname === '/login' || pathname.startsWith('/admin')) return null;

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">

        {/* Logo ve marka adı */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-green-800 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M3 17l4-8 4 4 4-6 4 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-stone-900 tracking-tight">SummitGear</span>
        </Link>

        {/* Sağ menü - linkler ve butonlar */}
        <div className="flex items-center gap-7">
          <Link to="/" className="text-sm font-medium text-stone-600 hover:text-green-800 transition-colors">
            Koleksiyon
          </Link>
          <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-green-800 transition-colors">
            Yönetici Girişi
          </Link>
          <Link to="/checkout"
            className="flex items-center gap-1.5 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Sepet
          </Link>
        </div>
      </div>
    </nav>
  );
}
