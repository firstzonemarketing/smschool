import { useEffect, useState } from 'react';
import { Star, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import {
  adminFetchAllImages,
  adminReorderImages,
  adminUpdateGalleryImage,
} from '../../services/schoolService';
import type { GalleryImage } from '../../types/database';
import { SEOHead } from '../../components/SEOHead';

export function AdminFeatured() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetchAllImages();
      setImages(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const featured = images.filter((i) => i.is_featured && i.is_published);
  const others = images.filter((i) => !i.is_featured && i.is_published);

  async function toggleFeatured(img: GalleryImage) {
    try {
      const updated = await adminUpdateGalleryImage(img.id, { is_featured: !img.is_featured });
      setImages((prev) => prev.map((i) => (i.id === img.id ? updated : i)));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function moveFeatured(idx: number, dir: -1 | 1) {
    const swap = idx + dir;
    if (swap < 0 || swap >= featured.length) return;
    const nextFeatured = [...featured];
    [nextFeatured[idx], nextFeatured[swap]] = [nextFeatured[swap], nextFeatured[idx]];
    const otherAll = images.filter((i) => !(i.is_featured && i.is_published));
    const merged = [...nextFeatured, ...otherAll].map((item, index) => ({
      ...item,
      display_order: index + 1,
    }));
    setImages(merged);
    try {
      await adminReorderImages(merged.map((i) => i.id));
    } catch (err) {
      setError((err as Error).message);
      load();
    }
  }

  return (
    <>
      <SEOHead title="Homepage Featured Images" description="Curate featured homepage images." />
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Homepage Featured Images
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Choose and order which published photographs appear in the Homepage Featured Photo
            Gallery (up to 8 shown).
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-16 flex justify-center text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin text-[#0284C7]" />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-[#0F172A]">
                Currently Featured ({featured.length})
              </h2>
              {featured.length === 0 ? (
                <div className="p-10 rounded-2xl bg-white border border-dashed border-slate-300 text-center text-sm text-slate-500">
                  No published photographs are marked as featured yet. Click the star below to add
                  photos.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featured.map((img, idx) => (
                    <div
                      key={img.id}
                      className="rounded-2xl bg-white border-2 border-sky-200 overflow-hidden shadow-xs flex flex-col"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                        <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
                        <p className="text-sm font-bold text-[#0F172A] line-clamp-1">{img.title}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveFeatured(idx, -1)}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30"
                              title="Move left"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === featured.length - 1}
                              onClick={() => moveFeatured(idx, 1)}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30"
                              title="Move right"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleFeatured(img)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 text-[#0284C7] text-xs font-bold hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-lg font-bold text-[#0F172A]">
                Published Gallery Photos ({others.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {others.map((img) => (
                  <div
                    key={img.id}
                    className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                      <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 space-y-2">
                      <p className="text-xs font-bold text-[#0F172A] truncate">{img.title}</p>
                      <button
                        type="button"
                        onClick={() => toggleFeatured(img)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0284C7] hover:text-white text-xs font-bold text-slate-700 transition-colors"
                      >
                        <Star className="w-3.5 h-3.5" />
                        Feature
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
