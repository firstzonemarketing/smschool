import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Upload,
  Search,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Star,
  ArrowUp,
  ArrowDown,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ImagePlus,
} from 'lucide-react';
import {
  adminDeleteGalleryImage,
  adminFetchAllImages,
  adminFetchCategories,
  adminReorderImages,
  adminUpdateGalleryImage,
  adminUploadGalleryImage,
} from '../../services/schoolService';
import { optimizeImageToWebP, validateImageFile } from '../../lib/imageUtils';
import type { GalleryCategory, GalleryImage } from '../../types/database';
import { SEOHead } from '../../components/SEOHead';

interface StagedUpload {
  localId: string;
  file: File;
  previewUrl: string;
  title: string;
  description: string;
  category_id: string;
  is_featured: boolean;
  is_published: boolean;
}

export function AdminGallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');

  // Upload drawer state
  const [showUploader, setShowUploader] = useState(searchParams.get('upload') === '1');
  const [staged, setStaged] = useState<StagedUpload[]>([]);
  const [convertWebP, setConvertWebP] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Edit modal
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [editSaving, setEditSaving] = useState(false);

  // Delete confirmation modal
  const [deleting, setDeleting] = useState<GalleryImage | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const [imgs, cats] = await Promise.all([adminFetchAllImages(), adminFetchCategories()]);
      setImages(imgs);
      setCategories(cats);
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (searchParams.get('upload') === '1') {
      setShowUploader(true);
      searchParams.delete('upload');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  function handleFilesSelected(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const defaultCat = categories[0]?.id ?? '';
    const nextStaged: StagedUpload[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach((file) => {
      const validationErr = validateImageFile(file);
      if (validationErr) {
        errors.push(validationErr);
        return;
      }
      const cleanTitle = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (ch) => ch.toUpperCase());

      nextStaged.push({
        localId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        title: cleanTitle,
        description: '',
        category_id: defaultCat,
        is_featured: false,
        is_published: true,
      });
    });

    if (errors.length > 0) {
      setFeedback({ type: 'error', message: errors.join(' ') });
    }

    setStaged((prev) => [...prev, ...nextStaged]);
    e.target.value = '';
  }

  function removeStaged(localId: string) {
    setStaged((prev) => {
      const target = prev.find((s) => s.localId === localId);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((s) => s.localId !== localId);
    });
  }

  function updateStaged(localId: string, patch: Partial<StagedUpload>) {
    setStaged((prev) => prev.map((s) => (s.localId === localId ? { ...s, ...patch } : s)));
  }

  async function handleUploadAll(e: FormEvent) {
    e.preventDefault();
    if (staged.length === 0) return;

    for (const item of staged) {
      if (item.title.trim().length < 2) {
        setFeedback({ type: 'error', message: 'Every photo requires a title (at least 2 characters).' });
        return;
      }
    }

    setUploading(true);
    setFeedback(null);

    try {
      const baseOrder =
        images.length > 0 ? Math.max(...images.map((i) => i.display_order || 0)) : 0;

      const uploaded: GalleryImage[] = [];
      for (let i = 0; i < staged.length; i++) {
        const item = staged[i];
        const finalFile = convertWebP ? await optimizeImageToWebP(item.file) : item.file;
        const created = await adminUploadGalleryImage({
          file: finalFile,
          title: item.title,
          description: item.description,
          category_id: item.category_id || null,
          is_featured: item.is_featured,
          is_published: item.is_published,
          display_order: baseOrder + i + 1,
        });
        uploaded.push(created);
        URL.revokeObjectURL(item.previewUrl);
      }

      setImages((prev) => [...prev, ...uploaded]);
      setStaged([]);
      setShowUploader(false);
      setFeedback({
        type: 'success',
        message: `Successfully uploaded ${uploaded.length} photograph${uploaded.length > 1 ? 's' : ''}.`,
      });
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    } finally {
      setUploading(false);
    }
  }

  async function togglePublished(img: GalleryImage) {
    try {
      const updated = await adminUpdateGalleryImage(img.id, { is_published: !img.is_published });
      setImages((prev) => prev.map((i) => (i.id === img.id ? updated : i)));
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    }
  }

  async function toggleFeatured(img: GalleryImage) {
    try {
      const updated = await adminUpdateGalleryImage(img.id, { is_featured: !img.is_featured });
      setImages((prev) => prev.map((i) => (i.id === img.id ? updated : i)));
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    }
  }

  async function handleSaveEdit(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setEditSaving(true);
    try {
      const updated = await adminUpdateGalleryImage(editing.id, {
        title: editing.title,
        description: editing.description,
        category_id: editing.category_id || null,
        is_featured: editing.is_featured,
        is_published: editing.is_published,
      });
      setImages((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setEditing(null);
      setFeedback({ type: 'success', message: 'Image details updated.' });
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    } finally {
      setEditSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await adminDeleteGalleryImage(deleting);
      setImages((prev) => prev.filter((i) => i.id !== deleting.id));
      setDeleting(null);
      setFeedback({
        type: 'success',
        message: 'Photo removed from storage and database.',
      });
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
    } finally {
      setDeleteBusy(false);
    }
  }

  async function handleMove(indexInAll: number, direction: -1 | 1) {
    const swapIdx = indexInAll + direction;
    if (swapIdx < 0 || swapIdx >= images.length) return;
    const next = [...images];
    [next[indexInAll], next[swapIdx]] = [next[swapIdx], next[indexInAll]];
    const reindexed = next.map((item, idx) => ({ ...item, display_order: idx + 1 }));
    setImages(reindexed);
    try {
      await adminReorderImages(reindexed.map((i) => i.id));
    } catch (err) {
      setFeedback({ type: 'error', message: (err as Error).message });
      loadData();
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return images.filter((img) => {
      if (categoryFilter !== 'all' && img.category_id !== categoryFilter) return false;
      if (statusFilter === 'published' && !img.is_published) return false;
      if (statusFilter === 'draft' && img.is_published) return false;
      if (statusFilter === 'featured' && !img.is_featured) return false;
      if (!q) return true;
      return (
        img.title.toLowerCase().includes(q) ||
        img.description.toLowerCase().includes(q) ||
        (img.category?.name.toLowerCase().includes(q) ?? false)
      );
    });
  }, [images, search, categoryFilter, statusFilter]);

  const canReorder = search === '' && categoryFilter === 'all' && statusFilter === 'all';

  return (
    <>
      <SEOHead title="Gallery Management" description="Manage SM English School gallery images." />
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Gallery Management
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Upload photographs, manage captions and categories, publish to the public site, and
              control display order.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowUploader((s) => !s)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm shadow-md transition-all"
          >
            <Upload className="w-4 h-4" />
            {showUploader ? 'Hide Uploader' : 'Upload Photographs'}
          </button>
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div
            role="status"
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span className="font-medium">{feedback.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              aria-label="Dismiss message"
              className="opacity-60 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Multi-Photo Uploader Panel */}
        {showUploader && (
          <form
            onSubmit={handleUploadAll}
            className="rounded-3xl bg-white border-2 border-sky-200 p-6 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-bold text-[#0F172A]">
                  Upload Multiple Photographs
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select one or more JPG, PNG, WebP, or GIF images (up to 10 MB each). Preview and
                  label them before uploading.
                </p>
              </div>
              <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={convertWebP}
                  onChange={(e) => setConvertWebP(e.target.checked)}
                  className="rounded border-slate-300 text-[#0284C7]"
                />
                Auto-optimize to WebP for faster page loads
              </label>
            </div>

            <label className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50/40 hover:bg-sky-50 cursor-pointer transition-colors text-center">
              <ImagePlus className="w-9 h-9 text-[#0284C7] mb-2" />
              <span className="text-sm font-bold text-[#0F172A]">
                Click to select school photographs
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Supports multiple files at once • Saved permanently in Laravel Storage
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                onChange={handleFilesSelected}
                className="sr-only"
              />
            </label>

            {staged.length > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staged.map((item) => (
                    <div
                      key={item.localId}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row gap-4 relative"
                    >
                      <button
                        type="button"
                        onClick={() => removeStaged(item.localId)}
                        aria-label="Remove staged photo"
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-rose-600 flex items-center justify-center"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <img
                        src={item.previewUrl}
                        alt={item.title}
                        className="w-full sm:w-32 h-32 rounded-xl object-cover shrink-0 bg-slate-200"
                      />

                      <div className="flex-1 space-y-2.5 pr-6">
                        <input
                          type="text"
                          required
                          value={item.title}
                          onChange={(e) => updateStaged(item.localId, { title: e.target.value })}
                          placeholder="Photo title *"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold"
                        />
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) =>
                            updateStaged(item.localId, { description: e.target.value })
                          }
                          placeholder="Short caption or description"
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                        <select
                          value={item.category_id}
                          onChange={(e) =>
                            updateStaged(item.localId, { category_id: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-medium"
                        >
                          <option value="">No Category</option>
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <div className="flex flex-wrap gap-4 pt-1">
                          <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                            <input
                              type="checkbox"
                              checked={item.is_published}
                              onChange={(e) =>
                                updateStaged(item.localId, { is_published: e.target.checked })
                              }
                            />
                            Publish now
                          </label>
                          <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                            <input
                              type="checkbox"
                              checked={item.is_featured}
                              onChange={(e) =>
                                updateStaged(item.localId, { is_featured: e.target.checked })
                              }
                            />
                            Homepage Featured
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      staged.forEach((s) => URL.revokeObjectURL(s.previewUrl));
                      setStaged([]);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Clear All
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-md disabled:opacity-60"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading {staged.length} photo{staged.length > 1 ? 's' : ''}...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload {staged.length} Photo{staged.length > 1 ? 's' : ''}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {/* Search & Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, description, or category..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'all' | 'published' | 'draft' | 'featured')
            }
            aria-label="Filter by status"
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
            <option value="featured">Featured Only</option>
          </select>
        </div>

        {/* Gallery Table / Cards */}
        {loading ? (
          <div className="py-16 flex justify-center text-slate-500 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#0284C7]" />
            <span className="text-sm font-medium">Loading gallery images...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-white border border-slate-200 space-y-2">
            <p className="font-display text-lg font-bold text-[#0F172A]">No images match</p>
            <p className="text-sm text-slate-500">
              Upload new school photographs or clear your active filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((img) => {
              const allIdx = images.findIndex((x) => x.id === img.id);
              return (
                <div
                  key={img.id}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs ${
                          img.is_published
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 text-white'
                        }`}
                      >
                        {img.is_published ? 'Published' : 'Draft'}
                      </span>
                      {img.is_featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0284C7] text-white text-[11px] font-bold shadow-xs">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col space-y-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                        {img.category?.name || 'Uncategorized'}
                      </p>
                      <h3 className="font-display text-base font-bold text-[#0F172A] mt-0.5">
                        {img.title}
                      </h3>
                      {img.description && (
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                          {img.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 mt-auto border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => togglePublished(img)}
                          title={img.is_published ? 'Unpublish (make draft)' : 'Publish'}
                          className={`p-2 rounded-lg border text-xs font-semibold transition-colors ${
                            img.is_published
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                          }`}
                        >
                          {img.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleFeatured(img)}
                          title={img.is_featured ? 'Remove from homepage featured' : 'Mark featured'}
                          className={`p-2 rounded-lg border text-xs transition-colors ${
                            img.is_featured
                              ? 'border-sky-200 bg-sky-50 text-[#0284C7]'
                              : 'border-slate-200 text-slate-400 hover:text-[#0284C7]'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${img.is_featured ? 'fill-current' : ''}`} />
                        </button>
                        {canReorder && (
                          <>
                            <button
                              type="button"
                              disabled={allIdx === 0}
                              onClick={() => handleMove(allIdx, -1)}
                              title="Move earlier"
                              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-[#0F172A] disabled:opacity-30"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              disabled={allIdx === images.length - 1}
                              onClick={() => handleMove(allIdx, 1)}
                              title="Move later"
                              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-[#0F172A] disabled:opacity-30"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditing(img)}
                          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-[#0284C7]"
                          title="Edit details"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleting(img)}
                          className="p-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                          title="Delete photograph"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#0F172A]">Edit Image Details</h2>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <img src={editing.image_url} alt={editing.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Title *</label>
              <input
                type="text"
                required
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Description</label>
              <textarea
                rows={3}
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
              <select
                value={editing.category_id ?? ''}
                onChange={(e) => setEditing({ ...editing, category_id: e.target.value || null })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value="">Uncategorized</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-6 pt-1">
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={editing.is_published}
                  onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
                />
                Published on Website
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={editing.is_featured}
                  onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })}
                />
                Homepage Featured
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={editSaving}
                className="px-5 py-2.5 rounded-xl bg-[#0284C7] text-white text-sm font-bold flex items-center gap-2 disabled:opacity-60"
              >
                {editSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleting && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <h2 className="font-display text-xl font-bold text-[#0F172A]">Delete Photograph?</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              This will permanently remove <strong>“{deleting.title}”</strong> from both server
              storage and the gallery database. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={deleteBusy}
                onClick={() => setDeleting(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteBusy}
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold flex items-center gap-2 disabled:opacity-60"
              >
                {deleteBusy && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
