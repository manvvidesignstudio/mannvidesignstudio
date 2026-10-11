import React, { useState } from 'react';
import { Upload, X, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImageToStorage } from '../../lib/storage';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  label?: string;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  bucket = 'project-images',
  label = 'Upload Image',
  className = '',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const publicUrl = await uploadImageToStorage(file, bucket);
      onChange(publicUrl);
    } catch (err: any) {
      console.error('Upload failed', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">{label}</label>}

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100 max-w-md aspect-[16/10]">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
            <label className="cursor-pointer px-3 py-1.5 bg-white text-neutral-900 text-xs font-medium rounded shadow hover:bg-neutral-100">
              Change
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 bg-red-600 text-white rounded shadow hover:bg-red-700"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="border-2 border-dashed border-neutral-300 hover:border-neutral-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors max-w-md">
          {uploading ? (
            <div className="flex flex-col items-center space-y-2 text-neutral-600">
              <Loader2 className="w-8 h-8 animate-spin text-[#C8A97E]" />
              <span className="text-xs font-medium">Uploading to storage...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 text-neutral-500 text-center">
              <Upload className="w-8 h-8 text-neutral-400" />
              <span className="text-xs font-medium text-neutral-700">Click to upload or drag & drop</span>
              <span className="text-[10px] text-neutral-400">JPG, PNG, WebP up to 10MB</span>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
        </label>
      )}

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};
