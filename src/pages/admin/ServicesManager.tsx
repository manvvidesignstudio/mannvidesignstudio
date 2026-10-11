import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, CheckCircle2 } from 'lucide-react';
import { getServices, saveService, deleteService } from '../../lib/cmsStore';
import { Service } from '../../types/database';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const data = await getServices();
    setServices(data || []);
  };

  const handleEdit = (service: Service) => {
    setEditingService({ ...service });
  };

  const handleNew = () => {
    setEditingService({
      title: '',
      slug: '',
      tagline: '',
      description: '',
      deliverables: ['Custom Space Planning', '3D Visual Simulations'],
      process_summary: '',
      image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
      icon: 'Home',
      published: true,
      display_order: services.length + 1,
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete service "${title}"?`)) {
      await deleteService(id);
      showNotify(`Service "${title}" deleted.`);
      loadServices();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) return;

    setSaving(true);
    try {
      const slugVal =
        editingService.slug ||
        editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      await saveService({
        ...editingService,
        slug: slugVal,
      });

      showNotify('Service saved successfully!');
      setEditingService(null);
      loadServices();
    } catch (err) {
      console.error('Failed saving service', err);
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
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Services & Scope CMS</h2>
          <p className="text-xs text-neutral-500 mt-1">Manage studio design offerings, packages & deliverables.</p>
        </div>

        <button
          onClick={handleNew}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Service</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Editor Modal / Inline Form */}
      {editingService && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="text-lg font-serif text-neutral-900">
              {editingService.id ? `Edit: ${editingService.title}` : 'Add New Design Service'}
            </h3>
            <button onClick={() => setEditingService(null)} className="text-neutral-400 hover:text-neutral-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 uppercase">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Residential Interiors"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 uppercase">Tagline</label>
                <input
                  type="text"
                  value={editingService.tagline || ''}
                  onChange={(e) => setEditingService((p) => ({ ...p, tagline: e.target.value }))}
                  placeholder="Refined living spaces tailored to personal ritual"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Description</label>
              <textarea
                rows={3}
                value={editingService.description || ''}
                onChange={(e) => setEditingService((p) => ({ ...p, description: e.target.value }))}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900 resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Process Summary Quote</label>
              <input
                type="text"
                value={editingService.process_summary || ''}
                onChange={(e) => setEditingService((p) => ({ ...p, process_summary: e.target.value }))}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
              />
            </div>

            <div className="pt-2">
              <ImageUploader
                value={editingService.image_url || ''}
                onChange={(url) => setEditingService((p) => ({ ...p, image_url: url }))}
                bucket="service-images"
                label="Service Imagery"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 px-6 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium uppercase tracking-wider"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Service'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-neutral-100">
          {services.map((service, idx) => (
            <div key={service.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-neutral-50">
              <div className="flex items-center space-x-4">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-16 h-12 object-cover rounded bg-neutral-200"
                />
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">{service.title}</h4>
                  <p className="text-xs text-neutral-500 line-clamp-1">{service.tagline || service.description}</p>
                  <span className="text-[10px] text-neutral-400 font-mono">Order: {service.display_order || idx + 1}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded"
                  title="Edit Service"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id, service.title)}
                  className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
