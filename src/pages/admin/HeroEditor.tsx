import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import { getHeroContent, updateHeroContent } from '../../lib/cmsStore';
import { HeroContent } from '../../types/database';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const HeroEditor: React.FC = () => {
  const [form, setForm] = useState<HeroContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getHeroContent().then((data) => {
      setForm(data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) =>
      prev ? ({ ...prev, [e.target.name]: e.target.value } as HeroContent) : prev
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      if (!form) return;
      await updateHeroContent(form);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update hero', err);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div className="text-sm text-neutral-500">Loading content...</div>;

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Homepage Hero CMS</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Customize the full-screen visual hero, editorial typography, and call-to-actions.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center space-x-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Changes Published Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm">
        {/* Eyebrow */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
            Hero Eyebrow Text
          </label>
          <input
            type="text"
            name="eyebrow"
            value={form.eyebrow}
            onChange={handleChange}
            placeholder="MANVVI DESIGN STUDIO — MUMBAI"
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:bg-white"
          />
        </div>

        {/* Headline */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
            Main Editorial Heading
          </label>
          <textarea
            name="headline"
            rows={2}
            value={form.headline}
            onChange={handleChange}
            placeholder="Interiors built around how you actually live."
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:bg-white resize-none"
          />
        </div>

        {/* Subheadline */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
            Supporting Description Paragraph
          </label>
          <textarea
            name="subheadline"
            rows={3}
            value={form.subheadline}
            onChange={handleChange}
            placeholder="A Mumbai-based design studio shaping homes and workspaces with restraint, craft, and a point of view."
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:bg-white resize-none"
          />
        </div>

        {/* Background Image Upload & Preview */}
        <div className="space-y-3 pt-4 border-t border-neutral-100">
          <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
            Hero Background Architectural Photography
          </label>
          <ImageUploader
            value={form.background_image_url}
            onChange={(url) =>
              setForm((prev) =>
                prev ? { ...prev, background_image_url: url } : prev
              )
            }
            bucket="hero-images"
            label="Upload High-Resolution Cover Image"
          />
          <div className="text-[11px] text-neutral-400">
            Recommended dimensions: 2400 × 1600px, high quality interior architecture photography.
          </div>
        </div>

        {/* CTA 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Primary CTA Label
            </label>
            <input
              type="text"
              name="primary_cta_text"
              value={form.primary_cta_text}
              onChange={handleChange}
              placeholder="View the portfolio ↗"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Primary CTA Target Route
            </label>
            <input
              type="text"
              name="primary_cta_link"
              value={form.primary_cta_link}
              onChange={handleChange}
              placeholder="/portfolio"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
            />
          </div>
        </div>

        {/* CTA 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Secondary CTA Label
            </label>
            <input
              type="text"
              name="secondary_cta_text"
              value={form.secondary_cta_text}
              onChange={handleChange}
              placeholder="Start a conversation"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Secondary CTA Target Route
            </label>
            <input
              type="text"
              name="secondary_cta_link"
              value={form.secondary_cta_link}
              onChange={handleChange}
              placeholder="/contact"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-neutral-200 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium uppercase tracking-wider shadow transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing Changes...' : 'Save & Publish Hero'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
