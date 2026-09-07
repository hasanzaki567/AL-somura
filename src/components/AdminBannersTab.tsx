import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Image as ImageIcon, X, Upload, 
  ArrowLeft, ArrowUp, ArrowDown, GripVertical
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { API_URL } from '../config';
import { Banner } from '../types';

export const AdminBannersTab: React.FC = () => {
  const { user } = useAuthStore();

  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Edit/Create form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    tag: ''
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch(`${API_URL}/api/banners?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setBanners(data);
      }
    } catch (err) {
      console.error('Failed to fetch banners:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId('new');
    setForm({ title: '', subtitle: '', description: '', image: '', tag: '' });
  };

  const handleEdit = (banner: Banner) => {
    setEditingId(banner._id);
    setForm({
      title: banner.title,
      subtitle: banner.subtitle,
      description: banner.description,
      image: banner.image,
      tag: banner.tag
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: '', subtitle: '', description: '', image: '', tag: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = editingId && editingId !== 'new';
      const url = isEdit ? `${API_URL}/api/banners/${editingId}` : `${API_URL}/api/banners`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setEditingId(null);
        setForm({ title: '', subtitle: '', description: '', image: '', tag: '' });
        fetchBanners();
      } else {
        const err = await res.json();
        alert(err.message || 'Error saving banner');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    try {
      const res = await fetch(`${API_URL}/api/banners/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        fetchBanners();
      } else {
        alert('Failed to delete banner');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const sorted = [...banners].sort((a, b) => a.order - b.order);
    const temp = sorted[index].order;
    sorted[index] = { ...sorted[index], order: sorted[index - 1].order };
    sorted[index - 1] = { ...sorted[index - 1], order: temp };
    await reorderBanners(sorted);
  };

  const handleMoveDown = async (index: number) => {
    const sorted = [...banners].sort((a, b) => a.order - b.order);
    if (index === sorted.length - 1) return;
    const temp = sorted[index].order;
    sorted[index] = { ...sorted[index], order: sorted[index + 1].order };
    sorted[index + 1] = { ...sorted[index + 1], order: temp };
    await reorderBanners(sorted);
  };

  const reorderBanners = async (sorted: Banner[]) => {
    const orderUpdates = sorted.map((b, i) => ({ _id: b._id, order: i + 1 }));
    setBanners(sorted.map((b, i) => ({ ...b, order: i + 1 })));
    try {
      const res = await fetch(`${API_URL}/api/banners/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({ orderUpdates })
      });
      if (!res.ok) {
        fetchBanners();
      }
    } catch (err) {
      console.error(err);
      fetchBanners();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const file = files[0];

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        try {
          const res = await fetch(`${API_URL}/api/banners/upload`, {
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
          if (res.ok && data.url) {
            setForm(prev => ({ ...prev, image: data.url }));
          } else {
            alert(`Failed to upload image: ${data.message || 'Unknown error'}`);
          }
        } catch (err: any) {
          alert(`Error uploading image: ${err.message || 'Network error'}`);
        }
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingImage(false);
    }
    e.target.value = '';
  };

  if (loading) {
    return <div className="p-8 text-center text-[#827470]">Loading banners...</div>;
  }

  // ────────────────────────────────────────────────────────────────────────
  // VIEW: BANNER EDITING / CREATION FORM
  // ────────────────────────────────────────────────────────────────────────
  if (editingId) {
    const isNew = editingId === 'new';

    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#d3c3be]/40 overflow-hidden">
        <div className="p-6 border-b border-[#d3c3be]/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 hover:bg-[#f0eee9] rounded-lg transition-colors text-[#504440]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold font-display text-[#090100]">
                {isNew ? 'Add New Banner' : 'Edit Banner'}
              </h2>
              <p className="text-xs text-[#827470]">
                {isNew ? 'Upload and configure a new hero banner.' : 'Update banner details and image.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-[#d3c3be] rounded text-sm text-[#504440] hover:bg-[#f0eee9]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-[#090100] text-white rounded text-sm hover:bg-[#1b1c19] font-medium shadow-sm transition-colors"
            >
              {isNew ? 'Create Banner' : 'Save Changes'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Image Upload */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#fbf9f4] p-6 rounded-xl border border-[#d3c3be]/40 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-bold text-sm text-[#090100] uppercase tracking-wider">Banner Image</h3>
                    <p className="text-[10px] text-[#827470] mt-0.5">High-resolution hero banner image.</p>
                  </div>
                  <label className={`cursor-pointer text-xs font-semibold text-[#825425] hover:text-[#090100] hover:bg-[#825425]/10 transition-all flex items-center gap-1.5 bg-[#825425]/5 px-3 py-1.5 rounded-lg border border-[#825425]/20 ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploadingImage ? (
                      <>
                        <div className="w-3 h-3 border-2 border-[#825425] border-t-transparent rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </>
                    )}
                  </label>
                </div>

                {form.image ? (
                  <div className="relative w-full h-[300px] md:h-[400px] border border-[#d3c3be]/60 rounded-xl overflow-hidden bg-white flex items-center justify-center group shadow-sm">
                    <img
                      src={form.image}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, image: '' }))}
                      className="absolute top-4 right-4 bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className={`border border-dashed border-[#d3c3be] hover:border-[#825425] hover:bg-[#825425]/5 rounded-xl p-12 flex flex-col items-center justify-center text-[#827470] cursor-pointer transition-colors min-h-[250px] bg-white/50 ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#825425] border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-semibold">Uploading banner image...</span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-12 h-12 text-[#d3c3be] mb-3" />
                        <span className="text-sm font-semibold mb-1 text-[#090100]">No image uploaded</span>
                        <span className="text-xs text-[#827470] text-center max-w-sm">Click "Upload Image" to add a banner image.</span>
                      </>
                    )}
                  </label>
                )}
              </div>

              {/* Banner Text Content */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#504440] mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-[#d3c3be] px-4 py-2.5 rounded focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] text-sm"
                    placeholder="e.g. Elite Craftsmanship, Timeless Style."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#504440] mb-1">Subtitle</label>
                  <input
                    required
                    type="text"
                    value={form.subtitle}
                    onChange={e => setForm({ ...form, subtitle: e.target.value })}
                    className="w-full border border-[#d3c3be] px-4 py-2.5 rounded focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] text-sm"
                    placeholder="e.g. MAISON DE CUIR — SINCE 1984"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#504440] mb-1">Description</label>
                  <textarea
                    required
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full border border-[#d3c3be] px-4 py-3 rounded focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] text-sm"
                    placeholder="Describe this banner slide..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#504440] mb-1">Tag</label>
                  <input
                    required
                    type="text"
                    value={form.tag}
                    onChange={e => setForm({ ...form, tag: e.target.value })}
                    className="w-full border border-[#d3c3be] px-4 py-2.5 rounded focus:outline-none focus:border-[#825425] focus:ring-1 focus:ring-[#825425] text-sm"
                    placeholder="e.g. Luxury Leather Jackets"
                  />
                </div>
              </div>
            </div>

            {/* Right — Preview */}
            <div className="space-y-6">
              <div className="bg-[#fbf9f4] p-5 rounded-xl border border-[#d3c3be]/40 space-y-4">
                <h3 className="font-display font-bold text-sm text-[#090100] uppercase tracking-wider">Slide Preview</h3>
                {form.image ? (
                  <div className="relative rounded-xl overflow-hidden h-[160px] bg-[#090100]">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#090100] via-[#090100]/80 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      {form.subtitle && (
                        <span className="text-[8px] font-semibold text-[#fdc087] uppercase tracking-widest mb-1">
                          {form.subtitle}
                        </span>
                      )}
                      <h4 className="text-white font-display font-bold text-xs leading-tight line-clamp-2">
                        {form.title || 'Banner Title'}
                      </h4>
                    </div>
                  </div>
                ) : (
                  <div className="h-[160px] bg-[#d3c3be]/20 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-[#d3c3be]" />
                  </div>
                )}
                {form.tag && (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#825425] bg-[#825425]/10 px-2 py-0.5 rounded-full inline-block">
                    {form.tag}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // VIEW: BANNER LIST
  // ────────────────────────────────────────────────────────────────────────
  const sorted = [...banners].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-[#090100]">Hero Banner Slides</h2>
          <p className="text-xs text-[#827470]">
            Manage the homepage hero carousel banners. Use the arrows to reorder slides.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-[#090100] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#1b1c19] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-[#d3c3be]/40 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-[#d3c3be] mx-auto mb-4" />
          <p className="font-medium text-[#1b1c19]">No banners yet.</p>
          <p className="text-xs text-[#827470] mt-1">Click "Add Banner" to create your first hero slide.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#d3c3be]/40 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f0eee9] text-[#504440] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4 font-semibold w-12">#</th>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Tag</th>
                <th className="px-6 py-4 font-semibold text-right">Order</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d3c3be]/40">
              {sorted.map((banner, index) => (
                <tr key={banner._id} className="hover:bg-[#fbf9f4]">
                  <td className="px-6 py-4 text-[#827470] font-mono text-xs font-bold">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24 h-14 rounded-lg overflow-hidden border border-[#d3c3be]/20 bg-[#f5f3ee] flex-shrink-0">
                      {banner.image ? (
                        <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-[#d3c3be]" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#1b1c19] line-clamp-1">{banner.title}</p>
                    <p className="text-[#827470] text-xs line-clamp-1">{banner.subtitle}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-[#825425]/10 text-[#825425] text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {banner.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className={`p-1.5 rounded transition-colors ${
                          index === 0
                            ? 'text-[#d3c3be] cursor-not-allowed'
                            : 'text-[#827470] hover:bg-[#f0eee9] hover:text-[#825425] cursor-pointer'
                        }`}
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === sorted.length - 1}
                        className={`p-1.5 rounded transition-colors ${
                          index === sorted.length - 1
                            ? 'text-[#d3c3be] cursor-not-allowed'
                            : 'text-[#827470] hover:bg-[#f0eee9] hover:text-[#825425] cursor-pointer'
                        }`}
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="text-[#825425] hover:text-[#090100] hover:bg-[#825425]/10 p-2 rounded-lg transition-all"
                      title="Edit Banner"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all ml-1.5"
                      title="Delete Banner"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
