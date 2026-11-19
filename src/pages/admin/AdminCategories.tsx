import { useEffect, useState, type FormEvent } from 'react';
import { Plus, Edit3, Trash2, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import {
  adminCreateCategory,
  adminDeleteCategory,
  adminFetchAllImages,
  adminFetchCategories,
  adminUpdateCategory,
} from '../../services/schoolService';
import { slugify } from '../../lib/imageUtils';
import type { GalleryCategory, GalleryImage } from '../../types/database';
import { SEOHead } from '../../components/SEOHead';

export function AdminCategories() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [cats, imgs] = await Promise.all([adminFetchCategories(), adminFetchAllImages()]);
      setCategories(cats);
      setImages(imgs);
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setEditId(null);
    setName('');
    setSlug('');
    setDescription('');
    setFormOpen(true);
  }

  function openEdit(cat: GalleryCategory) {
    setEditId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setFormOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const finalSlug = slugify(slug || name);
    if (name.trim().length < 2 || !finalSlug) {
      setFeedback({ type: 'error', message: 'Please enter a valid category name.' });
      return;
    }

    setSaving(true);
    setFeedback(null);
    try {
      if (editId) {
        const updated = await adminUpdateCategory(editId, {
          name,
          slug: finalSlug,
          description,
        });
        setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setFeedback({ type: 'success', message: 'Category updated.' });
      } else {
        const created = await adminCreateCategory({ name, slug: finalSlug, description });
        setCategories((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
        setFeedback({ type: 'success', message: 'Category created.' });
      }
      setFormOpen(false);
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(cat: GalleryCategory) {
    if (!window.confirm(`Delete category "${cat.name}"? Images in this category will remain as Uncategorized.`)) {
      return;
    }
    try {
      await adminDeleteCategory(cat.id);
      setCategories((prev) => prev.filter((c) => c.id !== cat.id));
      setFeedback({ type: 'success', message: `Category "${cat.name}" deleted.` });
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    }
  }

  return (
    <>
      <SEOHead title="Gallery Categories" description="Manage gallery categories." />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Gallery Categories
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Organize public gallery filters for events, classrooms, sports, and celebrations.
            </p>
          </div>
          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm shadow-md"
          >
            <Plus className="w-4 h-4" />
            New Category
          </button>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between text-sm ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button type="button" onClick={() => setFeedback(null)} aria-label="Dismiss">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {formOpen && (
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-white border-2 border-sky-200 shadow-xs space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              {editId ? 'Edit Category' : 'Add New Category'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editId) setSlug(slugify(e.target.value));
                  }}
                  placeholder="e.g., Sports Day"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  placeholder="sports-day"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description for this gallery category"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#0284C7] text-white text-sm font-bold flex items-center gap-2 disabled:opacity-60"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editId ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="py-16 flex justify-center text-slate-500 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#0284C7]" />
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-5">Category</th>
                    <th className="py-3.5 px-5">Slug</th>
                    <th className="py-3.5 px-5">Description</th>
                    <th className="py-3.5 px-5 text-center">Photos</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {categories.map((cat) => {
                    const count = images.filter((i) => i.category_id === cat.id).length;
                    return (
                      <tr key={cat.id} className="hover:bg-slate-50/70">
                        <td className="py-4 px-5 font-bold text-[#0F172A]">{cat.name}</td>
                        <td className="py-4 px-5 font-mono text-xs text-slate-500">{cat.slug}</td>
                        <td className="py-4 px-5 text-slate-600 max-w-md">{cat.description || '—'}</td>
                        <td className="py-4 px-5 text-center">
                          <span className="inline-flex px-2.5 py-1 rounded-full bg-sky-50 text-[#0369A1] text-xs font-bold">
                            {count}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEdit(cat)}
                              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0284C7]"
                              title="Edit category"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(cat)}
                              className="p-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                              title="Delete category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
