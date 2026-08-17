import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, X, Upload } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const AdminProductsTab: React.FC = () => {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: 'Bespoke Objects',
    stock: '',
    images: [] as string[]
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setEditingId(product._id);
      setForm({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        images: product.images || []
      });
    } else {
      setEditingId(null);
      setForm({ name: '', slug: '', description: '', price: '', category: 'Bespoke Objects', stock: '', images: [] });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
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
      const url = editingId ? `http://localhost:5000/api/products/${editingId}` : 'http://localhost:5000/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingImages(true);
    const newImageUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      await new Promise<void>((resolve) => {
        reader.onload = async (event) => {
          const base64 = event.target?.result as string;
          try {
            const res = await fetch('http://localhost:5000/api/products/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
              },
              body: JSON.stringify({ image: base64 })
            });
            if (res.ok) {
              const data = await res.json();
              newImageUrls.push(data.url);
            }
          } catch (err) {
            console.error('Upload failed', err);
          }
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    setForm(prev => ({ ...prev, images: [...prev.images, ...newImageUrls] }));
    setUploadingImages(false);
  };

  const removeImage = (index: number) => {
    setForm(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold font-display text-[#090100]">Inventory & Catalog</h2>
          <p className="text-xs text-[#827470]">Manage your fine leather goods and objects.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#090100] text-white px-4 py-2 rounded text-sm hover:bg-[#1b1c19] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading catalog...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#d3c3be]/40 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f0eee9] text-[#504440] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d3c3be]/40">
              {products.map(p => (
                <tr key={p._id} className="hover:bg-[#fbf9f4]">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#f0eee9] overflow-hidden flex items-center justify-center">
                      {p.images && p.images.length > 0 ? (
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-[#827470]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[#1b1c19]">{p.name}</p>
                      <p className="text-[#827470] text-xs">{p.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#827470]">{p.category}</td>
                  <td className="px-6 py-4 font-medium">₹{p.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${p.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleOpenModal(p)} className="text-[#825425] hover:text-[#090100] p-2 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 p-2 transition-colors ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#827470]">
                    No products found. Start adding your collection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[#d3c3be]/40 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold font-display">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#827470] hover:text-[#090100]">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#504440] mb-1">Product Name</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full border border-[#d3c3be] px-3 py-2 rounded focus:outline-none focus:border-[#825425]" placeholder="e.g. The Heritage Briefcase" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#504440] mb-1">Slug URL</label>
                  <input required type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full border border-[#d3c3be] px-3 py-2 rounded focus:outline-none focus:border-[#825425]" placeholder="e.g. the-heritage-briefcase" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#504440] mb-1">Price (₹)</label>
                  <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full border border-[#d3c3be] px-3 py-2 rounded focus:outline-none focus:border-[#825425]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#504440] mb-1">Stock Quantity</label>
                  <input required type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full border border-[#d3c3be] px-3 py-2 rounded focus:outline-none focus:border-[#825425]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#504440] mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-[#d3c3be] px-3 py-2 rounded focus:outline-none focus:border-[#825425]">
                    <option>Bespoke Objects</option>
                    <option>Fine Handbags</option>
                    <option>Executive Briefcases</option>
                    <option>Wallets & Cardholders</option>
                    <option>Atelier Specials</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#504440] mb-1">Description</label>
                  <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} className="w-full border border-[#d3c3be] px-3 py-2 rounded focus:outline-none focus:border-[#825425]"></textarea>
                </div>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-[#504440] mb-2">Product Images</label>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative w-24 h-24 border border-[#d3c3be] rounded overflow-hidden">
                      <img src={img} alt="Product" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  <label className="w-24 h-24 border-2 border-dashed border-[#d3c3be] rounded flex flex-col items-center justify-center text-[#827470] hover:border-[#825425] hover:text-[#825425] cursor-pointer transition-colors">
                    {uploadingImages ? (
                      <span className="text-xs">Uploading...</span>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-medium uppercase text-center px-1">Add Photo</span>
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImages} />
                      </>
                    )}
                  </label>
                </div>
                <p className="text-xs text-[#827470]">You can select multiple photos at once. Supported formats: JPG, PNG, WEBP.</p>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-[#d3c3be]/40">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-[#d3c3be] rounded text-[#504440] hover:bg-[#f0eee9]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#090100] text-white rounded hover:bg-[#1b1c19]">
                  {editingId ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
