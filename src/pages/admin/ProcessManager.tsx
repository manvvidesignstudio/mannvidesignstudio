import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, Edit3, X } from 'lucide-react';
import { getProcessSteps, saveProcessStep } from '../../lib/cmsStore';
import { ProcessStep } from '../../types/database';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const ProcessManager: React.FC = () => {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    loadSteps();
  }, []);

  const loadSteps = async () => {
    const data = await getProcessSteps();
    setSteps(data || []);
  };

  const handleEdit = (step: ProcessStep) => {
    setEditingStep({ ...step });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStep) return;

    setSaving(true);
    try {
      await saveProcessStep(editingStep);
      setNotification(`Phase ${editingStep.step_code} updated successfully.`);
      setTimeout(() => setNotification(''), 3000);
      setEditingStep(null);
      loadSteps();
    } catch (err) {
      console.error('Failed saving step', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <h2 className="text-2xl font-serif text-neutral-900 font-normal">Process Methodology CMS</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Configure the 6-stage architectural process timeline (01 Discover to 06 Reveal).
          </p>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Editor Modal */}
      {editingStep && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="text-lg font-serif text-neutral-900">
              Edit Phase {editingStep.step_code}: {editingStep.title}
            </h3>
            <button onClick={() => setEditingStep(null)} className="text-neutral-400 hover:text-neutral-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 uppercase">Phase Title *</label>
                <input
                  type="text"
                  required
                  value={editingStep.title}
                  onChange={(e) => setEditingStep((p) => (p ? { ...p, title: e.target.value } : null))}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 uppercase">Subtitle / Focus</label>
                <input
                  type="text"
                  value={editingStep.subtitle || ''}
                  onChange={(e) => setEditingStep((p) => (p ? { ...p, subtitle: e.target.value } : null))}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 uppercase">Description</label>
              <textarea
                rows={4}
                value={editingStep.description}
                onChange={(e) => setEditingStep((p) => (p ? { ...p, description: e.target.value } : null))}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-sm text-neutral-900 resize-none"
              />
            </div>

            <div className="pt-2">
              <ImageUploader
                value={editingStep.image_url}
                onChange={(url) => setEditingStep((p) => (p ? { ...p, image_url: url } : null))}
                bucket="project-images"
                label="Step Showcase Image"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setEditingStep(null)}
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
                <span>{saving ? 'Saving...' : 'Save Step'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((st) => (
          <div key={st.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="aspect-[16/10] bg-neutral-100 overflow-hidden relative">
              <img src={st.image_url} alt={st.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-neutral-900/80 text-white font-serif text-sm rounded">
                {st.step_code}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h4 className="font-serif text-lg text-neutral-900">{st.title}</h4>
                <p className="text-xs text-[#C8A97E] font-medium">{st.subtitle}</p>
                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed pt-1">{st.description}</p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[10px] text-neutral-400 font-mono">Step #{st.step_number}</span>
                <button
                  onClick={() => handleEdit(st)}
                  className="flex items-center space-x-1 text-xs text-neutral-700 hover:text-neutral-900 font-medium"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Phase</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
