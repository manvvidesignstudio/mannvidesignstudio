import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, CheckCircle2, Images } from 'lucide-react';
import { getGallery, saveGalleryItem, deleteGalleryItem } from '../../lib/cmsStore';
import { GalleryItem } from '../../types/database';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const GalleryManager: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const data = await getGallery();
    setItems(data || []);
  };

  const handleNew = () => {
    setEditingItem({
      title: '',
      image_url: '',
      category: 'Detail',
      caption: '',
      display_order: items.length + 1,
      published: true,
    });
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem({ ...item });
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete image "${title}"?`)) {
      await deleteGalleryItem(id);
      showNotify('Image deleted from visual journal.');
      loadGallery();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.image_url) {
      alert('Please upload or provide an image.');
      return;
    }

    setSaving(true);
    try {
      await saveGalleryItem(editingItem);
      showNotify('Gallery item saved.');
      setEditingItem(null);
      loadGallery();
    } catch (err) {
      console.error('Failed saving gallery item', err);
    } finally {
      setSaving(false);
    }
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Visual Journal & Gallery CMS</h2>
          <p className="text-xs text-neutral-500 mt-1">Upload and categorize tactile detail images, materials, and light studies.</p>
        </div>

        <button
          onClick={handleNew}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Image</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Editor Modal */}
      {editingItem && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="text-lg font-serif text-neutral-900">
              {editingItem.id ? 'Edit Image Meta' : 'Upload Visual Journal Image'}
            </h3>
            <button onClick={() => setEditingItem(null)} className="text-neutral-400 hover:text-neutral-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 uppercase">Title / Focal Subject *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Travertine Junction Detail"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 uppercase">Category Tag</label>
                <select
                  value={editingItem.category || 'Detail'}
                  onChange={(e) => setEditingItem((p) => ({ ...p, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
                >
                  <option value="Detail">Detail</option>
                  <option value="Light">Light & Shadow</option>
                  <option value="Object">Object & Millwork</option>
                  <option value="Material">Material & Texture</option>
                  <option value="Courtyard">Courtyard & Landscape</option>
                  <option value="Architecture">Architecture</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Caption / Note</label>
              <input
                type="text"
                value={editingItem.caption || ''}
                onChange={(e) => setEditingItem((p) => ({ ...p, caption: e.target.value }))}
                placeholder="Mitred stone edges meeting flush European oak millwork..."
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
              />
            </div>

            <div className="pt-2">
              <ImageUploader
                value={editingItem.image_url || ''}
                onChange={(url) => setEditingItem((p) => ({ ...p, image_url: url }))}
                bucket="gallery-images"
                label="Journal Photograph *"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-medium text-neutral-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 px-6 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium uppercase tracking-wider"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Gallery Image'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm group">
            <div className="aspect-square bg-neutral-100 relative overflow-hidden">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-neutral-900/80 text-[10px] text-white rounded uppercase tracking-wider">
                {item.category}
              </div>
            </div>

            <div className="p-3 space-y-1">
              <h4 className="text-xs font-semibold text-neutral-900 truncate">{item.title}</h4>
              <p className="text-[10px] text-neutral-500 line-clamp-1">{item.caption || 'No caption'}</p>

              <div className="pt-2 flex items-center justify-end space-x-2 border-t border-neutral-100">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1 text-neutral-400 hover:text-neutral-900"
                  title="Edit"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1 text-neutral-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
