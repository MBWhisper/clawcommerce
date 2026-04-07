import { useState } from 'react';
import { useStoreStore } from '../../store/storeStore';
import { useAuthStore } from '../../store/authStore';
import type { Product } from '../../types/database';

export default function ProductsPage() {
  const { products, deleteProduct, updateProduct, createProduct } = useStoreStore();
  const { store } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    compare_price: '',
    quantity: '0',
    status: 'draft' as 'active' | 'draft' | 'archived',
    is_featured: false,
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[أإآا]/g, 'a')
      .replace(/[ب]/g, 'b')
      .replace(/[ت]/g, 't')
      .replace(/[ث]/g, 'th')
      .replace(/[ج]/g, 'j')
      .replace(/[ح]/g, 'h')
      .replace(/[خ]/g, 'kh')
      .replace(/[د]/g, 'd')
      .replace(/[ذ]/g, 'th')
      .replace(/[ر]/g, 'r')
      .replace(/[ز]/g, 'z')
      .replace(/[س]/g, 's')
      .replace(/[ش]/g, 'sh')
      .replace(/[ص]/g, 's')
      .replace(/[ض]/g, 'd')
      .replace(/[ط]/g, 't')
      .replace(/[ظ]/g, 'z')
      .replace(/[ع]/g, 'a')
      .replace(/[غ]/g, 'gh')
      .replace(/[ف]/g, 'f')
      .replace(/[ق]/g, 'q')
      .replace(/[ك]/g, 'k')
      .replace(/[ل]/g, 'l')
      .replace(/[م]/g, 'm')
      .replace(/[ن]/g, 'n')
      .replace(/[ه]/g, 'h')
      .replace(/[و]/g, 'w')
      .replace(/[ي]/g, 'y')
      .replace(/[ة]/g, 'a')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '')
      .replace(/--+/g, '-');
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description || '',
        price: product.price.toString(),
        compare_price: product.compare_price?.toString() || '',
        quantity: product.quantity.toString(),
        status: product.status,
        is_featured: product.is_featured,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        price: '',
        compare_price: '',
        quantity: '0',
        status: 'draft',
        is_featured: false,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store?.id) return;

    setIsSubmitting(true);

    const productData = {
      store_id: store.id,
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      description: formData.description || null,
      price: parseFloat(formData.price),
      compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
      quantity: parseInt(formData.quantity),
      status: formData.status,
      is_featured: formData.is_featured,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await createProduct(productData);
    }

    setIsSubmitting(false);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      await deleteProduct(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'نشط' },
      draft: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'مسودة' },
      archived: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'مؤرشف' },
    };
    const badge = badges[status] || badges.draft;
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">المنتجات</h1>
          <p className="text-gray-600 mt-1">{products.length} منتج</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          إضافة منتج
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="draft">مسودة</option>
            <option value="archived">مؤرشف</option>
          </select>
        </div>
      </div>

      {/* Products grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد منتجات</h3>
          <p className="text-gray-500 mb-6">ابدأ بإضافة منتجك الأول</p>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
          >
            إضافة منتج جديد
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              {/* Product image */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {Array.isArray(product.images) && product.images[0] ? (
                  <img
                    src={product.images[0] as string}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {product.is_featured && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    مميز
                  </span>
                )}
              </div>

              {/* Product info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                  {getStatusBadge(product.status)}
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-orange-600">{formatCurrency(Number(product.price))}</span>
                  {product.compare_price && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatCurrency(Number(product.compare_price))}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>المخزون: {product.quantity}</span>
                  <span>SKU: {product.sku || '-'}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">
                {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المنتج *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    name: e.target.value,
                    slug: generateSlug(e.target.value)
                  })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="مثال: قميص قطني أزرق"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الرابط (Slug)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="product-slug"
                  dir="ltr"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="وصف المنتج..."
                />
              </div>

              {/* Prices */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر قبل الخصم
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.compare_price}
                    onChange={(e) => setFormData({ ...formData, compare_price: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Quantity & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الكمية
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الحالة
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'draft' | 'archived' })}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="draft">مسودة</option>
                    <option value="active">نشط</option>
                    <option value="archived">مؤرشف</option>
                  </select>
                </div>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                />
                <label htmlFor="is_featured" className="font-medium">
                  منتج مميز
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 px-4 border rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'جاري الحفظ...' : editingProduct ? 'حفظ التغييرات' : 'إضافة المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
