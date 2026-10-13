import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { getStudioContent, updateStudioContent } from '../../lib/cmsStore';
import { StudioContent, StudioStat, StudioRecognition } from '../../types/database';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const StudioEditor: React.FC = () => {
  const [form, setForm] = useState<StudioContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getStudioContent().then((data) => {
      setForm(data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) =>
      prev ? ({ ...prev, [e.target.name]: e.target.value } as StudioContent) : prev
    );
  };

  const handleStatChange = (index: number, field: keyof StudioStat, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  const addStat = () => {
    setForm((prev) => prev && ({
      ...prev,
      stats: [...prev.stats, { value: '10+', label: 'New Metric', sub: 'Supporting description' }],
    }));
  };

  const removeStat = (index: number) => {
    setForm((prev) => prev && ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  const handleRecognitionChange = (index: number, field: keyof StudioRecognition, value: string) => {
    setForm((prev) => {
      if (!prev) return prev;
      const recognitions = [...(prev.recognitions || [])];
      recognitions[index] = { ...recognitions[index], [field]: value };
      return { ...prev, recognitions };
    });
  };

  const addRecognition = () => setForm((prev) => prev && ({
    ...prev,
    recognitions: [...(prev.recognitions || []), {
      title: 'Recognition placeholder',
      issuer: 'Replace with verified award or certification',
      year: '20XX',
      description: 'Update this entry before publishing.',
    }],
  }));

  const removeRecognition = (index: number) => setForm((prev) => prev && ({
    ...prev,
    recognitions: (prev.recognitions || []).filter((_, i) => i !== index),
  }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      if (!form) return;
      await updateStudioContent(form);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update studio content', err);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div className="text-sm text-neutral-500">Loading content...</div>;

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Studio Profile CMS</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Edit studio philosophy narrative, founder quote, and metrics.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center space-x-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Studio Profile Updated</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm">
        {/* Intro Eyebrow & Heading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Intro Eyebrow
            </label>
            <input
              type="text"
              name="intro_eyebrow"
              value={form.intro_eyebrow}
              onChange={handleChange}
              placeholder="OUR APPROACH"
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Intro Heading
            </label>
            <input
              type="text"
              name="intro_heading"
              value={form.intro_heading}
              onChange={handleChange}
              placeholder="Spaces that feel considered, not decorated."
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
            />
          </div>
        </div>

        {/* Intro Body */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
            Studio Introduction Body Copy
          </label>
          <textarea
            name="intro_body"
            rows={4}
            value={form.intro_body}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 resize-none"
          />
        </div>

        {/* Founder Story */}
        <div className="pt-6 border-t border-neutral-200 space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Founder & Philosophy</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
                Founder Name
              </label>
              <input
                type="text"
                name="founder_name"
                value={form.founder_name}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
                Founder Title
              </label>
              <input
                type="text"
                name="founder_title"
                value={form.founder_title}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Founder Philosophical Quote
            </label>
            <textarea
              name="founder_quote"
              rows={2}
              value={form.founder_quote}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Studio Story Narrative
            </label>
            <textarea
              name="story_text"
              rows={4}
              value={form.story_text}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 resize-none"
            />
          </div>

          <div className="pt-2">
            <ImageUploader
              value={form.founder_image_url}
              onChange={(url) =>
                setForm((prev) => (prev ? { ...prev, founder_image_url: url } : prev))
              }
              bucket="hero-images"
              label="Founder Portrait Image"
            />
          </div>
        </div>

        {/* Second Founder */}
        <div className="pt-6 border-t border-neutral-200 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Second Founder</h3>
            <p className="text-xs text-neutral-500 mt-1">Add another founder or leadership profile to the Studio page.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">Name</label>
              <input
                type="text"
                name="second_founder_name"
                value={form.second_founder_name || ''}
                onChange={handleChange}
                placeholder="Co-founder name"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">Title</label>
              <input
                type="text"
                name="second_founder_title"
                value={form.second_founder_title || ''}
                onChange={handleChange}
                placeholder="Co-founder & Design Director"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">Quote</label>
            <textarea
              name="second_founder_quote"
              rows={2}
              value={form.second_founder_quote || ''}
              onChange={handleChange}
              placeholder="A short leadership philosophy..."
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 resize-none"
            />
          </div>

          <ImageUploader
            value={form.second_founder_image_url || ''}
            onChange={(url) =>
              setForm((prev) => (prev ? { ...prev, second_founder_image_url: url } : prev))
            }
            bucket="hero-images"
            label="Second Founder Portrait Image"
          />
        </div>

        {/* Selected Statistics */}
        <div className="pt-6 border-t border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Studio Key Metrics</h3>
            <button
              type="button"
              onClick={addStat}
              className="flex items-center space-x-1 text-xs text-[#C8A97E] hover:text-neutral-900 font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.stats.map((stat, i) => (
              <div key={i} className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 space-y-2 relative group">
                <button
                  type="button"
                  onClick={() => removeStat(i)}
                  className="absolute top-3 right-3 text-neutral-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Metric"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="text-[10px] uppercase font-semibold text-neutral-500">Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                      placeholder="15+"
                      className="w-full px-2 py-1.5 bg-white border border-neutral-300 rounded text-sm font-bold text-neutral-900"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] uppercase font-semibold text-neutral-500">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                      placeholder="Selected Projects"
                      className="w-full px-2 py-1.5 bg-white border border-neutral-300 rounded text-sm text-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold text-neutral-500">Subtitle / Context</label>
                  <input
                    type="text"
                    value={stat.sub || ''}
                    onChange={(e) => handleStatChange(i, 'sub', e.target.value)}
                    placeholder="Completed across Western India"
                    className="w-full px-2 py-1 bg-white border border-neutral-300 rounded text-xs text-neutral-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Awards & Recognition</h3>
              <p className="text-xs text-neutral-500 mt-1">Replace placeholder entries with verified credentials before publishing.</p>
            </div>
            <button type="button" onClick={addRecognition} className="flex items-center space-x-1 text-xs text-[#C8A97E] font-medium">
              <Plus className="w-3.5 h-3.5" /><span>Add Recognition</span>
            </button>
          </div>
          {(form.recognitions || []).map((item, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
              {(['title', 'issuer', 'year', 'description'] as const).map((field) => (
                <input key={field} value={item[field] || ''} onChange={(e) => handleRecognitionChange(i, field, e.target.value)} placeholder={field} className="px-2 py-1.5 bg-white border border-neutral-300 rounded text-sm text-neutral-900" />
              ))}
              <button type="button" onClick={() => removeRecognition(i)} className="text-xs text-red-600 text-left">Remove</button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-neutral-200 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium uppercase tracking-wider shadow transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Studio Content'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
