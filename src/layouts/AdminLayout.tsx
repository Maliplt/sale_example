// admin yönetim paneli - sidebar ve nav barı içeren layout
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { setAuthenticated } from '../components/shared/AuthGuard';
import { Sidebar } from '../components/admin/Sidebar';
import { Header } from '../components/admin/Header';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // admin çıkış yap
  const handleLogout = () => { setAuthenticated(false); navigate('/login'); };

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">

      {/* Mobil overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        onLogout={handleLogout} 
      />

      {/* home */}
      <main className="flex-grow min-w-0 overflow-y-auto flex flex-col">

        {/* ust bar */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* alt icerik outlete */}
        <div className="flex-grow p-6">
          <Outlet /> {/* ice doldurmak icin */}
        </div>
      </main>

      {/* Mobil kapat butonu */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed top-4 right-4 z-40 w-9 h-9 rounded-lg bg-white shadow-md flex items-center justify-center text-stone-600 lg:hidden"
          aria-label="Kapat"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}