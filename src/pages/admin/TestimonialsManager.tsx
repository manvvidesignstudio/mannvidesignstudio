import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, CheckCircle2, MessageSquareQuote } from 'lucide-react';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '../../lib/cmsStore';
import { Testimonial } from '../../types/database';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const data = await getTestimonials();
    setTestimonials(data || []);
  };

  const handleEdit = (t: Testimonial) => {
    setEditing({ ...t });
  };

  const handleNew = () => {
    setEditing({
      client_name: '',
      client_role: 'Homeowner',
      project_title: 'Mumbai Residence',
      testimonial: '',
      image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      published: true,
      display_order: testimonials.length + 1,
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete review from "${name}"?`)) {
      await deleteTestimonial(id);
      showNotify(`Testimonial removed.`);
      loadTestimonials();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.client_name || !editing?.testimonial) return;

    setSaving(true);
    try {
      await saveTestimonial(editing);
      showNotify('Testimonial saved.');
      setEditing(null);
      loadTestimonials();
    } catch (err) {
      console.error('Failed saving testimonial', err);
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
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Testimonials & Client Words CMS</h2>
          <p className="text-xs text-neutral-500 mt-1">Manage private client reviews and homeowner feedback.</p>
        </div>

        <button
          onClick={handleNew}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Editor Modal */}
      {editing && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="text-lg font-serif text-neutral-900">
              {editing.id ? `Edit: ${editing.client_name}` : 'Add New Client Testimonial'}
            </h3>
            <button onClick={() => setEditing(null)} className="text-neutral-400 hover:text-neutral-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 uppercase">Client Name *</label>
                <input
                  type="text"
                  required
                  value={editing.client_name || ''}
                  onChange={(e) => setEditing((p) => ({ ...p, client_name: e.target.value }))}
                  placeholder="e.g. Vikram & Ananya Kulkarni"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 uppercase">Role / Profession</label>
                <input
                  type="text"
                  value={editing.client_role || ''}
                  onChange={(e) => setEditing((p) => ({ ...p, client_role: e.target.value }))}
                  placeholder="Homeowners / Industrialist"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 uppercase">Project Reference</label>
                <input
                  type="text"
                  value={editing.project_title || ''}
                  onChange={(e) => setEditing((p) => ({ ...p, project_title: e.target.value }))}
                  placeholder="The Courtyard Residence"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Testimonial Quote *</label>
              <textarea
                rows={4}
                required
                value={editing.testimonial || ''}
                onChange={(e) => setEditing((p) => ({ ...p, testimonial: e.target.value }))}
                placeholder="Share client feedback regarding architectural design, material quality, and peace of mind..."
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900 resize-none"
              />
            </div>

            <div className="pt-2">
              <ImageUploader
                value={editing.image_url || ''}
                onChange={(url) => setEditing((p) => ({ ...p, image_url: url }))}
                bucket="testimonial-images"
                label="Client Avatar / Residence Photo"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setEditing(null)}
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
                <span>{saving ? 'Saving...' : 'Save Testimonial'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <MessageSquareQuote className="w-5 h-5 text-[#C8A97E]" />
              <p className="font-serif text-sm italic text-neutral-800 leading-relaxed">"{t.testimonial}"</p>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {t.image_url && (
                  <img src={t.image_url} alt={t.client_name} className="w-8 h-8 rounded-full object-cover" />
                )}
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900">{t.client_name}</h4>
                  <p className="text-[10px] text-neutral-500">{t.client_role} · {t.project_title}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEdit(t)}
                  className="p-1 text-neutral-400 hover:text-neutral-900"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.client_name)}
                  className="p-1 text-neutral-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
