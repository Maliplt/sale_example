import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { setAuthenticated } from '../components/shared/AuthGuard';

const DEMO_EMAIL    = 'admin@test.com';
const DEMO_PASSWORD = '123456';

// Dağ fotoğrafı - sol panelin arka planı
const MOUNTAIN_BG = 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=900&q=80';

export default function Login() {
  const navigate = useNavigate();

  // Giriş form alanları
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  // Giriş yap butonu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    setLoading(true);
    await new Promise(res => setTimeout(res, 1000));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setAuthenticated(true);
      navigate('/admin');
    } else {
      setError('E-posta adresi veya şifre hatalı.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-stone-50">

      {/* Sol panel - fotoğraf ve marka bilgisi */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('${MOUNTAIN_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* karartma */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Sol üst: anasayfaya dön */}
        <Link
          to="/"
          className="absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          Anasayfa
        </Link>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 text-white text-center px-12 max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 17l4-8 4 4 4-6 4 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight">SummitGear</span>
          </div>

          <h1 className="text-4xl font-black leading-tight mb-4">
            Yönetim<br />Paneline Hoş Geldin
          </h1>
          <p className="text-white/65 text-sm leading-relaxed mb-10">
            Stok takibi, sipariş yönetimi ve satış raporları — tek ekranda.
          </p>

          {/* Özellik satırları */}
          {[
            'Gerçek zamanlı sipariş takibi',
            'Stok uyarı ve yönetim sistemi',
            'Günlük satış özeti',
          ].map(item => (
            <div key={item} className="flex items-center gap-3 mb-3 text-left">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              <span className="text-white/70 text-sm">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Sağ panel - giriş formu */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Mobil logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-green-800 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 17l4-8 4 4 4-6 4 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-base font-bold text-stone-900">SummitGear</span>
          </div>

          {/* Geri dön */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-green-800 transition-colors mb-8"
          >
            <ArrowLeft size={13} />
            Anasayfaya dön
          </Link>

          {/* Başlık */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-2">
              Yetkili Girişi
            </p>
            <h2 className="text-3xl font-black text-stone-900 mb-1">Tekrar hoş geldin</h2>
            <p className="text-sm text-stone-500">
              Hesabına giriş yap ve panele erişmeye başla.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* E-posta */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-stone-700 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="örnek@şirket.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/15 transition-all"
                />
              </div>
            </div>

            {/* Şifre */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-stone-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                  aria-label={showPass ? 'Gizle' : 'Göster'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Beni Hatırla + Şifremi Unuttum */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 accent-green-700"
                />
                <span className="text-sm text-stone-600">Beni hatırla</span>
              </label>
              <button
                type="button"
                className="text-sm text-green-700 hover:text-green-900 font-medium transition-colors"
              >
                Şifremi unuttum
              </button>
            </div>

            {/* Hata mesajı */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Giriş butonu */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold text-sm py-3.5 rounded-xl transition-colors mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          {/* Demo giriş bilgileri */}
          <p className="mt-8 text-center text-xs text-stone-400">
            Demo giriş: <span className="font-mono text-stone-500">admin@test.com</span> / <span className="font-mono text-stone-500">123456</span>
          </p>

        </div>
      </div>
    </div>
  );
}