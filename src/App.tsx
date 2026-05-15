import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home       from './pages/Home';
import Login      from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminProducts  from './pages/admin/AdminProducts';
import AdminWIP       from './pages/admin/AdminWIP';
import { AuthGuard }  from './components/shared/AuthGuard';
import { Navbar }     from './components/shared/Navbar';

// Uygulamanın ana yapısı - routing ve layout
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-50 text-stone-900">
        <Navbar />
        <Routes>
          {/* pages */}
          <Route path="/"        element={<Home />} />
          <Route path="/login"   element={<Login />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* protected routes */}
          <Route path="/admin" element={<AuthGuard><AdminLayout /></AuthGuard>}>
            <Route index           element={<AdminWIP />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders"   element={<AdminWIP />} />
            <Route path="customers" element={<AdminWIP />} />
            <Route path="settings"  element={<AdminWIP />} />
          </Route>

          {/* redirect protected icin */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// temp sepet
function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-stone-50">
      {/* Başarı ikonu */}
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-green-800">
          <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-stone-900">Sipariş Alındı</h1>
      <p className="text-stone-500 text-sm">Bu sayfa henüz geliştirme aşamasındadır.</p>
      <Link to="/"
        className="mt-2 inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
        Alışverişe Devam Et
      </Link>
    </div>
  );
}