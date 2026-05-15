import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart,
  Users, Settings, LogOut
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Genel Bakış',  to: '/admin',            end: true },
  { icon: Package,         label: 'Ürünler',      to: '/admin/products',   end: false },
  { icon: ShoppingCart,    label: 'Siparişler',   to: '/admin/orders',     end: false },
  { icon: Users,           label: 'Müşteriler',   to: '/admin/customers',  end: false },
  { icon: Settings,        label: 'Ayarlar',      to: '/admin/settings',   end: false },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen, onLogout }: SidebarProps) {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-30 h-full w-60
        bg-stone-900 text-stone-200
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}
    >
      {/* Logo alanı */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-stone-800">
        <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M3 17l4-8 4 4 4-6 4 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-base font-bold text-white tracking-tight">SummitGear</span>
      </div>

      {/* Kullanıcı özeti */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-800">
        <div className="w-9 h-9 rounded-full bg-green-800 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          AY
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">Admin Yönetici</p>
          <p className="text-xs text-stone-500 truncate">admin@test.com</p>
        </div>
      </div>

      {/* Navigasyon */}
      <nav className="flex-grow px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, to, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-green-800 text-white'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-100'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Çıkış */}
      <div className="px-3 pb-5">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-stone-400 hover:bg-stone-800 hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
