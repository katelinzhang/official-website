import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import type { ContactFormData } from '../../types/product';
import { API_BASE } from '../../config';

const MAX_PHOTOS = 5;

const createSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t('contact.form_validation.name_required')),
    company: z.string().min(1, t('contact.form_validation.company_required')),
    email: z.string().email(t('contact.form_validation.email_required')),
    phone: z.string().optional(),
    productInterest: z.string().optional(),
    message: z.string().optional(),
    agreePrivacy: z.literal(true, {
      errorMap: () => ({ message: t('contact.form_validation.agree_required') }),
    }),
  });

interface InquiryFormProps {
  compact?: boolean;
  prefilledProduct?: string;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ compact = false, prefilledProduct }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const schema = createSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productInterest: prefilledProduct || '',
    },
  });

  // ── Photo handlers ──
  const processFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = MAX_PHOTOS - photos.length;
    const newFiles = Array.from(files).slice(0, remaining);

    // Validate type & size
    const valid = newFiles.filter((f) => {
      const allowed = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowed.includes(f.type)) return false;
      if (f.size > 5 * 1024 * 1024) return false;
      return true;
    });

    if (valid.length === 0) return;

    // Generate previews
    const newPreviews = valid.map((f) => URL.createObjectURL(f));
    setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    setPhotos((prev) => [...prev, ...valid]);
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photoPreviews[index]);
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  };

  // ── Submit ──
  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('company', data.company);
    formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (data.productInterest) formData.append('productInterest', data.productInterest);
    if (data.message) formData.append('message', data.message);
    photos.forEach((photo) => formData.append('photos', photo));

    try {
      const res = await fetch(`${API_BASE}/api/inquiry`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('[Inquiry] Server error:', err);
        setSubmitting(false);
        return;
      }

      // Clean up previews
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
      setSubmitted(true);
    } catch (error) {
      console.error('[Inquiry] Network error:', error);
      setSubmitting(false);
    }
  };

  // ── Submitted state ──
  if (submitted) {
    return (
      <div className="bg-brand-cream rounded-3xl p-8 text-center border border-brand-support-green/30">
        <div className="w-16 h-16 bg-brand-support-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-support-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-brand-green mb-2">{t('contact.submit_success')}</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Core 3 required fields */}
      <div className="space-y-3">
        <div>
          <input {...register('name')} className="input-glass" placeholder={t('contact.name') + ' *'} />
          {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register('company')} className="input-glass" placeholder={t('contact.company') + ' *'} />
          {errors.company && <p className="text-red-500 text-xs mt-1 ml-1">{errors.company.message}</p>}
        </div>
        <div>
          <input {...register('email')} type="email" className="input-glass" placeholder={t('contact.email') + ' *'} />
          {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Optional fields */}
      {!compact && (
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input {...register('phone')} className="input-glass" placeholder={t('contact.phone')} />
            <input {...register('productInterest')} className="input-glass" placeholder={t('contact.product_interest')} />
          </div>
          <textarea
            {...register('message')}
            rows={3}
            className="input-glass resize-none"
            placeholder={t('contact.message')}
          />
        </div>
      )}

      {/* ── Photo upload section ── */}
      <div className="pt-1">
        <label className="text-sm font-semibold text-brand-green block mb-1.5">
          {t('contact.photos_label')}
        </label>
        <p className="text-xs text-gray-500 mb-2">{t('contact.photos_hint')}</p>

        {/* Drop zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl transition-colors ${
            photos.length >= MAX_PHOTOS
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
              : 'border-brand-support-green/30 bg-brand-cream/40 hover:border-brand-support-green/60 hover:bg-brand-support-green/5 cursor-pointer'
          }`}
          onClick={() => {
            if (photos.length < MAX_PHOTOS) fileInputRef.current?.click();
          }}
        >
          {/* Hidden inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="hidden"
            onChange={(e) => processFiles(e.target.files)}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => processFiles(e.target.files)}
          />

          {/* Photo previews */}
          {photoPreviews.length > 0 ? (
            <div className="p-3">
              <div className="flex flex-wrap gap-2">
                {photoPreviews.map((preview, idx) => (
                  <div key={idx} className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden group flex-shrink-0">
                    <img
                      src={preview}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(idx);
                      }}
                      className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 hover:bg-red-500 rounded-full
                                 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                      title={t('contact.photos_remove')}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Add more button */}
                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-dashed border-gray-300
                               hover:border-brand-support-green/50 flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 px-4">
              <div className="w-10 h-10 rounded-xl bg-brand-support-green/10 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-brand-support-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                {t('contact.photos_hint')}
              </p>
            </div>
          )}
        </div>

        {/* Action buttons below drop zone */}
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            disabled={photos.length >= MAX_PHOTOS}
            onClick={() => cameraInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                       bg-brand-support-green/10 text-brand-support-green hover:bg-brand-support-green/20
                       disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            {t('contact.photos_capture')}
          </button>
          <button
            type="button"
            disabled={photos.length >= MAX_PHOTOS}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                       bg-gray-100 text-gray-600 hover:bg-gray-200
                       disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
            {t('contact.photos_upload')}
          </button>
          {photos.length > 0 && (
            <span className="ml-auto self-center text-xs text-gray-500">
              {photos.length}/{MAX_PHOTOS}
            </span>
          )}
        </div>
      </div>

      {/* Privacy + Submit */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
        <label className="flex items-center gap-2 cursor-pointer flex-1">
          <input
            {...register('agreePrivacy')}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
          />
          <span className="text-xs text-gray-500">{t('contact.agree_privacy')}</span>
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary text-sm whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              ...
            </span>
          ) : (
            t('contact.submit')
          )}
        </button>
      </div>
      {errors.agreePrivacy && <p className="text-red-500 text-xs ml-1">{errors.agreePrivacy.message}</p>}
    </form>
  );
};

export default InquiryForm;
