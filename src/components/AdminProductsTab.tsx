import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, Image as ImageIcon, X, Upload, 
  ArrowLeft, Copy, Check, Briefcase, CreditCard, 
  ShoppingBag, Sparkles, Grid, Shirt, Footprints, Info, Search, Star, PenTool
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { API_URL } from '../config';

const CATEGORIES = ['Jackets', 'Shoes', 'Briefcases', 'Wallets', 'Bags', 'Accessories'];

export const AdminProductsTab: React.FC = () => {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL query state
  const editingId = searchParams.get('edit'); // null, 'new', or product _id/slug
  const selectedCategory = searchParams.get('category'); // null, 'All', or category name

  // Products catalog data
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Edit form state
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: 'Jackets',
    stock: '0',
    images: [] as string[],
    isFeatured: false,
    isBestSeller: false,
    isLowStock: false,
    customizable: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch product detail if in edit screen and not in memory
  useEffect(() => {
    if (editingId && editingId !== 'new') {
      const existing = products.find(p => p._id === editingId || p.slug === editingId);
      if (existing) {
        setForm({
          name: existing.name,
          slug: existing.slug,
          description: existing.description,
          price: existing.price.toString(),
          category: existing.category,
          stock: existing.stock.toString(),
          images: existing.images || [],
          isFeatured: existing.isFeatured || false,
          isBestSeller: existing.isBestSeller || false,
          isLowStock: existing.isLowStock || false,
          customizable: existing.customizable || false
        });
        setActiveImageIndex(0);
      } else if (products.length > 0) {
        // Only fetch if products are loaded and it's not found (meaning it's loaded by direct URL refresh)
        fetchProductById(editingId);
      }
    } else if (editingId === 'new') {
      setForm({
        name: '',
        slug: '',
        description: '',
        price: '',
        category: selectedCategory && selectedCategory !== 'All' ? selectedCategory : 'Jackets',
        stock: '15',
        images: [],
        isFeatured: false,
        isBestSeller: false,
        isLowStock: false,
        customizable: false
      });
      setActiveImageIndex(0);
    }
  }, [editingId, products, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products?includeArchived=true&t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        // Normalize products so missing fields in Atlas don't hide items
        const normalized = data.map((p: any) => ({
          ...p,
          category: (p.category && String(p.category).trim()) || 'Jackets',
          status: p.status || 'active',
          price: typeof p.price === 'number' ? p.price : Number(p.price || 0),
          stock: typeof p.stock === 'number' ? p.stock : Number(p.stock || 0)
        }));
        setProducts(normalized);
      }
    } catch (err) {
      console.error('Failed to fetch products from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: data.price.toString(),
          category: data.category,
          stock: data.stock.toString(),
          images: data.images || [],
          isFeatured: data.isFeatured || false,
          isBestSeller: data.isBestSeller || false,
          isLowStock: data.isLowStock || false,
          customizable: data.customizable || false
        });
        setActiveImageIndex(0);
      }
    } catch (err) {
      console.error('Failed to fetch product details', err);
    }
  };

  // State setters synchronized with URL search params
  const setCategoryParam = (cat: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', 'products');
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    params.delete('edit');
    setSearchParams(params);
    setSearchTerm('');
  };

  const setEditParam = (id: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', 'products');
    if (id) {
      params.set('edit', id);
    } else {
      params.delete('edit');
    }
    setSearchParams(params);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to archive/delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        setEditParam(null);
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    try {
      const isEdit = editingId && editingId !== 'new';
      const url = isEdit ? `${API_URL}/api/products/${editingId}` : `${API_URL}/api/products`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setEditParam(null);
        fetchProducts();
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Error saving product');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend server');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const newImageUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      await new Promise<void>((resolve) => {
        reader.onload = async (event) => {
          const base64 = event.target?.result as string;
          try {
            const res = await fetch(`${API_URL}/api/products/upload`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
              },
              body: JSON.stringify({ 
                image: base64,
                fileName: file.name.split('.')[0]
              })
            });

            const data = await res.json();

            if (res.ok && data && data.url) {
              console.log('Image upload success:', data.url);
              newImageUrls.push(data.url);
            } else {
              console.error('Upload error response:', data);
              alert(`Failed to upload ${file.name}: ${data.message || 'Unknown server error'}`);
            }
          } catch (err: any) {
            console.error('Upload connection error:', err);
            alert(`Error uploading ${file.name}: ${err.message || 'Network error'}`);
          }
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    if (newImageUrls.length > 0) {
      setForm(prev => ({ ...prev, images: [...prev.images, ...newImageUrls] }));
    }
    setUploadingImages(false);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setForm(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
    setActiveImageIndex(prev => {
      if (prev >= form.images.length - 1) {
        return Math.max(0, form.images.length - 2);
      }
      return prev;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryCount = (catName: string) => {
    return products.filter(p => p.category?.trim().toLowerCase() === catName.trim().toLowerCase() && p.status !== 'archived').length;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Jackets':
        return <Shirt className="w-5 h-5 text-[#825425]" />;
      case 'Shoes':
        return <Footprints className="w-5 h-5 text-[#825425]" />;
      case 'Briefcases':
        return <Briefcase className="w-5 h-5 text-[#825425]" />;
      case 'Wallets':
        return <CreditCard className="w-5 h-5 text-[#825425]" />;
      case 'Bags':
        return <ShoppingBag className="w-5 h-5 text-[#825425]" />;
      case 'Accessories':
        return <Sparkles className="w-5 h-5 text-[#825425]" />;
      default:
        return <Grid className="w-5 h-5 text-[#825425]" />;
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#827470]">Loading atelier inventory catalog...</div>;
  }

  // ────────────────────────────────────────────────────────────────────────
  // VIEW 1: PRODUCT EDITING / CREATION PAGE
  // ────────────────────────────────────────────────────────────────────────
  if (editingId) {
    const isNew = editingId === 'new';
    const product = products.find(p => p._id === editingId || p.slug === editingId);

    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#d3c3be]/40 overflow-hidden">
        {/* Editor Header */}
        <div className="p-6 border-b border-[#d3c3be]/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => setEditParam(null)}
              className="p-2 hover:bg-[#f0eee9] rounded-lg transition-colors text-[#504440]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold font-display text-[#090100]">
                {isNew ? 'Create New Collection Entry' : `Edit Product Details`}
              </h2>
              <p className="text-xs text-[#827470]">
                {isNew ? 'Define a new masterpiece in the catalog.' : `Modify catalog characteristics and availability.`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => setEditParam(null)}
              className="px-4 py-2 border border-[#d3c3be] rounded text-sm text-[#504440] hover:bg-[#f0eee9]"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-5 py-2 bg-[#090100] text-white rounded text-sm hover:bg-[#1b1c19] font-medium shadow-sm transition-colors"
            >
              {isNew ? 'Save Masterpiece' : 'Update Details'}
            </button>
          </div>
        </div>

        {/* Database ID info block */}
        <div className="px-6 py-4 bg-[#fbf9f4] border-b border-[#d3c3be]/30 space-y-2">
          <div className="flex items-center gap-2.5 text-xs text-[#504440]">
            <Info className="w-4 h-4 text-[#825425] flex-shrink-0" />
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-[#827470]">Atelier Product ID:</span>
              <code className="bg-white px-2 py-0.5 rounded border border-[#d3c3be]/40 font-mono text-[11px] font-bold select-all">
                {isNew ? 'GENERATED_ON_SAVE' : (product?._id || editingId)}
              </code>
              {!isNew && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(product?._id || editingId || '')}
                  className="text-[#825425] hover:text-[#090100] font-semibold flex items-center gap-1 ml-1 cursor-pointer"
                >
                  {copied ? (
                    <span className="text-emerald-700 flex items-center gap-0.5">✓ Copied</span>
                  ) : (
                    <span className="flex items-center gap-0.5"><Copy className="w-3 h-3" /> Copy</span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Media & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Atelier Media Showcase card */}
              <div className="bg-[#fbf9f4] p-6 rounded-xl border border-[#d3c3be]/40 space-y-5">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-bold text-sm text-[#090100] uppercase tracking-wider">Atelier Gallery</h3>
                    <p className="text-[10px] text-[#827470] mt-0.5">Primary showcase image and gallery assets.</p>
                  </div>
                  <label className={`cursor-pointer text-xs font-semibold text-[#825425] hover:text-[#090100] hover:bg-[#825425]/10 transition-all flex items-center gap-1.5 bg-[#825425]/5 px-3 py-1.5 rounded-lg border border-[#825425]/20 ${uploadingImages ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploadingImages ? (
                      <>
                        <div className="w-3 h-3 border-2 border-[#825425] border-t-transparent rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Add Photo</span>
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="hidden" 
                          disabled={uploadingImages} 
                        />
                      </>
                    )}
                  </label>
                </div>

                {/* Big Preview Container */}
                {form.images.length === 0 ? (
                  <label className={`border border-dashed border-[#d3c3be] hover:border-[#825425] hover:bg-[#825425]/5 rounded-xl p-12 flex flex-col items-center justify-center text-[#827470] cursor-pointer transition-colors min-h-[320px] bg-white/50 ${uploadingImages ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploadingImages ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#825425] border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-semibold">Uploading high-resolution product media...</span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-12 h-12 text-[#d3c3be] mb-3" />
                        <span className="text-sm font-semibold mb-1 text-[#090100]">No media files uploaded yet</span>
                        <span className="text-xs text-[#827470] text-center max-w-sm">Drag & drop or click "Add Photo" to populate this product's boutique showcase.</span>
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="hidden" 
                          disabled={uploadingImages} 
                        />
                      </>
                    )}
                  </label>
                ) : (
                  <div className="space-y-4">
                    {/* Big active preview */}
                    <div className="relative w-full h-[360px] md:h-[420px] border border-[#d3c3be]/60 rounded-xl overflow-hidden bg-white flex items-center justify-center group shadow-sm">
                      <img 
                        src={form.images[activeImageIndex] || form.images[0]} 
                        alt="Product Primary View" 
                        className="w-full h-full object-contain p-4 transition-all duration-300"
                      />
                      <div className="absolute bottom-4 left-4 bg-[#090100]/80 text-[#fbf9f4] px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase">
                        {activeImageIndex === 0 ? '★ Primary Showcase' : `Gallery Asset #${activeImageIndex + 1}`}
                      </div>
                      
                      <button 
                        type="button" 
                        onClick={() => removeImage(activeImageIndex)} 
                        className="absolute top-4 right-4 bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer flex items-center justify-center"
                        title="Remove Current Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Strip of Thumbnails */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {form.images.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveImageIndex(i)}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shadow-sm bg-white ${
                            activeImageIndex === i ? 'border-[#825425] ring-2 ring-[#825425]/20 scale-105' : 'border-[#d3c3be]/60 hover:border-[#825425]'
                          }`}
                        >
                          <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                          {i === 0 && (
                            <span className="absolute top-0.5 left-0.5 bg-[#825425] text-white rounded-full p-0.5 text-[8px]" title="Primary">
                              ★
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-[10px] text-[#827470]">Multiple high-res media files can be uploaded simultaneously.</p>
              </div>

              {/* Product Details Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#504440] mb-1">Product Title</label>
                  <input 
                    required 
                    type="text" 
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')})} 
                    className="w-full border border-[#d3c3be] px-4 py-2.5 rounded focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] text-sm" 
                    placeholder="e.g. The Heritage Briefcase" 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#504440] mb-1">URL Slug</label>
                    <input 
                      required 
                      type="text" 
                      value={form.slug} 
                      onChange={e => setForm({...form, slug: e.target.value})} 
                      className="w-full border border-[#d3c3be] px-4 py-2.5 rounded focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] text-sm font-mono text-[#827470]" 
                      placeholder="e.g. the-heritage-briefcase" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#504440] mb-1">Category Suite</label>
                    <select 
                      value={form.category} 
                      onChange={e => setForm({...form, category: e.target.value})} 
                      className="w-full border border-[#d3c3be] px-4 py-2.5 rounded focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] text-sm"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#504440] mb-1">Atelier & Description Details</label>
                  <textarea 
                    required 
                    value={form.description} 
                    onChange={e => setForm({...form, description: e.target.value})} 
                    rows={6} 
                    className="w-full border border-[#d3c3be] px-4 py-3 rounded focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] text-sm"
                    placeholder="Tell the story, materials, and origin details of this object..."
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Inventory & Pricing */}
            <div className="space-y-6">
              {/* Pricing card */}
              <div className="bg-[#fbf9f4] p-5 rounded-xl border border-[#d3c3be]/40 space-y-4">
                <h3 className="font-display font-bold text-sm text-[#090100] uppercase tracking-wider">Pricing details</h3>
                <div>
                  <label className="block text-xs font-semibold text-[#827470] mb-1">Base Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#827470] font-medium text-sm">₹</span>
                    <input 
                      required 
                      type="number" 
                      value={form.price} 
                      onChange={e => setForm({...form, price: e.target.value})} 
                      className="w-full border border-[#d3c3be] pl-7 pr-4 py-2 rounded focus:outline-none focus:border-[#825425] text-sm font-bold" 
                      placeholder="95000"
                    />
                  </div>
                </div>
              </div>

              {/* Stock control card */}
              <div className="bg-[#fbf9f4] p-5 rounded-xl border border-[#d3c3be]/40 space-y-4">
                <h3 className="font-display font-bold text-sm text-[#090100] uppercase tracking-wider">Inventory Availability</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-[#827470] mb-1">Stock Count</label>
                  <div className="flex items-center gap-2">
                    <input 
                      required 
                      type="number" 
                      value={form.stock} 
                      onChange={e => setForm({...form, stock: e.target.value})} 
                      className="w-24 border border-[#d3c3be] px-2 py-2 rounded focus:outline-none focus:border-[#825425] text-center font-bold text-lg font-mono" 
                    />
                    <div className="flex flex-wrap gap-1">
                      {[5, 10, 50].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, stock: (Math.max(0, Number(prev.stock) + val)).toString() }))}
                          className="bg-[#f0eee9] hover:bg-[#825425] hover:text-white px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer"
                        >
                          +{val}
                        </button>
                      ))}
                      {[-5, -10].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, stock: (Math.max(0, Number(prev.stock) + val)).toString() }))}
                          className="bg-[#f0eee9] hover:bg-red-600 hover:text-white px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer"
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#d3c3be]/30 flex items-center justify-between">
                  <span className="text-xs text-[#827470] font-medium">Availability State:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    Number(form.stock) > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {Number(form.stock) > 0 ? 'In Stock / Active' : 'Out of Stock / Unavailable'}
                  </span>
                </div>
              </div>

              {/* Showcase Badges card */}
              <div className="bg-[#fbf9f4] p-5 rounded-xl border border-[#d3c3be]/40 space-y-4">
                <h3 className="font-display font-bold text-sm text-[#090100] uppercase tracking-wider">Showcase Badges</h3>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={e => setForm({...form, isFeatured: e.target.checked})}
                      className="mt-1 h-4 w-4 rounded border-[#d3c3be] text-[#825425] focus:ring-[#825425] cursor-pointer"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-[#090100] group-hover:text-[#825425] transition-colors flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        Add to Featured Collection
                      </span>
                      <span className="block text-[10px] text-[#827470]">Showcases this product in the homepage "Featured Collection" section for premium visibility.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group pt-2 border-t border-[#d3c3be]/30">
                    <input 
                      type="checkbox"
                      checked={form.isBestSeller}
                      onChange={e => setForm({...form, isBestSeller: e.target.checked})}
                      className="mt-1 h-4 w-4 rounded border-[#d3c3be] text-[#825425] focus:ring-[#825425] cursor-pointer"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-[#090100] group-hover:text-[#825425] transition-colors">Mark as Best Seller</span>
                      <span className="block text-[10px] text-[#827470]">Applies a "★ Best Seller" badge on the shop storefront.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group pt-2 border-t border-[#d3c3be]/30">
                    <input 
                      type="checkbox"
                      checked={form.isLowStock}
                      onChange={e => setForm({...form, isLowStock: e.target.checked})}
                      className="mt-1 h-4 w-4 rounded border-[#d3c3be] text-[#825425] focus:ring-[#825425] cursor-pointer"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-[#090100] group-hover:text-[#825425] transition-colors">Mark as Low Stock</span>
                      <span className="block text-[10px] text-[#827470]">Applies an "Only 3 Left" urgency badge to prompt purchases.</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group pt-2 border-t border-[#d3c3be]/30">
                    <input 
                      type="checkbox"
                      checked={form.customizable}
                      onChange={e => setForm({...form, customizable: e.target.checked})}
                      className="mt-1 h-4 w-4 rounded border-[#d3c3be] text-[#825425] focus:ring-[#825425] cursor-pointer"
                    />
                    <div>
                      <span className="block text-xs font-semibold text-[#090100] group-hover:text-[#825425] transition-colors flex items-center gap-1.5">
                        <PenTool className="w-3.5 h-3.5 text-[#825425]" />
                        Bespoke Customizable
                      </span>
                      <span className="block text-[10px] text-[#827470]">Enables the "Personalize" option for monograms and custom finishes.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Danger zone / archive */}
              {!isNew && (
                <div className="p-4 border border-red-200 bg-red-50/50 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wide">Danger Zone</h4>
                  <p className="text-[10px] text-red-600">Archiving will remove this item from client browsing but preserve purchase histories.</p>
                  <button
                    type="button"
                    onClick={() => handleDelete(product?._id)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-red-200 text-xs font-semibold rounded bg-white text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Archive Product Entry
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // VIEW 2: PRODUCTS TABLE INSIDE A SELECTED CATEGORY
  // ────────────────────────────────────────────────────────────────────────
  if (selectedCategory) {
    const categoryTitle = selectedCategory === 'All' ? 'All Collection Masterpieces' : `${selectedCategory} Collection`;
    
    // Filter active products in category
    const filteredProducts = products.filter(p => {
      const pCat = (p.category || '').trim().toLowerCase();
      const targetCat = selectedCategory.trim().toLowerCase();
      const matchCat = selectedCategory === 'All' || pCat === targetCat;
      
      const searchLower = searchTerm.trim().toLowerCase();
      const matchSearch = !searchLower || 
        (p.name && p.name.toLowerCase().includes(searchLower)) ||
        (p.slug && p.slug.toLowerCase().includes(searchLower)) ||
        (p._id && p._id.toLowerCase().includes(searchLower)) ||
        (p.category && p.category.toLowerCase().includes(searchLower));

      return matchCat && matchSearch && p.status !== 'archived';
    });

    return (
      <div className="space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCategoryParam(null)}
              className="p-2 hover:bg-white rounded-lg border border-[#d3c3be]/40 bg-[#fbf9f4] transition-colors text-[#504440]"
              title="Return to Catalog Categories"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold font-display text-[#090100]">{categoryTitle}</h2>
              <p className="text-xs text-[#827470]">
                Currently viewing {filteredProducts.length} masterpieces.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#827470]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-[#d3c3be]/60 rounded-lg bg-white focus:outline-none focus:border-[#825425] text-xs w-52 sm:w-64"
              />
            </div>
            
            <button 
              onClick={() => setEditParam('new')}
              className="flex items-center gap-2 bg-[#090100] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#1b1c19] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-xl shadow-sm border border-[#d3c3be]/40 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f0eee9] text-[#504440] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4 font-semibold">Masterpiece</th>
                {selectedCategory === 'All' && <th className="px-6 py-4 font-semibold">Category</th>}
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock Availability</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d3c3be]/40">
              {filteredProducts.map(p => (
                <tr key={p._id} className="hover:bg-[#fbf9f4]">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-[#f5f3ee] border border-[#d3c3be]/20 overflow-hidden flex items-center justify-center flex-shrink-0">
                      {p.images && p.images.length > 0 ? (
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-[#827470]" />
                      )}
                    </div>
                     <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-[#1b1c19]">{p.name}</p>
                        {p.isFeatured && (
                          <span className="bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5" /> Featured
                          </span>
                        )}
                        {p.isBestSeller && (
                          <span className="bg-[#825425] text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                            Best Seller
                          </span>
                        )}
                        {p.isLowStock && (
                          <span className="bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                            Low Stock
                          </span>
                        )}
                      </div>
                      <p className="text-[#827470] text-xs font-mono">{p._id.slice(-8).toUpperCase()}</p>
                    </div>
                  </td>
                  {selectedCategory === 'All' && (
                    <td className="px-6 py-4 text-xs font-medium text-[#827470]">{p.category}</td>
                  )}
                  <td className="px-6 py-4 font-semibold">₹{p.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      p.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {p.stock > 0 ? `${p.stock} Available` : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setEditParam(p._id)} 
                      className="text-[#825425] hover:text-[#090100] hover:bg-[#825425]/10 p-2 rounded-lg transition-all"
                      title="Edit Product Details"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(p._id)} 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all ml-1.5"
                      title="Archive Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={selectedCategory === 'All' ? 5 : 4} className="px-6 py-16 text-center text-[#827470]">
                    <Search className="w-12 h-12 text-[#d3c3be] mx-auto mb-4" />
                    <p className="font-medium text-[#1b1c19]">No products found matching filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // VIEW 3: CATEGORY SELECTION MENU (DEFAULT SCREEN)
  // ────────────────────────────────────────────────────────────────────────
  const dbCustomCategories = products
    .map(p => p.category?.trim())
    .filter(Boolean)
    .filter((cat, idx, arr) => arr.findIndex(c => c.toLowerCase() === cat.toLowerCase()) === idx)
    .filter(cat => !CATEGORIES.some(c => c.toLowerCase() === cat.toLowerCase()));

  const allCategoriesToDisplay = [...CATEGORIES, ...dbCustomCategories];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-display text-[#090100]">Atelier Product Catalog</h2>
          <p className="text-xs text-[#827470]">Select a collection category below to manage details, pricing, and stock.</p>
        </div>
        <button 
          onClick={() => setCategoryParam('All')} 
          className="bg-[#090100] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#1b1c19] transition-colors"
        >
          View All Products ({products.filter(p => p.status !== 'archived').length})
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category Cards */}
        {allCategoriesToDisplay.map(cat => (
          <button 
            key={cat}
            onClick={() => setCategoryParam(cat)} 
            className="bg-white p-6 rounded-xl border border-[#d3c3be]/40 hover:border-[#825425] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer h-40"
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-10 h-10 rounded-lg bg-[#fbf9f4] group-hover:bg-[#825425]/10 flex items-center justify-center transition-colors">
                {getCategoryIcon(cat)}
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#827470] group-hover:text-[#825425] group-hover:translate-x-1 transition-all">
                View catalog →
              </span>
            </div>
            <div>
              <h4 className="font-display font-bold text-[#090100] text-base group-hover:text-[#825425] transition-colors">{cat}</h4>
              <p className="text-xs text-[#827470] mt-1">{getCategoryCount(cat)} Products listed</p>
            </div>
          </button>
        ))}

        {/* View All Masterpieces Card */}
        <button 
          onClick={() => setCategoryParam('All')} 
          className="bg-white p-6 rounded-xl border border-[#d3c3be]/40 hover:border-[#825425] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer h-40"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-lg bg-[#fbf9f4] group-hover:bg-[#825425]/10 flex items-center justify-center transition-colors">
              <Grid className="w-5 h-5 text-[#825425]" />
            </div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#827470] group-hover:text-[#825425] group-hover:translate-x-1 transition-all">
              View catalog →
            </span>
          </div>
          <div>
            <h4 className="font-display font-bold text-[#090100] text-base group-hover:text-[#825425] transition-colors">All Products</h4>
            <p className="text-xs text-[#827470] mt-1">{products.filter(p => p.status !== 'archived').length} Products listed</p>
          </div>
        </button>

        {/* Add New Masterpiece Card */}
        <button 
          onClick={() => setEditParam('new')} 
          className="bg-[#825425]/5 p-6 rounded-xl border-2 border-dashed border-[#825425]/20 hover:border-[#825425] hover:bg-[#825425]/10 hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer h-40"
        >
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <Plus className="w-5 h-5 text-[#825425]" />
          </div>
          <div>
            <h4 className="font-display font-bold text-[#825425] text-base">Add New Product</h4>
            <p className="text-xs text-[#827470] mt-1">Create a new premium masterpiece item.</p>
          </div>
        </button>
      </div>
    </div>
  );
};
