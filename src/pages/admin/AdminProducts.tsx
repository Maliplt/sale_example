import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Check, AlertTriangle, Search, List, LayoutGrid, Star } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import type { DashboardProduct } from '../../types';

// Ürün yönetim sayfası - ürün ekleme/düzenleme/silme işlemleri

// localStorage kullanıcı ürünlerini kaydetmek için
const LS_KEY = 'summitgear_products';

// Depodan ürünleri yükle
function loadProducts(): DashboardProduct[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as DashboardProduct[];
  } catch { /* fallthrough */ }

  // Varsayılan verileri yükle
  const seeded: DashboardProduct[] = mockProducts.map(p => ({
    ...p,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
  localStorage.setItem(LS_KEY, JSON.stringify(seeded));
  return seeded;
}

// Ürünleri depolamaya kaydet
function saveProducts(products: DashboardProduct[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(products));
}

// Boş form için varsayılan ürün şeması
function emptyProduct(): Omit<DashboardProduct, 'id' | 'createdAt' | 'updatedAt'> {
  return { title: '', description: '', price: 0, discountPercentage: 0, rating: 5, stock: 0, brand: '', category: '', thumbnail: '', images: [] };
}

// Ürün ekle/düzenle formu
interface FormProps {
  initial?: Partial<DashboardProduct>;
  onSave: (d: Omit<DashboardProduct, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isNew?: boolean;
}

function ProductForm({ initial, onSave, onCancel, isNew = false }: FormProps) {
  // Form state ve değiştirme fonksiyonu
  const [form, setForm] = useState({ ...emptyProduct(), ...initial });
  const set = (k: string, v: string | number) => setForm(p => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, images: form.thumbnail ? [form.thumbnail] : [] });
  };

  // Form alanları konfigürasyonu
  const fields: { key: keyof typeof form; label: string; type: string; ph: string }[] = [
    { key: 'title',              label: 'Ürün Adı',     type: 'text',   ph: 'Trail Running Ayakkabı' },
    { key: 'brand',              label: 'Marka',         type: 'text',   ph: 'Salomon' },
    { key: 'category',           label: 'Kategori',      type: 'text',   ph: 'ayakkabı' },
    { key: 'price',              label: 'Fiyat ($)',     type: 'number', ph: '129' },
    { key: 'discountPercentage', label: 'İndirim (%)',   type: 'number', ph: '0' },
    { key: 'stock',              label: 'Stok',          type: 'number', ph: '50' },
    { key: 'rating',             label: 'Puan (1-5)',    type: 'number', ph: '4.5' },
    { key: 'thumbnail',          label: 'Görsel URL',    type: 'url',    ph: 'https://...' },
  ];

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, type, ph }) => (
          <div key={key}>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide">{label}</label>
            <input type={type} value={String(form[key] ?? '')} onChange={e => set(key, type === 'number' ? Number(e.target.value) : e.target.value)} placeholder={ph} step={type === 'number' ? 'any' : undefined}
              className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-200 text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10 transition-all" />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide">Açıklama</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Ürün hakkında kısa bir açıklama..."
          className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-200 text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10 transition-all resize-none" />
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors">
          <X size={14} /> İptal
        </button>
        <button type="submit" className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-bold text-white bg-green-800 hover:bg-green-900 transition-colors">
          <Check size={14} /> {isNew ? 'Ekle' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}

// Modal penceresi bileşeni - form göstermek için
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function Modal({ open, onClose, title, subtitle, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-stone-100">
                <div>
                  <h3 className="text-base font-bold text-stone-900">{title}</h3>
                  {subtitle && <p className="text-xs text-stone-400 mt-0.5">{subtitle}</p>}
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors">
                  <X size={15} />
                </button>
              </div>
              <div className="p-5">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

type ViewMode = 'list' | 'card';

// Ana sayfa

export default function AdminProducts() {
  const [products, setProducts]   = useState<DashboardProduct[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm]   = useState(false);
  const [deleteId, setDeleteId]   = useState<number | null>(null);
  const [search, setSearch]       = useState('');
  const [viewMode, setViewMode]   = useState<ViewMode>('list');

  useEffect(() => { setProducts(loadProducts()); }, []);

  const addProduct = (data: Omit<DashboardProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    const np: DashboardProduct = { ...data, id: Date.now(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const upd = [np, ...products];
    setProducts(upd); saveProducts(upd); setShowForm(false);
  };

  const updateProduct = (id: number, data: Omit<DashboardProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    const upd = products.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p);
    setProducts(upd); saveProducts(upd); setEditingId(null);
  };

  const deleteProduct = (id: number) => {
    const upd = products.filter(p => p.id !== id);
    setProducts(upd); saveProducts(upd); setDeleteId(null);
  };

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const editingProduct = editingId !== null ? products.find(x => x.id === editingId) : undefined;

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-900">Ürün Yönetimi</h1>
          <p className="text-sm text-stone-500 mt-0.5">{products.length} ürün kayıtlı</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); }}
          className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={15} /> Yeni Ürün
        </button>
      </div>

      {/* Yeni ürün modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)} title="Yeni Ürün Ekle" subtitle="Bilgileri doldurup kaydedin">
        <ProductForm isNew onSave={addProduct} onCancel={() => setShowForm(false)} />
      </Modal>

      {/* Düzenleme modal */}
      <Modal
        open={editingId !== null && editingProduct !== undefined}
        onClose={() => setEditingId(null)}
        title={`Ürünü Düzenle — ${editingProduct?.title ?? ''}`}
        subtitle="Bilgileri güncelleyip kaydedin"
      >
        {editingProduct && (
          <ProductForm
            initial={editingProduct}
            onSave={d => updateProduct(editingProduct.id, d)}
            onCancel={() => setEditingId(null)}
          />
        )}
      </Modal>

      {/* Arama + Görünüm toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-grow">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Ürün veya marka ara..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10 transition-all" />
        </div>
        <div className="flex items-center bg-white border border-stone-200 rounded-lg overflow-hidden flex-shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center justify-center w-9 h-9 transition-colors ${viewMode === 'list' ? 'bg-green-800 text-white' : 'text-stone-400 hover:text-stone-600'}`}
            aria-label="Liste görünümü"
          >
            <List size={15} />
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`flex items-center justify-center w-9 h-9 transition-colors ${viewMode === 'card' ? 'bg-green-800 text-white' : 'text-stone-400 hover:text-stone-600'}`}
            aria-label="Kart görünümü"
          >
            <LayoutGrid size={15} />
          </button>
        </div>
      </div>

      {/* İçerik */}
      {viewMode === 'list' ? (
        // Tablo görünümü
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  {['Ürün', 'Kategori', 'Fiyat', 'İndirim', 'Stok', 'Puan', 'İşlemler'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-10 text-center text-stone-400 text-sm">Sonuç bulunamadı.</td></tr>
                )}
                {filtered.map(product => (
                  <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={product.thumbnail} alt={product.title} className="w-10 h-10 rounded-lg object-cover bg-stone-100 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-900 truncate max-w-[180px]">{product.title}</p>
                          <p className="text-xs text-stone-400">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-stone-500 capitalize">{product.category}</td>
                    <td className="px-5 py-3.5 font-bold text-stone-900">${product.price.toFixed(2)}</td>
                    <td className="px-5 py-3.5">
                      {product.discountPercentage > 0 ? <span className="text-red-600 font-semibold">%{product.discountPercentage}</span> : <span className="text-stone-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`font-semibold ${product.stock < 5 ? 'text-amber-600' : 'text-stone-900'}`}>{product.stock}</span>
                      {product.stock < 5 && <AlertTriangle size={12} className="inline ml-1 text-amber-500" />}
                    </td>
                    <td className="px-5 py-3.5 text-stone-600">{product.rating}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditingId(product.id)} className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors" aria-label="Düzenle">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => setDeleteId(product.id)} className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors" aria-label="Sil">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // kart ızgarası görünümü
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-stone-400 text-sm py-10">Sonuç bulunamadı.</p>
          )}
          {filtered.map(product => {
            const discounted = product.price * (1 - product.discountPercentage / 100);
            return (
              <div key={product.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover bg-stone-100" />
                  {product.discountPercentage > 0 && (
                    <span className="absolute top-2.5 right-2.5 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      %{product.discountPercentage}
                    </span>
                  )}
                  {product.stock < 5 && (
                    <span className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle size={10} /> Düşük stok
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{product.brand}</p>
                  <h3 className="text-sm font-bold text-stone-900 mb-1.5 line-clamp-1">{product.title}</h3>
                  <p className="text-xs text-stone-500 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-stone-900">${discounted.toFixed(2)}</span>
                      {product.discountPercentage > 0 && (
                        <span className="text-xs text-stone-400 line-through">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10}
                          className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'} />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${product.stock < 5 ? 'text-amber-600' : 'text-stone-500'}`}>
                      {product.stock} adet stokta
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setEditingId(product.id)} className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors" aria-label="Düzenle">
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => setDeleteId(product.id)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors" aria-label="Sil">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Silme onay modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteId(null)} />
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full pointer-events-auto" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><Trash2 size={18} className="text-red-600" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Ürünü Sil</h3>
                    <p className="text-xs text-stone-500">Bu işlem geri alınamaz.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors">Vazgeç</button>
                  <button onClick={() => deleteProduct(deleteId)} className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors">Sil</button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
