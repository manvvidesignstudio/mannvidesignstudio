import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { getProjects, saveProject } from '../../lib/cmsStore';
import { Project } from '../../types/database';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const ProjectEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [form, setForm] = useState<Partial<Project>>({
    title: '',
    slug: '',
    location: 'Mumbai, Maharashtra',
    year: '2026',
    category: 'Residential',
    short_description: '',
    description: '',
    concept: '',
    material_palette: ['Italian Travertine', 'Smoked Oak', 'Brushed Brass'],
    cover_image: '',
    gallery_images: [],
    before_image: '',
    after_image: '',
    project_specs: {
      area: '4,500 sq.ft',
      scope: 'Full Interior Architecture',
      timeline: '12 Months',
      client: 'Private Commission',
    },
    featured: false,
    published: true,
    display_order: 1,
  });

  const [saving, setSaving] = useState(false);
  const [newMaterial, setNewMaterial] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!isNew && id) {
      getProjects().then((list) => {
        const found = list.find((p) => p.id === id);
        if (found) {
          setForm(found);
        }
      });
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSpecChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      project_specs: { ...prev.project_specs, [key]: value },
    }));
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleVal = e.target.value;
    setForm((prev) => {
      const generatedSlug = isNew
        ? titleVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        : prev.slug;
      return { ...prev, title: titleVal, slug: generatedSlug || prev.slug };
    });
  };

  // Material Palette Management
  const addMaterial = () => {
    if (newMaterial.trim()) {
      setForm((prev) => ({
        ...prev,
        material_palette: [...(prev.material_palette || []), newMaterial.trim()],
      }));
      setNewMaterial('');
    }
  };

  const removeMaterial = (index: number) => {
    setForm((prev) => ({
      ...prev,
      material_palette: prev.material_palette?.filter((_, i) => i !== index),
    }));
  };

  // Gallery Management
  const addGalleryImage = (url: string) => {
    if (url) {
      setForm((prev) => ({
        ...prev,
        gallery_images: [...(prev.gallery_images || []), url],
      }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.cover_image) {
      alert('Please provide a Title, Slug, and Cover Image.');
      return;
    }

    setSaving(true);
    try {
      await saveProject(form);
      setNotification('Project saved successfully!');
      setTimeout(() => {
        navigate('/admin/projects');
      }, 1000);
    } catch (err) {
      console.error('Failed saving project', err);
      alert('Error saving project.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans max-w-4xl pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/projects"
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-xl font-serif text-neutral-900">
              {isNew ? 'New Architectural Project' : `Edit: ${form.title}`}
            </h2>
            <p className="text-xs text-neutral-500">Configure project details, imagery, and materials.</p>
          </div>
        </div>

        {notification && (
          <div className="flex items-center space-x-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm">
        {/* Core Metadata */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Project Identity</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={handleTitleChange}
                placeholder="e.g. The Courtyard Residence"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="the-courtyard-residence"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Hospitality">Hospitality</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Bandra West, Mumbai"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
                Year Completed
              </label>
              <input
                type="text"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2026"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Editorial Narrative</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Short Description (Card Teaser)
            </label>
            <input
              type="text"
              name="short_description"
              value={form.short_description}
              onChange={handleChange}
              placeholder="A monolithic private villa woven around a central open-sky verdant courtyard..."
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Full Project Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Detailed architectural context, zoning, daylight studies, and lifestyle ritual..."
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
              Design Concept & Thesis Statement
            </label>
            <input
              type="text"
              name="concept"
              value={form.concept}
              onChange={handleChange}
              placeholder="e.g. A contemplative dialogue between raw earth and refined geometry."
              className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Cover Photography *</h3>
          <ImageUploader
            value={form.cover_image || ''}
            onChange={(url) => setForm((prev) => ({ ...prev, cover_image: url }))}
            bucket="project-images"
            label="Upload High-Resolution Cover Image"
          />
        </div>

        {/* Multi-Image Gallery */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Project Gallery ({form.gallery_images?.length || 0} Images)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {form.gallery_images?.map((imgUrl, i) => (
              <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-neutral-200 group">
                <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2">
              Add Image to Gallery
            </label>
            <ImageUploader
              value=""
              onChange={addGalleryImage}
              bucket="project-images"
              label="Click to upload another gallery image"
            />
          </div>
        </div>

        {/* Material Palette */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Material Composition</h3>

          <div className="flex flex-wrap gap-2">
            {form.material_palette?.map((mat, i) => (
              <span
                key={i}
                className="inline-flex items-center space-x-1.5 px-3 py-1 bg-neutral-100 text-neutral-800 rounded text-xs font-medium"
              >
                <span>{mat}</span>
                <button
                  type="button"
                  onClick={() => removeMaterial(i)}
                  className="text-neutral-400 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
              placeholder="e.g. Fluted Teak Joinery"
              className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded text-xs text-neutral-900"
            />
            <button
              type="button"
              onClick={addMaterial}
              className="px-3 py-1.5 bg-neutral-900 text-white text-xs rounded hover:bg-neutral-800"
            >
              Add Material
            </button>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Spatial Specifications</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-600">Built-up Area</label>
              <input
                type="text"
                value={form.project_specs?.area || ''}
                onChange={(e) => handleSpecChange('area', e.target.value)}
                placeholder="4,800 sq.ft"
                className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded text-xs text-neutral-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-neutral-600">Architectural Scope</label>
              <input
                type="text"
                value={form.project_specs?.scope || ''}
                onChange={(e) => handleSpecChange('scope', e.target.value)}
                placeholder="Full Interior Architecture"
                className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded text-xs text-neutral-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-neutral-600">Execution Timeline</label>
              <input
                type="text"
                value={form.project_specs?.timeline || ''}
                onChange={(e) => handleSpecChange('timeline', e.target.value)}
                placeholder="14 Months"
                className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded text-xs text-neutral-900"
              />
            </div>
          </div>
        </div>

        {/* Publication Flags */}
        <div className="pt-6 border-t border-neutral-200 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="rounded border-neutral-300 text-neutral-900 focus:ring-[#C8A97E]"
              />
              <span className="text-xs font-medium text-neutral-800">Publish to Live Portfolio</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="rounded border-neutral-300 text-neutral-900 focus:ring-[#C8A97E]"
              />
              <span className="text-xs font-medium text-neutral-800">Feature on Homepage</span>
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium uppercase tracking-wider shadow disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Project'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
