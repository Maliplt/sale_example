import { Menu } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200 flex-shrink-0">
      {/* Mobil menü */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
        aria-label="Menüyü aç"
      >
        <Menu size={16} />
      </button>

      <p className="hidden lg:block text-xs text-stone-400">
        SummitGear Yönetim Paneli
      </p>

      {/* Sağ: stok uyarısı rozeti (dekoratif) */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          2 düşük stok uyarısı
        </span>
      </div>
    </header>
  );
}
