import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '../../lib/cmsStore';
import { SiteSettings } from '../../types/database';

export const SettingsManager: React.FC = () => {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getSiteSettings().then((data) => {
      setForm(data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => (prev ? { ...prev, [e.target.name]: e.target.value } : prev));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (!form) return;
      await updateSiteSettings(form);
      setNotification('Studio settings saved successfully.');
      setTimeout(() => setNotification(''), 3000);
    } catch (err) {
      console.error('Failed saving settings', err);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div className="text-sm text-neutral-500">Loading settings...</div>;

  return (
    <div className="space-y-6 font-sans max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Site & Studio Settings</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Global studio coordinates, atelier address, working hours, and SEO metadata.
          </p>
        </div>

        {notification && (
          <div className="flex items-center space-x-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm">
        {/* Studio Identity */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Studio Identity</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Studio Brand Name</label>
              <input
                type="text"
                name="studio_name"
                value={form.studio_name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
              />
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Coordinates & Contact</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700 uppercase">Atelier Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Working Hours</label>
              <input
                type="text"
                name="working_hours"
                value={form.working_hours || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Instagram Profile Link</label>
              <input
                type="text"
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">LinkedIn Profile Link</label>
              <input type="url" name="linkedin" value={form.linkedin || ''} onChange={handleChange} className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Pinterest Profile Link</label>
              <input type="url" name="pinterest" value={form.pinterest || ''} onChange={handleChange} className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">WhatsApp Number</label>
              <input type="text" name="whatsapp_number" value={form.whatsapp_number} onChange={handleChange} placeholder="Country code + number, no symbols" className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700 uppercase">WhatsApp Default Message</label>
            <textarea name="whatsapp_default_message" rows={2} value={form.whatsapp_default_message} onChange={handleChange} className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900 resize-none" />
          </div>
        </div>

        {/* Location & Footer */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Location & Footer</h3>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700 uppercase">Google Maps Directions URL</label>
            <input type="url" name="google_maps_url" value={form.google_maps_url} onChange={handleChange} className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700 uppercase">Google Maps Embed URL</label>
            <input type="url" name="google_maps_embed_url" value={form.google_maps_embed_url} onChange={handleChange} className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700 uppercase">Footer Description</label>
            <textarea name="footer_description" rows={3} value={form.footer_description || ''} onChange={handleChange} className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900 resize-none" />
          </div>
        </div>

        {/* SEO Metadata */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Search Engine Optimization</h3>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700 uppercase">Page Title (Meta)</label>
            <input
              type="text"
              name="meta_title"
              value={form.meta_title || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-700 uppercase">Meta Description</label>
            <textarea
              rows={2}
              name="meta_description"
              value={form.meta_description || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-100">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium uppercase tracking-wider shadow disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
